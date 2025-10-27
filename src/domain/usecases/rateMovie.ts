import { MovieRepository } from '../repositories/MovieRepository';

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export class RateMovie {
  constructor(private readonly repository: MovieRepository) {}

  async execute(movieId: number, rating: number): Promise<void> {
    const normalized = clamp(Math.round(rating * 2) / 2, 0.5, 10);
    await this.repository.rateMovie(movieId, normalized);
  }
}
