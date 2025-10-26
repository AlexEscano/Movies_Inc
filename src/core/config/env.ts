// Centralized environment configuration using react-native-dotenv.
import { TMDB_API_KEY, TMDB_BASE_URL, IMAGE_BASE_URL } from '@env';

type EnvConfig = {
  tmdbApiKey: string;
  tmdbBaseUrl: string;
  imageBaseUrl: string;
};

const env: EnvConfig = {
  tmdbApiKey: TMDB_API_KEY,
  tmdbBaseUrl: TMDB_BASE_URL ?? 'https://api.themoviedb.org/3',
  imageBaseUrl: IMAGE_BASE_URL ?? 'https://image.tmdb.org/t/p/w500',
};

Object.entries(env).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
});

export default env;
