import React from 'react';
import { render, RenderOptions } from '@testing-library/react-native';
import { ThemeProvider } from '../presentation/theme';
import { FavoritesProvider } from '../presentation/state/FavoritesContext';

type AllProvidersProps = {
  children: React.ReactNode;
};

const AllProviders: React.FC<AllProvidersProps> = ({ children }) => (
  <ThemeProvider>
    <FavoritesProvider>{children}</FavoritesProvider>
  </ThemeProvider>
);

export const renderWithProviders = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'queries'>,
) => render(ui, { wrapper: AllProviders, ...options });
