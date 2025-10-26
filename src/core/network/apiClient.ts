import axios from 'axios';
import env from '../config/env';

// Axios instance configured for TMDb API access.
const apiClient = axios.create({
  baseURL: env.tmdbBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    api_key: env.tmdbApiKey,
    language: 'es-ES',
  },
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    // Normalize network errors for the data layer to handle.
    const message =
      error?.response?.data?.status_message ||
      error?.message ||
      'Unexpected TMDb network error';

    return Promise.reject(new Error(message));
  },
);

export default apiClient;
