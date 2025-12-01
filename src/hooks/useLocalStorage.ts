'use client';

import { useEffect, useState } from 'react';

type SetValue<T> = (value: T | ((val: T) => T)) => void;

export function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  // Initialize with initialValue to ensure server and client render the same on first render
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isInitialized, setIsInitialized] = useState(false);

  // Read from localStorage only on client after mount
  useEffect(() => {
    try {
      const item = globalThis.window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
      setIsInitialized(true);
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      setIsInitialized(true);
    }
  }, [key]);

  // Update localStorage whenever storedValue changes (but skip initial render)
  useEffect(() => {
    if (!isInitialized) return;

    try {
      globalThis.window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue, isInitialized]);

  const setValue: SetValue<T> = (value) => {
    try {
      const valueToStore = typeof value === 'function' ? (value as (val: T) => T)(storedValue) : value;
      setStoredValue(valueToStore);
    } catch (error) {
      console.warn(`Error setting value for key "${key}":`, error);
    }
  }; return [storedValue, setValue];
}
