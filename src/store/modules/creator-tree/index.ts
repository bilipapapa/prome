import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import oboe from 'oboe';
import { compare } from 'fast-json-patch';
import { db } from './db';
import _ from 'lodash';

interface TreeNode {
  id: string;
  name: string;
  children?: TreeNode[];
  properties?: any[];
}

const serializeWorker = new Worker(new URL('./serializeWorker.ts?worker&type=module', import.meta.url), { type: 'module' });

export const useTreeStore = defineStore('tree', () => {
  const metadata = ref<Map<string, { size: number; lastModified: Date }>>(new Map());
  const trees = ref<Map<string, TreeNode>>(new Map());

  async function loadLocalJson(file: File): Promise<Blob> {
    try {
      if (!file.type.includes('json')) {
        throw new Error('Please select a JSON file');
      }
      console.log('Loaded file:', { name: file.name, size: file.size, type: file.type });
      return file;
    } catch (error) {
      console.error('Load JSON failed:', error);
      throw error;
    }
  }

  async function previewJson(file: File, maxSize: number = 1e6): Promise<string> {
    try {
      const slice = file.slice(0, Math.min(maxSize, file.size));
      const text = await slice.text();
      console.log('JSON Preview (first ~1MB):', text.slice(0, 1000));
      return new Promise((resolve, reject) => {
        let lineCount = 1;
        let lastLine = '';
        oboe(slice.stream())
          .node('[*]', () => {
            lineCount++;
            return oboe.drop; // 仅验证语法
          })
          .done(() => {
            console.log('JSON Preview is valid');
            resolve(text);
          })
          .fail((error) => {
            console.error(`JSON Preview is invalid: ${error.message} at line ${lineCount}`);
            console.error('Error near:', lastLine);
            resolve(text); // 继续执行
          })
          .on('data', (chunk) => {
            lastLine = chunk.toString().split('\n').slice(-2)[0] || '';
          });
      });
    } catch (error) {
      console.error('Preview JSON failed:', error);
      return ''; // 继续执行
    }
  }

  async function parseBlobToTree(blob: Blob): Promise<TreeNode> {
    return new Promise((resolve, reject) => {
      console.log('Starting blob parsing...');
      const stream = blob.stream();
      let tree: TreeNode = { id: '', name: '' };
      let nodeCount = 0;
      const maxNodes = 1000000; // 增加上限以支持大文件
      const timeout = setTimeout(() => {
        console.error('Parsing timeout after 60s');
        reject(new Error('Parsing timeout after 60s'));
      }, 60000);

      oboe(stream)
        .node('[*]', (node: any) => {
          nodeCount++;
          if (nodeCount > maxNodes) {
            console.error(`Parsing aborted: Exceeded max nodes (${maxNodes})`);
            clearTimeout(timeout);
            reject(new Error(`Exceeded max nodes (${maxNodes})`));
            return oboe.drop;
          }
          if (nodeCount % 10000 === 0) {
            console.log(`Parsed ${nodeCount} nodes...`);
          }
          if (nodeCount === 1) {
            tree = {
              id: node.uniqueId || `root-${Date.now()}`,
              name: node.label || 'Root',
              children: node.children,
              properties: [
                node.cloudNo,
                node.modelCode,
                node.modelName,
                node.networkType,
                node.modelStatus,
              ].filter(Boolean),
            };
            const summary = {
              id: tree.id,
              name: tree.name,
              properties: tree.properties?.slice(0, 2),
              children: tree.children?.slice(0, 2)?.map(child => ({
                id: child.uniqueId,
                name: child.label,
              })),
            };
            console.log('Tree Summary:', JSON.stringify(summary, null, 2));
          }
          return oboe.drop; // 仅处理第一个元素
        })
        .done(() => {
          console.log('Parsing complete');
          clearTimeout(timeout);
          if (!tree.id) {
            console.error('Parsed tree has no id');
            reject(new Error('Parsed tree has no id'));
          } else {
            console.log(`Total nodes parsed: ${nodeCount}`);
            resolve(tree);
          }
        })
        .fail((error) => {
          console.error(`Parsing failed: ${error.message}`);
          clearTimeout(timeout);
          reject(error);
        });
    });
  }

  async function getTree(id: string): Promise<TreeNode | undefined> {
    try {
      console.log(`Getting tree with id: ${id}`);
      const blob = await db.getTreeBlob(id);
      if (!blob) {
        console.log(`No Blob found for id: ${id}`);
        return undefined;
      }

      const tree = await parseBlobToTree(blob);
      if (!tree.id) {
        console.error(`Parsed tree has no id: ${id}`);
        return undefined;
      }
      trees.value.set(id, reactive(_.cloneDeep(tree)));
      metadata.value.set(id, { size: blob.size, lastModified: new Date() });
      console.log('Updated metadata:', Array.from(metadata.value.entries()));
      console.log('Stored tree in Pinia:', { id, summary: trees.value.get(id) });
      return trees.value.get(id);
    } catch (error) {
      console.error(`Failed to get tree with id: ${id}`, error);
      return undefined;
    }
  }

  async function updateTree(id: string): Promise<void> {
    const tree = trees.value.get(id);
    if (!tree) {
      console.error(`No tree found for id: ${id}`);
      throw new Error(`No tree found for id: ${id}`);
    }

    console.log(`Starting tree update for id: ${id}`);
    return new Promise((resolve, reject) => {
      serializeWorker.onmessage = (e) => {
        if (e.data.error) {
          console.error(`Worker serialization failed for id: ${id}`, e.data.error);
          reject(new Error(e.data.error));
          return;
        }
        const blob = new Blob([e.data], { type: 'application/json' });
        db.updateTree(id, blob)
          .then(() => {
            metadata.value.set(id, { size: blob.size, lastModified: new Date() });
            console.log('Saved tree to DB, metadata:', Array.from(metadata.value.entries()));
            resolve();
          })
          .catch((error) => {
            console.error(`Failed to save tree to DB for id: ${id}`, error);
            reject(error);
          });
      };
      serializeWorker.onerror = (error) => {
        console.error(`Worker error for id: ${id}`, error);
        reject(error);
      };
      serializeWorker.postMessage(tree);
    });
  }

  async function deleteTree(id: string): Promise<void> {
    try {
      await db.deleteTree(id);
      trees.value.delete(id);
      metadata.value.delete(id);
      console.log('Deleted tree, metadata:', Array.from(metadata.value.entries()));
    } catch (error) {
      console.error(`Failed to delete tree with id: ${id}`, error);
      throw error;
    }
  }

  async function addTree(id: string, file: File): Promise<void> {
    try {
      console.log(`Adding tree with id: ${id}`);
      const blob = await loadLocalJson(file);
      await previewJson(file); // 验证但不阻塞
      await db.addTree(id, blob);
      const tree = await getTree(id);
      if (!tree) {
        throw new Error(`Failed to load tree with id: ${id}`);
      }
      console.log(`Successfully added tree with id: ${id}`);
    } catch (error) {
      console.error(`Failed to add tree with id: ${id}`, error);
      throw error;
    }
  }

  function modifyNode(id: string, nodeId: string, updates: Partial<TreeNode>): void {
    console.log(`Modifying node with id: ${nodeId} in tree: ${id}`);
    const tree = trees.value.get(id);
    if (!tree) {
      console.error(`No tree found for id: ${id}`);
      return;
    }

    const originalTree = _.cloneDeep(tree);
    function traverse(node: TreeNode): boolean {
      if (node.id === nodeId) {
        Object.assign(node, updates);
        return true;
      }
      return node.children?.some(traverse) || false;
    }
    if (traverse(tree)) {
      const patches = compare(originalTree, tree);
      if (patches.length > 0) {
        console.log('JSON Patch:', patches);
        updateTree(id).catch((error) => console.error(`Failed to update tree with id: ${id}`, error));
        console.log('Modified tree:', trees.value.get(id));
      } else {
        console.log(`No changes detected for id: ${id}`);
      }
    } else {
      console.error(`No node found with nodeId: ${nodeId} in tree id: ${id}`);
    }
  }

  function getMetadata(): Map<string, { size: number; lastModified: Date }> {
    console.log('Current metadata:', Array.from(metadata.value.entries()));
    console.log('Current trees:', Array.from(trees.value.entries(), ([id, tree]) => ({
      id,
      summary: {
        id: tree.id,
        name: tree.name,
        properties: tree.properties?.slice(0, 2),
        children: tree.children?.slice(0, 2)?.map(c => ({ id: c.id, name: c.name })),
      },
    })));
    return metadata.value;
  }

  return { metadata, trees, getTree, updateTree, deleteTree, addTree, modifyNode, getMetadata, previewJson };
});