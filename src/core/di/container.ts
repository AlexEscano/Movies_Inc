import { MovieApiDataSource } from '../../data/datasources/MovieApiDataSource';
import { MovieRepositoryImpl } from '../../data/repositories/MovieRepositoryImpl';
import {
  GetPopularMovies,
  GetTopRatedMovies,
  GetUpcomingMovies,
  GetNowPlayingMovies,
  GetMovieDetail,
  GetMovieCredits,
  GetMovieRecommendations,
  RateMovie,
} from '../../domain/usecases';

// Singleton dependencies for the application lifecycle.
const movieApiDataSource = new MovieApiDataSource();
const movieRepository = new MovieRepositoryImpl(movieApiDataSource);

export const useCases = {
  getPopularMovies: new GetPopularMovies(movieRepository),
  getTopRatedMovies: new GetTopRatedMovies(movieRepository),
  getUpcomingMovies: new GetUpcomingMovies(movieRepository),
  getNowPlayingMovies: new GetNowPlayingMovies(movieRepository),
  getMovieDetail: new GetMovieDetail(movieRepository),
  getMovieCredits: new GetMovieCredits(movieRepository),
  getMovieRecommendations: new GetMovieRecommendations(movieRepository),
  rateMovie: new RateMovie(movieRepository),
};
