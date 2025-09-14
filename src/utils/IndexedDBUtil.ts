// src/utils/IndexedDBUtil.ts

interface IData {
  id: string;
  value: any; // 这里可以根据你的数据结构定义具体类型
}

export class IndexedDBUtil {
  private dbName: string;
  private storeName: string;
  private db: IDBDatabase | null = null;

  constructor(dbName: string = 'tsysun', storeName: string = 'ipt-creator') {
    this.dbName = dbName;
    this.storeName = storeName;
  }

  // 打开数据库
  public open(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onerror = (e) => reject('打开数据库失败：' + (e.target as any).error);
      request.onsuccess = (e) => {
        this.db = (e.target as IDBRequest).result;
        resolve(this.db);
      };

      // 数据库升级（创建 Object Store）
      request.onupgradeneeded = (e) => {
        const db = (e.target as IDBRequest).result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: 'id' });
        }
      };
    });
  }

  // 保存数据
  public async saveData(data: IData[]): Promise<void> {
    const db = await this.open();
    const transaction = db.transaction(this.storeName, 'readwrite');
    const store = transaction.objectStore(this.storeName);

    data.forEach((item) => store.put(item));

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = (e) => reject('保存数据失败：' + (e.target as any).error);
    });
  }

  // 获取数据，支持按偏移量和限制加载
  public async getData(offset: number, limit: number): Promise<IData[]> {
    const db = await this.open();
    const transaction = db.transaction(this.storeName, 'readonly');
    const store = transaction.objectStore(this.storeName);
    const range = IDBKeyRange.bound(offset, offset + limit - 1); // 根据偏移量和限制加载数据
    const request = store.openCursor(range);
    const result: IData[] = [];

    return new Promise((resolve, reject) => {
      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest).result;
        if (cursor) {
          result.push(cursor.value);
          cursor.continue();
        } else {
          resolve(result);
        }
      };
      request.onerror = (e) => reject('读取数据失败：' + (e.target as any).error);
    });
  }
}
