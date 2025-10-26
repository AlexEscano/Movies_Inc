import { MovieRepository } from "../../domain/repositories/MovieRepository";
import { Movie } from "../../domain/entities/Movie";
import { MovieDetail } from "../../domain/entities/MovieDetail";
import { MovieApiDataSource } from "../datasources/MovieApiDataSource";
import { mapToAppError } from "../../core/errors/AppError";
import { Actor } from "../../domain/entities/Actor";

export class MovieRepositoryImpl implements MovieRepository {
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
}
