import apiClient from '../../core/network/apiClient';
import { Movie } from '../../domain/entities/Movie';
import { MovieDetail } from '../../domain/entities/MovieDetail';
import { Actor } from '../../domain/entities/Actor';

type MovieListResponse = {
  results: Array<{
    id: number;
    title?: string;
    name?: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date?: string;
    first_air_date?: string;
    vote_average: number;
    genre_ids: number[];
  }>;
};

type MovieDetailResponse = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  genres: Array<{ id: number; name: string }>;
  runtime: number | null;
  tagline: string | null;
  homepage: string | null;
  status: string;
};

type MovieCreditsResponse = {
  cast: Array<{
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
  }>;
};

// Shapes raw TMDb responses into domain entities.
const mapToMovie = (raw: MovieListResponse['results'][0]): Movie => ({
  id: raw.id,
  title: raw.title ?? raw.name ?? 'Sin titulo',
  overview: raw.overview,
  posterPath: raw.poster_path,
  backdropPath: raw.backdrop_path,
  releaseDate: raw.release_date ?? raw.first_air_date ?? '',
  voteAverage: raw.vote_average,
  genreIds: raw.genre_ids,
});

const mapToMovieDetail = (raw: MovieDetailResponse): MovieDetail => ({
  id: raw.id,
  title: raw.title,
  overview: raw.overview,
  posterPath: raw.poster_path,
  backdropPath: raw.backdrop_path,
  releaseDate: raw.release_date,
  voteAverage: raw.vote_average,
  genreIds: raw.genres.map(genre => genre.id),
  runtime: raw.runtime,
  genres: raw.genres,
  tagline: raw.tagline,
  homepage: raw.homepage,
  status: raw.status,
});

export class MovieApiDataSource {
  async getPopular(): Promise<Movie[]> {
    const { data } = await apiClient.get<MovieListResponse>('/movie/popular');
    return data.results.map(mapToMovie);
  }

  async getTopRated(): Promise<Movie[]> {
    const { data } = await apiClient.get<MovieListResponse>('/movie/top_rated');
    return data.results.map(mapToMovie);
  }

  async getUpcoming(): Promise<Movie[]> {
    const { data } = await apiClient.get<MovieListResponse>('/movie/upcoming');
    return data.results.map(mapToMovie);
  }

  async getMovieById(id: number): Promise<MovieDetail> {
    const { data } = await apiClient.get<MovieDetailResponse>(`/movie/${id}`);
    return mapToMovieDetail(data);
  }

  async getCreditsByMovieId(id: number): Promise<Actor[]> {
    const { data } = await apiClient.get<MovieCreditsResponse>(`/movie/${id}/credits`);
    return data.cast.map<Actor>(cast => ({
      id: cast.id,
      name: cast.name,
      character: cast.character,
      profilePath: cast.profile_path,
    }));
  }
}
