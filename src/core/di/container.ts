import { MovieApiDataSource } from '../../data/datasources/MovieApiDataSource';
import { MovieRepositoryImpl } from '../../data/repositories/MovieRepositoryImpl';
import {
  GetPopularMovies,
  GetTopRatedMovies,
  GetUpcomingMovies,
  GetMovieDetail,
  GetMovieCredits,
} from '../../domain/usecases';

// Singleton dependencies for the application lifecycle.
const movieApiDataSource = new MovieApiDataSource();
const movieRepository = new MovieRepositoryImpl(movieApiDataSource);

export const useCases = {
  getPopularMovies: new GetPopularMovies(movieRepository),
  getTopRatedMovies: new GetTopRatedMovies(movieRepository),
  getUpcomingMovies: new GetUpcomingMovies(movieRepository),
  getMovieDetail: new GetMovieDetail(movieRepository),
  getMovieCredits: new GetMovieCredits(movieRepository),
};
