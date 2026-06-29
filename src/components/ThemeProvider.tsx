'use client';

import { useAdvancedAsyncLocalStorage } from '@/hooks/useAdvancedAsyncLocalStorage';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isLoading: boolean;
  isDirty: boolean;
  lastSync: number;
  systemTheme: Theme | null;
  setSystemTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Theme validation function
 */
const validateTheme = (value: unknown): boolean => {
  return value === 'dark' || value === 'light';
};

/**
 * Theme transform function for extensibility
 */
const transformTheme = (value: unknown): Theme => {
  return validateTheme(value) ? (value as Theme) : 'dark';
};

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

interface ThemeProviderProps {
  readonly children: React.ReactNode;
  readonly defaultTheme?: Theme;
  readonly persistToRemote?: boolean;
}

export function ThemeProvider({
  children,
  defaultTheme = 'dark',
  persistToRemote = false,
}: Readonly<ThemeProviderProps>): React.ReactNode {
  const [theme, setTheme, isStorageReady, { isDirty, lastSync, error }] = useAdvancedAsyncLocalStorage<Theme>(
    'app-theme',
    defaultTheme,
    {
      debounceMs: 500,
      validateFn: validateTheme,
      transformFn: transformTheme,
      persistToRemote,
      remoteKey: 'user-theme-preference',
      syncInterval: 30000,
      onError: (error) => console.error('Theme storage error:', error),
    },
  );

  const [isLoading, setIsLoading] = useState(!isStorageReady);
  const [systemTheme, setSystemTheme] = useState<Theme | null>(null);

  // Detect system theme preference
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    setIsLoading(!isStorageReady);
  }, [isStorageReady]);

  // Apply theme to document with smooth transition
  useEffect(() => {
    if (!isStorageReady) return;

    const htmlElement = document.documentElement;

    // Add transition class for smooth color changes
    htmlElement.style.colorScheme = theme;
    htmlElement.classList.add('transition-colors');
    htmlElement.classList.remove('dark', 'light');
    htmlElement.classList.add(theme);
    htmlElement.setAttribute('data-theme', theme);

    // Remove transition class after animation
    const timer = setTimeout(() => {
      htmlElement.classList.remove('transition-colors');
    }, 300);

    return () => clearTimeout(timer);
  }, [theme, isStorageReady]);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme: Theme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  }, [setTheme]);

  if (error) {
    console.error('Theme context error:', error);
  }

  const value: ThemeContextType = {
    theme,
    toggleTheme,
    isLoading,
    isDirty,
    lastSync,
    systemTheme,
    setSystemTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
