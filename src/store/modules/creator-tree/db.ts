import Dexie, { Table } from 'dexie';

interface TreeEntry {
  id: string;
  data: Blob;
}

export class TreeDB extends Dexie {
  trees!: Table<TreeEntry>;

  constructor() {
    super('TreeDataDB');
    this.version(1).stores({
      trees: 'id',
    });
  }

  async addTree(id: string, blob: Blob): Promise<void> {
    try {
      if (!(blob instanceof Blob)) {
        throw new Error('Invalid Blob');
      }
      await this.trees.put({ id, data: blob });
      console.log(`DB: Added tree with id: ${id}, size: ${blob.size}`);
    } catch (error) {
      console.error(`DB: Failed to add tree with id: ${id}`, error);
      throw error;
    }
  }

  async getTreeBlob(id: string): Promise<Blob | undefined> {
    try {
      const entry = await this.trees.get(id);
      if (!entry) {
        console.log(`DB: No tree found for id: ${id}`);
        return undefined;
      }
      if (!(entry.data instanceof Blob)) {
        console.error(`DB: Invalid Blob for id: ${id}`);
        return undefined;
      }
      console.log(`DB: Retrieved tree with id: ${id}, size: ${entry.data.size}`);
      return entry.data;
    } catch (error) {
      console.error(`DB: Failed to get tree with id: ${id}`, error);
      throw error;
    }
  }

  async updateTree(id: string, blob: Blob): Promise<void> {
    try {
      if (!(blob instanceof Blob)) {
        throw new Error('Invalid Blob');
      }
      await this.trees.update(id, { data: blob });
      console.log(`DB: Updated tree with id: ${id}, size: ${blob.size}`);
    } catch (error) {
      console.error(`DB: Failed to update tree with id: ${id}`, error);
      throw error;
    }
  }

  async deleteTree(id: string): Promise<void> {
    try {
      await this.trees.delete(id);
      console.log(`DB: Deleted tree with id: ${id}`);
    } catch (error) {
      console.error(`DB: Failed to delete tree with id: ${id}`, error);
      throw error;
    }
  }
}

export const db = new TreeDB();