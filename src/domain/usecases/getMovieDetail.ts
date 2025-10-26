import { MovieDetail } from "../entities/MovieDetail";
import { MovieRepository } from "../repositories/MovieRepository";

export class GetMovieDetail {
  constructor(private readonly repository: MovieRepository) {}

  execute(id: number): Promise<MovieDetail> {
    return this.repository.getMovieById(id);
  }
}
