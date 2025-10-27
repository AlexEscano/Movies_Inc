import { MovieRepository } from "../../domain/repositories/MovieRepository";
import { Movie } from "../../domain/entities/Movie";
import { MovieDetail } from "../../domain/entities/MovieDetail";
import { MovieApiDataSource } from "../datasources/MovieApiDataSource";
import { mapToAppError } from "../../core/errors/AppError";
import { Actor } from "../../domain/entities/Actor";

export class MovieRepositoryImpl implements MovieRepository {
  private guestSessionId: string | null = null;

  constructor(private readonly api: MovieApiDataSource) {}

  async getPopular(): Promise<Movie[]> {
    try {
      return await this.api.getPopular();
    } catch (error) {
      throw mapToAppError(error, "No pudimos obtener las peliculas populares.");
    }
  }

  async getTopRated(): Promise<Movie[]> {
    try {
      return await this.api.getTopRated();
    } catch (error) {
      throw mapToAppError(
        error,
        "No pudimos obtener las peliculas mejor valoradas."
      );
    }
  }

  async getUpcoming(): Promise<Movie[]> {
    try {
      return await this.api.getUpcoming();
    } catch (error) {
      throw mapToAppError(error, "No pudimos obtener los proximos estrenos.");
    }
  }

  async getNowPlaying(): Promise<Movie[]> {
    try {
      return await this.api.getNowPlaying();
    } catch (error) {
      throw mapToAppError(
        error,
        "No pudimos obtener las peliculas en cartelera."
      );
    }
  }

  async getMovieById(id: number): Promise<MovieDetail> {
    try {
      return await this.api.getMovieById(id);
    } catch (error) {
      throw mapToAppError(
        error,
        "No pudimos cargar el detalle de la pelicula."
      );
    }
  }

  async getCreditsByMovieId(id: number): Promise<Actor[]> {
    try {
      return await this.api.getCreditsByMovieId(id);
    } catch (error) {
      throw mapToAppError(
        error,
        "No pudimos obtener el reparto de la pelicula."
      );
    }
  }

  async getRecommendationsByMovieId(id: number): Promise<Movie[]> {
    try {
      return await this.api.getRecommendationsByMovieId(id);
    } catch (error) {
      throw mapToAppError(
        error,
        "No pudimos obtener peliculas recomendadas."
      );
    }
  }

  async rateMovie(id: number, rating: number): Promise<void> {
    try {
      const sessionId = await this.ensureGuestSession();
      await this.api.rateMovie(id, rating, sessionId);
    } catch (error) {
      throw mapToAppError(
        error,
        "No pudimos registrar tu calificacion. Intentalo nuevamente."
      );
    }
  }

  private async ensureGuestSession(): Promise<string> {
    if (this.guestSessionId) {
      return this.guestSessionId;
    }

    const guestSessionId = await this.api.createGuestSession();
    this.guestSessionId = guestSessionId;
    return guestSessionId;
  }
}
