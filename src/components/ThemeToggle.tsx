'use client';

import { useTheme } from '@/components/ThemeProvider';
import { Check, Moon, Sun, Zap } from 'lucide-react';
import React, { memo, useEffect, useState } from 'react';

export const ThemeToggle = memo(function ThemeToggle(): React.ReactNode {
  const { theme, toggleTheme, isLoading, isDirty, systemTheme } = useTheme();
  const [showSync, setShowSync] = useState(false);

  useEffect(() => {
    if (isDirty) {
      setShowSync(true);
      const timer = setTimeout(() => setShowSync(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isDirty]);

  if (isLoading) {
    return (
      <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-md animate-pulse" />
    );
  }

  return (
    <div className="relative inline-flex items-center gap-2">
      <button
        onClick={toggleTheme}
        className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 relative"
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        title={`Current: ${theme} | System: ${systemTheme}`}
        type="button"
      >
        {theme === 'dark' ? (
          <Sun size={20} className="text-yellow-400 animate-in" />
        ) : (
          <Moon size={20} className="text-gray-600 animate-in" />
        )}

        {/* Unsaved indicator */}
        {isDirty && (
          <span className="absolute top-0 right-0 w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
        )}
      </button>

      {/* Sync status indicator */}
      {showSync && (
        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 animate-fade-in">
          {isDirty ? (
            <>
              <Zap size={12} className="text-orange-500" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Check size={12} className="text-green-500" />
              <span>Saved</span>
            </>
          )}
        </div>
      )}

      {/* System theme indicator */}
      {systemTheme && systemTheme !== theme && (
        <div
          className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded text-gray-600 dark:text-gray-300 cursor-help"
          title="System prefers this theme"
        >
          📱 {systemTheme}
        </div>
      )}
    </div>
  );
});
