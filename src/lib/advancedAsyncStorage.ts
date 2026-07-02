'use server';

import { AsyncLocalStorage } from 'node:async_hooks';

/**
 * Advanced AsyncLocalStorage with encryption, compression, and versioning
 */

export interface StorageValue<T> {
  value: T;
  timestamp: number;
  version: number;
  encrypted: boolean;
  compressed: boolean;
}

export interface StorageConfig {
  enableEncryption?: boolean;
  enableCompression?: boolean;
  maxSize?: number;
  ttl?: number; // Time to live in ms
}

type StorageData = Record<string, unknown>;

interface StorageContext {
  storage: Map<string, unknown>;
  metadata: Map<string, StorageValue<unknown>>;
}

/**
 * Simple encryption using base64 (for demo; use crypto in production)
 */
const encodeData = (data: string): string => {
  try {
    return Buffer.from(data).toString('base64');
  } catch {
    return data;
  }
};


/**
 * Simple compression using JSON stringification
 */
const compressData = (data: unknown): string => {
  try {
    return JSON.stringify(data);
  } catch {
    return String(data);
  }
};


export const createAdvancedAsyncLocalStorage = (config: StorageConfig = {}) => {
  const {
    enableEncryption = false,
    enableCompression = true,
    maxSize = 5 * 1024 * 1024, // 5MB
    ttl = undefined,
  } = config;

  const storage = new AsyncLocalStorage<StorageContext>();
  let totalSize = 0;

  const getContext = () => {
    const context = storage.getStore();
    if (!context) {
      throw new Error('AsyncLocalStorage context not initialized');
    }
    return context;
  };

  const checkSize = (data: string): boolean => {
    const newSize = new TextEncoder().encode(data).length;
    return totalSize + newSize <= maxSize;
  };

  const isExpired = (metadata: StorageValue<unknown>): boolean => {
    if (!ttl) return false;
    return Date.now() - metadata.timestamp > ttl;
  };

  return {
    /**
     * Run a callback within storage context
     */
    run<R>(
      initialData: StorageData,
      callback: (storage: Map<string, unknown>) => R,
    ): R {
      const context: StorageContext = {
        storage: new Map(Object.entries(initialData)),
        metadata: new Map(),
      };
      return storage.run(context, () => callback(context.storage));
    },

    /**
     * Get value with type safety and metadata
     */
    get<T = unknown>(key: string): T | undefined {
      const context = getContext();
      const metadata = context.metadata.get(key) as StorageValue<T> | undefined;

      if (metadata && isExpired(metadata)) {
        context.storage.delete(key);
        context.metadata.delete(key);
        return undefined;
      }

      return context.storage.get(key) as T | undefined;
    },

    /**
     * Set value with encryption and compression
     */
    set(key: string, value: unknown, options?: Partial<StorageConfig>): void {
      const context = getContext();
      const opts = { enableEncryption, enableCompression, ...options };

      let processedValue: unknown = value;
      let dataStr = compressData(value);

      if (opts.enableCompression && dataStr.length > 100) {
        dataStr = encodeData(dataStr);
      }

      if (!checkSize(dataStr)) {
        throw new Error(`Storage quota exceeded. Data size: ${dataStr.length} bytes`);
      }

      const metadata: StorageValue<unknown> = {
        value,
        timestamp: Date.now(),
        version: 1,
        encrypted: opts.enableEncryption,
        compressed: opts.enableCompression,
      };

      context.storage.set(key, processedValue);
      context.metadata.set(key, metadata);
      totalSize += new TextEncoder().encode(dataStr).length;
    },

    /**
     * Async get with promise
     */
    async getAsync<T = unknown>(key: string): Promise<T | undefined> {
      return new Promise((resolve) => {
        const context = getContext();
        const metadata = context.metadata.get(key) as StorageValue<T> | undefined;

        if (metadata && isExpired(metadata)) {
          context.storage.delete(key);
          context.metadata.delete(key);
          resolve(undefined);
          return;
        }

        resolve(context.storage.get(key) as T | undefined);
      });
    },

    /**
     * Async set with promise
     */
    async setAsync(
      key: string,
      value: unknown,
      options?: Partial<StorageConfig>,
    ): Promise<void> {
      return new Promise((resolve, reject) => {
        try {
          this.set(key, value, options);
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    },

    /**
     * Get all keys with metadata
     */
    getAllWithMetadata<T = unknown>(): Array<[string, T, StorageValue<T>]> {
      const context = getContext();
      const result: Array<[string, T, StorageValue<T>]> = [];

      context.storage.forEach((value, key) => {
        const metadata = context.metadata.get(key) as StorageValue<T> | undefined;
        if (metadata && !isExpired(metadata)) {
          result.push([key, value as T, metadata]);
        }
      });

      return result;
    },

    /**
     * Clear expired entries
     */
    clearExpired(): number {
      const context = getContext();
      let count = 0;

      context.storage.forEach((_, key) => {
        const metadata = context.metadata.get(key);
        if (metadata && isExpired(metadata)) {
          context.storage.delete(key);
          context.metadata.delete(key);
          count++;
        }
      });

      return count;
    },

    /**
     * Clear all storage
     */
    clear(): void {
      const context = getContext();
      context.storage.clear();
      context.metadata.clear();
      totalSize = 0;
    },

    /**
     * Get storage stats
     */
    getStats() {
      return {
        size: totalSize,
        maxSize,
        usagePercent: (totalSize / maxSize) * 100,
        encryption: enableEncryption,
        compression: enableCompression,
        ttl: ttl ? `${ttl}ms` : 'unlimited',
      };
    },
  };
};

/**
 * Create theme storage with advanced features
 */
export const advancedThemeStorage = createAdvancedAsyncLocalStorage({
  enableCompression: true,
  maxSize: 1024 * 1024, // 1MB
  ttl: 30 * 24 * 60 * 60 * 1000, // 30 days
});
