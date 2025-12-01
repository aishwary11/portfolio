'use client';

import { createContext, useContext } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

interface ThemeProviderProps {
  readonly children: React.ReactNode;
  readonly theme: Theme;
  readonly toggleTheme: () => void;
}

export function ThemeProvider({ children, theme, toggleTheme }: Readonly<ThemeProviderProps>) {
  const value = { theme, toggleTheme };
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
