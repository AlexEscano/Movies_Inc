import { useEffect, useState } from 'react';
import { Movie } from '../../domain/entities/Movie';
import { useCases } from '../../core/di/container';
import { AppError } from '../../core/errors/AppError';

type HomeState = {
  popular: Movie[];
  topRated: Movie[];
  upcoming: Movie[];
  nowPlaying: Movie[];
  loading: boolean;
  error: string | null;
};

const initialState: HomeState = {
  popular: [],
  topRated: [],
  upcoming: [],
  nowPlaying: [],
  loading: true,
  error: null,
};

export const useHomeViewModel = () => {
  const [state, setState] = useState<HomeState>(initialState);

  useEffect(() => {
    let active = true;

    const load = async () => {
      setState(prev => ({ ...prev, loading: true, error: null }));

      try {
        const [popular, topRated, upcoming, nowPlaying] = await Promise.all([
          useCases.getPopularMovies.execute(),
          useCases.getTopRatedMovies.execute(),
          useCases.getUpcomingMovies.execute(),
          useCases.getNowPlayingMovies.execute(),
        ]);

        if (!active) {
          return;
        }

        const sortedNowPlaying = [...nowPlaying].sort((a, b) =>
          a.title.localeCompare(b.title, 'es', { sensitivity: 'base' }),
        );

        setState({
          popular,
          topRated,
          upcoming,
          nowPlaying: sortedNowPlaying,
          loading: false,
          error: null,
        });
      } catch (error) {
        if (!active) {
          return;
        }

        const message = error instanceof AppError ? error.message : 'Ocurrio un error inesperado.';
        setState(prev => ({ ...prev, loading: false, error: message }));
      }
    };

    load();

    return () => {
      active = false;
    };
  }, []);

  return state;
};
