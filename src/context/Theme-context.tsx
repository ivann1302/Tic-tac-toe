import { createContext, useState, useContext, useEffect, ReactNode } from 'react';

const THEME_KEY = 'tic-tac-toe-theme';

type ThemeType = 'dark' | 'light';

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
}
// &&&&&&
const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const loadSavedTheme = (): ThemeType => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    return (savedTheme as ThemeType) || 'dark';
  };

  const [theme, setTheme] = useState<ThemeType>(loadSavedTheme());

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
    document.body.dataset.theme = theme;
  }, [theme]);

  const value = {
    theme,
    toggleTheme,
  };
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}
