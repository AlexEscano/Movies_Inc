import { Movie } from '../entities/Movie';
import { MovieRepository } from '../repositories/MovieRepository';

export class GetMovieRecommendations {
  constructor(private readonly repository: MovieRepository) {}

  execute(movieId: number): Promise<Movie[]> {
    return this.repository.getRecommendationsByMovieId(movieId);
  }
}
