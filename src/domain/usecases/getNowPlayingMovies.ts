import { Movie } from '../entities/Movie';
import { MovieRepository } from '../repositories/MovieRepository';

export class GetNowPlayingMovies {
  constructor(private readonly repository: MovieRepository) {}

  execute(): Promise<Movie[]> {
    return this.repository.getNowPlaying();
  }
}
