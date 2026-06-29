'use client';

import { useCallback, useEffect, useRef, useState, useTransition } from 'react';

type SetValue<T> = (value: T | ((val: T) => T)) => void;

export interface AdvancedStorageOptions {
  debounceMs?: number;
  fallbackValue?: unknown;
  validateFn?: (value: unknown) => boolean;
  transformFn?: (value: unknown) => unknown;
  onError?: (error: Error) => void;
  persistToRemote?: boolean;
  remoteKey?: string;
  syncInterval?: number; // Auto-sync with remote every X ms
}

interface CacheEntry<T> {
  value: T;
  timestamp: number;
  version: number;
}

export function useAdvancedAsyncLocalStorage<T>(
  key: string,
  initialValue: T,
  options: AdvancedStorageOptions = {},
): [T, SetValue<T>, boolean, { isDirty: boolean; lastSync: number; error?: Error; }] {
  const {
    debounceMs = 500,
    fallbackValue,
    validateFn,
    transformFn,
    onError,
    persistToRemote = false,
    remoteKey = key,
    syncInterval = 30000, // 30s
  } = options;

  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isPending, startTransition] = useTransition();
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const syncTimerRef = useRef<NodeJS.Timeout | null>(null);
  const cacheRef = useRef<CacheEntry<T> | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [lastSync, setLastSync] = useState(0);
  const [error, setError] = useState<Error>();

  // Initialize from localStorage
  useEffect(() => {
    const initializeStorage = async () => {
      try {
        if (typeof window === 'undefined') return;

        const item = localStorage.getItem(key);
        let value: T | undefined;

        if (item) {
          try {
            const parsed = JSON.parse(item) as T;
            value = validateFn ? (validateFn(parsed) ? parsed : undefined) : parsed;

            if (value && transformFn) {
              value = transformFn(value) as T;
            }

            if (value) {
              setStoredValue(value);
              cacheRef.current = { value, timestamp: Date.now(), version: 1 };
            }
          } catch (parseError) {
            console.warn(`Error parsing localStorage key "${key}":`, parseError);
          }
        }

        if (!value && fallbackValue !== undefined) {
          setStoredValue(fallbackValue as T);
        }
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        console.warn(`Error reading localStorage key "${key}":`, error);
        setError(error);
        onError?.(error);
      } finally {
        setIsInitialized(true);
      }
    };

    initializeStorage();
  }, [key, fallbackValue, validateFn, transformFn, onError]);

  // Debounced write to localStorage
  useEffect(() => {
    if (!isInitialized || typeof window === 'undefined') return;

    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    setIsDirty(true);

    // Set new timer
    debounceTimerRef.current = setTimeout(() => {
      startTransition(async () => {
        try {
          const valueToStore = transformFn ? transformFn(storedValue) : storedValue;

          if (validateFn && !validateFn(valueToStore)) {
            throw new Error(`Validation failed for key "${key}"`);
          }

          localStorage.setItem(key, JSON.stringify(storedValue));
          cacheRef.current = {
            value: storedValue,
            timestamp: Date.now(),
            version: (cacheRef.current?.version ?? 0) + 1,
          };
          setIsDirty(false);

          // Persist to remote if enabled
          if (persistToRemote) {
            try {
              await fetch('/api/sync-storage', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key: remoteKey, value: storedValue }),
              });
              setLastSync(Date.now());
            } catch (remoteError) {
              console.warn('Failed to sync to remote storage:', remoteError);
            }
          }

          setError(undefined);
        } catch (err) {
          const error = err instanceof Error ? err : new Error(String(err));
          console.warn(`Error setting localStorage key "${key}":`, error);
          setError(error);
          onError?.(error);
        }
      });
    }, debounceMs);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [key, storedValue, isInitialized, debounceMs, validateFn, transformFn, persistToRemote, remoteKey, onError]);

  // Auto-sync with remote
  useEffect(() => {
    if (!persistToRemote || !isInitialized) return;

    syncTimerRef.current = setInterval(async () => {
      try {
        const response = await fetch(`/api/sync-storage?key=${remoteKey}`);
        const remoteData = (await response.json()) as { value: T; };

        if (remoteData.value && JSON.stringify(remoteData.value) !== JSON.stringify(storedValue)) {
          setStoredValue(remoteData.value);
          localStorage.setItem(key, JSON.stringify(remoteData.value));
        }

        setLastSync(Date.now());
      } catch (err) {
        console.warn('Failed to sync from remote storage:', err);
      }
    }, syncInterval);

    return () => {
      if (syncTimerRef.current) {
        clearInterval(syncTimerRef.current);
      }
    };
  }, [persistToRemote, isInitialized, remoteKey, syncInterval, key, storedValue]);

  const setValue: SetValue<T> = useCallback((value) => {
    try {
      const valueToStore =
        typeof value === 'function' ? (value as (val: T) => T)(storedValue) : value;
      setStoredValue(valueToStore);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      console.warn(`Error setting value for key "${key}":`, error);
      setError(error);
      onError?.(error);
    }
  }, [storedValue, key, onError]);

  return [
    storedValue,
    setValue,
    isInitialized && !isPending,
    { isDirty, lastSync, error },
  ];
}
