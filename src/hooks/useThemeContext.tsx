import React, { useEffect, useState, useContext } from 'react';
import { TThemeContext } from '../services/types';

const ThemeContext = React.createContext<TThemeContext|null>(null);

export const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    const theme: string | null = localStorage.getItem('theme');
    if (theme !== null)
      setDarkTheme(JSON.parse(theme));
  }, []);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
    localStorage.setItem('theme', JSON.stringify(!darkTheme));
  }

  return (
    <ThemeContext.Provider value={{darkTheme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error('useThemeContext must be used within a ThemeContextProvider');
  }
  return context;
};

