import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { Movie } from '../../domain/entities/Movie';

type FavoritesContextValue = {
  favorites: Movie[];
  toggleFavorite: (movie: Movie) => void;
  isFavorite: (id: number) => boolean;
};

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

type ProviderProps = {
  children: React.ReactNode;
};

export const FavoritesProvider: React.FC<ProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  const toggleFavorite = useCallback((movie: Movie) => {
    setFavorites(prev => {
      const exists = prev.some(item => item.id === movie.id);
      if (exists) {
        return prev.filter(item => item.id !== movie.id);
      }
      return [...prev, movie];
    });
  }, []);

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favorites,
      toggleFavorite,
      isFavorite: (id: number) => favorites.some(item => item.id === id),
    }),
    [favorites, toggleFavorite],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

export const useFavorites = (): FavoritesContextValue => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites debe usarse dentro de un FavoritesProvider');
  }
  return context;
};
