import { useEffect, useState } from 'react';
import { useCases } from '../../core/di/container';
import { AppError } from '../../core/errors/AppError';
import { MovieDetail } from '../../domain/entities/MovieDetail';
import { Actor } from '../../domain/entities/Actor';

type DetailState = {
  data: MovieDetail | null;
  loading: boolean;
  error: string | null;
  credits: Actor[];
};

const initialState: DetailState = {
  data: null,
  loading: true,
  error: null,
  credits: [],
};

export const useMovieDetailViewModel = (movieId: number) => {
  const [state, setState] = useState<DetailState>(initialState);

  useEffect(() => {
    let active = true;

    const load = async () => {
      setState({ data: null, loading: true, error: null, credits: [] });

      try {
        const [detail, credits] = await Promise.all([
          useCases.getMovieDetail.execute(movieId),
          useCases.getMovieCredits.execute(movieId),
        ]);

        if (!active) {
          return;
        }

        setState({ data: detail, loading: false, error: null, credits });
      } catch (error) {
        if (!active) {
          return;
        }

        const message = error instanceof AppError ? error.message : 'No pudimos cargar la pelicula.';
        setState({ data: null, loading: false, error: message, credits: [] });
      }
    };

    load();

    return () => {
      active = false;
    };
  }, [movieId]);

  return state;
};
