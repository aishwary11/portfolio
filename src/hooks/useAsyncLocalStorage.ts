'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type SetValue<T> = (value: T | ((val: T) => T)) => void;

interface AsyncStorageOptions {
  debounceMs?: number;
  fallbackValue?: unknown;
}

export function useAsyncLocalStorage<T>(
  key: string,
  initialValue: T,
  options: AsyncStorageOptions = {},
): [T, SetValue<T>, boolean] {
  const { debounceMs = 300, fallbackValue } = options;
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isInitialized, setIsInitialized] = useState(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize from localStorage
  useEffect(() => {
    const initializeStorage = async () => {
      try {
        if (typeof window === 'undefined') return;

        const item = localStorage.getItem(key);
        if (item) {
          const parsedValue = JSON.parse(item) as T;
          setStoredValue(parsedValue);
        }
      } catch (error) {
        console.warn(`Error reading localStorage key "${key}":`, error);
        if (fallbackValue !== undefined) {
          setStoredValue(fallbackValue as T);
        }
      } finally {
        setIsInitialized(true);
      }
    };

    initializeStorage();
  }, [key, fallbackValue]);

  // Debounced write to localStorage
  useEffect(() => {
    if (!isInitialized || typeof window === 'undefined') return;

    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new timer
    debounceTimerRef.current = setTimeout(() => {
      try {
        localStorage.setItem(key, JSON.stringify(storedValue));
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    }, debounceMs);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [key, storedValue, isInitialized, debounceMs]);

  const setValue: SetValue<T> = useCallback((value) => {
    try {
      const valueToStore =
        typeof value === 'function' ? (value as (val: T) => T)(storedValue) : value;
      setStoredValue(valueToStore);
    } catch (error) {
      console.warn(`Error setting value for key "${key}":`, error);
    }
  }, [storedValue, key]);

  return [storedValue, setValue, isInitialized];
}
