<template>
  <div>
    <input type="file" accept=".json" @change="handleFileChange" />
    <button @click="printMetadata">Print Metadata & Trees</button>
    <button @click="previewJsonFile">Preview JSON</button>
    <button @click="testModifyNode" :disabled="!isTreeLoaded">Test Modify Node</button>
    <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
    <p v-if="isParsing">Parsing JSON... ({{ parseProgress }} nodes processed)</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTreeStore } from '@/store/modules/creator-tree';

interface TreeNode {
  id: string;
  name: string;
  children?: TreeNode[];
  properties?: any[];
}

const store = useTreeStore();
const treeId = 'exampleId';
const currentFile = ref<File | null>(null);
const isTreeLoaded = ref(false);
const errorMessage = ref<string>('');
const isParsing = ref(false);
const parseProgress = ref(0);

// 监听解析进度
store.$subscribe((mutation, state) => {
  if (mutation.events?.key === 'trees' && state.trees.get(treeId)) {
    isTreeLoaded.value = true;
    isParsing.value = false;
    parseProgress.value = 0;
  }
});

async function handleFileChange(event: Event): Promise<void> {
  errorMessage.value = '';
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) {
    errorMessage.value = 'No file selected';
    console.error('No file selected');
    return;
  }

  try {
    currentFile.value = file;
    isTreeLoaded.value = false;
    isParsing.value = true;
    parseProgress.value = 0;
    console.log('Starting file upload for treeId:', treeId);
    await store.addTree(treeId, file);
    isTreeLoaded.value = !!store.trees.get(treeId);
    console.log(`Tree loaded status: ${isTreeLoaded.value}`);
    if (!isTreeLoaded.value) {
      errorMessage.value = `Failed to load tree with id: ${treeId}`;
      isParsing.value = false;
    }
    store.getMetadata();
  } catch (error) {
    errorMessage.value = `Failed to load tree: ${error instanceof Error ? error.message : 'Unknown error'}`;
    console.error('Failed to load tree:', error);
    isParsing.value = false;
  }
}

async function previewJsonFile(): Promise<void> {
  if (!currentFile.value) {
    errorMessage.value = 'No file selected for preview';
    console.error('No file selected');
    return;
  }
  try {
    await store.previewJson(currentFile.value);
  } catch (error) {
    errorMessage.value = `Failed to preview JSON: ${error instanceof Error ? error.message : 'Unknown error'}`;
    console.error('Failed to preview JSON:', error);
  }
}

async function testModifyNode(): Promise<void> {
  if (!isTreeLoaded.value) {
    errorMessage.value = 'Tree not loaded yet, please upload a file first';
    console.error('Tree not loaded yet, please upload a file first');
    return;
  }
  try {
    store.modifyNode(treeId, 'group-virtual', { properties: ['newProp'] });
  } catch (error) {
    errorMessage.value = `Failed to modify node: ${error instanceof Error ? error.message : 'Unknown error'}`;
    console.error('Failed to modify node:', error);
  }
}

function printMetadata(): void {
  store.getMetadata();
}
</script>