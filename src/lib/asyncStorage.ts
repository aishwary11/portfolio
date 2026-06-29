'use server';

import { AsyncLocalStorage } from 'async_hooks';

export interface StorageValue<T> {
  value: T;
  timestamp: number;
}

type StorageData = Record<string, unknown>;

interface StorageContext {
  storage: Map<string, unknown>;
}

export const createAsyncLocalStorage = () => {
  const storage = new AsyncLocalStorage<StorageContext>();

  const getContext = () => {
    const context = storage.getStore();
    if (!context) {
      throw new Error('AsyncLocalStorage context not initialized');
    }
    return context;
  };

  return {
    run<R>(
      initialData: StorageData,
      callback: (storage: Map<string, unknown>) => R,
    ): R {
      const context: StorageContext = { storage: new Map(Object.entries(initialData)) };
      return storage.run(context, () => callback(context.storage));
    },

    get<T = unknown>(key: string): T | undefined {
      const context = getContext();
      return context.storage.get(key) as T | undefined;
    },

    set(key: string, value: unknown): void {
      const context = getContext();
      context.storage.set(key, value);
    },

    async getAsync<T = unknown>(key: string): Promise<T | undefined> {
      return new Promise((resolve) => {
        const context = getContext();
        resolve(context.storage.get(key) as T | undefined);
      });
    },

    async setAsync(key: string, value: unknown): Promise<void> {
      return new Promise((resolve) => {
        const context = getContext();
        context.storage.set(key, value);
        resolve();
      });
    },
  };
};

export const themeStorage = createAsyncLocalStorage();
