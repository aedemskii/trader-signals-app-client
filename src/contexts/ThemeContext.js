import React, { useEffect, useState } from 'react';

export const ThemeContext = React.createContext();

export const ThemeProvider = ({children}) => {
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    const theme = JSON.parse(localStorage.getItem('theme'));
    setDarkTheme(theme);
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

