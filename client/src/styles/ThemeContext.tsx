import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type AppTheme = {
  mainbackground: string;
  setBackground: (val: string) => void;
  textColor: string;
  toggleTextColor: () => void;
  setDefault: () => void;
};

const ThemeContext = createContext<AppTheme | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mainbackground, setBackground] = useState(
    'linear-gradient(135deg, #000000, #000000)'
  );

  const [textColor, setTextColor] = useState('#ffffff');

  const toggleTextColor = () => {
    setTextColor((prev) => (prev === '#ffffff' ? '#000000' : '#ffffff'));
  };

  const setDefault = () => {
    setTextColor('#ffffff')
    setBackground('linear-gradient(135deg, #000000, #000000)')
  }

  return (
    <ThemeContext.Provider
      value={{ mainbackground, setBackground, textColor, toggleTextColor, setDefault }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('test');
  return ctx;
};
