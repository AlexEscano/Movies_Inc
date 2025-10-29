export type ColorTheme = {
  background: string;
  accent: string;
  textPrimary: string;
  textSecondary: string;
  surface: string;
  border: string;
};

export const darkColors: ColorTheme = {
  background: '#0D0D0D',
  accent: '#E50914',
  textPrimary: '#FFFFFF',
  textSecondary: '#B3B3B3',
  surface: '#1A1A1A',
  border: '#2C2C2C',
};

export const lightColors: ColorTheme = {
  background: '#FFFFFF',
  accent: '#E50914',
  textPrimary: '#0D0D0D',
  textSecondary: '#4D4D4D',
  surface: '#F2F2F2',
  border: '#E0E0E0',
};
