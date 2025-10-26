import { Movie } from './Movie';

export interface MovieDetail extends Movie {
  runtime: number | null;
  genres: Array<{
    id: number;
    name: string;
  }>;
  tagline: string | null;
  homepage: string | null;
  status: string;
}
