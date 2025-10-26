import { Movie } from '../entities/Movie';
import { MovieDetail } from '../entities/MovieDetail';
import { Actor } from '../entities/Actor';

export interface MovieRepository {
  getPopular(): Promise<Movie[]>;
  getTopRated(): Promise<Movie[]>;
  getUpcoming(): Promise<Movie[]>;
  getMovieById(id: number): Promise<MovieDetail>;
  getCreditsByMovieId(id: number): Promise<Actor[]>;
}
