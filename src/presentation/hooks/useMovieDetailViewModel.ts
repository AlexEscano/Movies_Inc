import { useEffect, useState } from 'react';
import { useCases } from '../../core/di/container';
import { AppError } from '../../core/errors/AppError';
import { MovieDetail } from '../../domain/entities/MovieDetail';
import { Actor } from '../../domain/entities/Actor';
import { Movie } from '../../domain/entities/Movie';

type DetailState = {
  data: MovieDetail | null;
  loading: boolean;
  error: string | null;
  credits: Actor[];
  recommendations: Movie[];
};

const initialState: DetailState = {
  data: null,
  loading: true,
  error: null,
  credits: [],
  recommendations: [],
};

export const useMovieDetailViewModel = (movieId: number) => {
  const [state, setState] = useState<DetailState>(initialState);
  const [ratingSubmitting, setRatingSubmitting] = useState(false);
  const [ratingSuccess, setRatingSuccess] = useState<string | null>(null);
  const [ratingError, setRatingError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      setState({ data: null, loading: true, error: null, credits: [], recommendations: [] });
      setRatingError(null);
      setRatingSuccess(null);

      try {
        const [detail, credits, recommendations] = await Promise.all([
          useCases.getMovieDetail.execute(movieId),
          useCases.getMovieCredits.execute(movieId),
          useCases.getMovieRecommendations.execute(movieId),
        ]);

        if (!active) {
          return;
        }

        setState({ data: detail, loading: false, error: null, credits, recommendations });
      } catch (error) {
        if (!active) {
          return;
        }

        const message = error instanceof AppError ? error.message : 'No pudimos cargar la pelicula.';
        setState({ data: null, loading: false, error: message, credits: [], recommendations: [] });
      }
    };

    load();

    return () => {
      active = false;
    };
  }, [movieId]);

  const rateMovie = async (value: number) => {
    setRatingSubmitting(true);
    setRatingError(null);
    setRatingSuccess(null);

    try {
      await useCases.rateMovie.execute(movieId, value);
      setRatingSuccess('Calificacion registrada. ¡Gracias!');
    } catch (error) {
      const message =
        error instanceof AppError ? error.message : 'No pudimos registrar tu calificacion.';
      setRatingError(message);
    } finally {
      setRatingSubmitting(false);
    }
  };

  const clearRatingFeedback = () => {
    setRatingError(null);
    setRatingSuccess(null);
  };

  return {
    ...state,
    rateMovie,
    ratingSubmitting,
    ratingSuccess,
    ratingError,
    clearRatingFeedback,
  };
};
