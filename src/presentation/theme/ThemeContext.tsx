import React from 'react';
import { Appearance, StyleSheet } from 'react-native';
import { ColorTheme, darkColors, lightColors } from './colors';

export type ThemeMode = 'dark' | 'light';

type ThemeContextValue = {
  mode: ThemeMode;
  colors: ColorTheme;
  toggleTheme: () => void;
  setMode: (mode: ThemeMode) => void;
};

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined);

const getInitialMode = (): ThemeMode => {
  const system = Appearance.getColorScheme();
  return system === 'light' ? 'light' : 'dark';
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = React.useState<ThemeMode>(getInitialMode);

  const toggleTheme = React.useCallback(() => {
    setMode(prev => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const colors = mode === 'light' ? lightColors : darkColors;

  const value = React.useMemo<ThemeContextValue>(
    () => ({
      mode,
      colors,
      toggleTheme,
      setMode,
    }),
    [mode, colors, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextValue => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe usarse dentro de ThemeProvider');
  }
  return context;
};

export const useThemedStyles = <T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>>(
  styleCreator: (colors: ColorTheme) => T,
): T => {
  const { colors } = useTheme();
  return React.useMemo(() => styleCreator(colors), [styleCreator, colors]);
};
