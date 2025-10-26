import { Actor } from "../entities/Actor";
import { MovieRepository } from "../repositories/MovieRepository";

export class GetMovieCredits {
  constructor(private readonly repository: MovieRepository) {}

  execute(movieId: number): Promise<Actor[]> {
    return this.repository.getCreditsByMovieId(movieId);
  }
}
