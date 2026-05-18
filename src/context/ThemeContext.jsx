'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
      setDark(false);
      document.body.style.background = '#f4f6fb';
      document.body.style.color = '#0a0e1a';
    } else {
      document.body.style.background = '#0a0e1a';
      document.body.style.color = '#e8ecf4';
    }
  }, []);

  const toggleTheme = () => {
    setDark(prev => {
      const next = !prev;
      if (next) {
        document.body.style.background = '#0a0e1a';
        document.body.style.color = '#e8ecf4';
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.style.background = '#f4f6fb';
        document.body.style.color = '#0a0e1a';
        localStorage.setItem('theme', 'light');
      }
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
