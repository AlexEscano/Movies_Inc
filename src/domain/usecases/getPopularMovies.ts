import { Movie } from '../entities/Movie';
import { MovieRepository } from '../repositories/MovieRepository';

export class GetPopularMovies {
  constructor(private readonly repository: MovieRepository) {}

  execute(): Promise<Movie[]> {
    return this.repository.getPopular();
  }
}
