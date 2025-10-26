import { Movie } from '../entities/Movie';
import { MovieRepository } from '../repositories/MovieRepository';

export class GetUpcomingMovies {
  constructor(private readonly repository: MovieRepository) {}

  execute(): Promise<Movie[]> {
    return this.repository.getUpcoming();
  }
}
