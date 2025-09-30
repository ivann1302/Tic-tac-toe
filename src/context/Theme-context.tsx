import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { TThemeType, IThemeContextType } from '../types/types';
import { THEME_KEY } from '../utils/constants.ts';

const ThemeContext = createContext<IThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const loadSavedTheme = (): TThemeType => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    return (savedTheme as TThemeType) || 'dark';
  };

  const [theme, setTheme] = useState<TThemeType>(loadSavedTheme());

  const toggleTheme = (): void => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  useEffect((): void => {
    localStorage.setItem(THEME_KEY, theme);
    document.body.dataset.theme = theme;
  }, [theme]);

  const value = {
    theme,
    toggleTheme,
  };
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeContext(): IThemeContextType {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}
