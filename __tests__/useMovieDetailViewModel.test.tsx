import { act, renderHook, waitFor } from '@testing-library/react-native';
import { useMovieDetailViewModel } from '@/presentation/hooks/useMovieDetailViewModel';
import { MovieDetail } from '@/domain/entities/MovieDetail';
import { Actor } from '@/domain/entities/Actor';
import { Movie } from '@/domain/entities/Movie';
import { useCases } from '@/core/di/container';

const originalGetMovieDetail = useCases.getMovieDetail.execute;
const originalGetMovieCredits = useCases.getMovieCredits.execute;
const originalGetMovieRecommendations = useCases.getMovieRecommendations.execute;
const originalRateMovie = useCases.rateMovie.execute;

const createDetail = (): MovieDetail => ({
  id: 42,
  title: 'Inception',
  overview: 'Dream within a dream',
  posterPath: '/poster.jpg',
  backdropPath: '/backdrop.jpg',
  releaseDate: '2010-07-16',
  voteAverage: 8.8,
  genreIds: [1],
  genres: [{ id: 1, name: 'Sci-Fi' }],
  runtime: 148,
  tagline: 'Your mind is the scene of the crime.',
  homepage: 'https://example.com',
  status: 'Released',
});

const createActor = (id: number, name: string): Actor => ({
  id,
  name,
  character: `Character ${id}`,
  profilePath: `/actor-${id}.jpg`,
});

const createRecommendation = (id: number, title: string): Movie => ({
  id,
  title,
  overview: `${title} overview`,
  posterPath: `/rec-${id}.jpg`,
  backdropPath: `/rec-backdrop-${id}.jpg`,
  releaseDate: '2024-05-01',
  voteAverage: 7.1,
  genreIds: [],
});

describe('useMovieDetailViewModel', () => {
  beforeEach(() => {
    useCases.getMovieDetail.execute = jest.fn();
    useCases.getMovieCredits.execute = jest.fn();
    useCases.getMovieRecommendations.execute = jest.fn();
    useCases.rateMovie.execute = jest.fn();
  });

  afterEach(() => {
    useCases.getMovieDetail.execute = originalGetMovieDetail;
    useCases.getMovieCredits.execute = originalGetMovieCredits;
    useCases.getMovieRecommendations.execute = originalGetMovieRecommendations;
    useCases.rateMovie.execute = originalRateMovie;
  });

  it('loads detail, credits and recommendations before enabling rating interactions', async () => {
    const detail = createDetail();
    const credits = [createActor(1, 'Actor One')];
    const recommendations = [createRecommendation(2, 'Recommended Movie')];

    (useCases.getMovieDetail.execute as jest.Mock).mockResolvedValue(detail);
    (useCases.getMovieCredits.execute as jest.Mock).mockResolvedValue(credits);
    (useCases.getMovieRecommendations.execute as jest.Mock).mockResolvedValue(recommendations);
    (useCases.rateMovie.execute as jest.Mock).mockResolvedValue(undefined);

    const { result } = renderHook(() => useMovieDetailViewModel(detail.id));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual(detail);
    expect(result.current.credits).toEqual(credits);
    expect(result.current.recommendations).toEqual(recommendations);

    await act(async () => {
      await result.current.rateMovie(8);
    });

    expect(useCases.rateMovie.execute).toHaveBeenCalledWith(detail.id, 8);
    await waitFor(() =>
      expect(result.current.ratingSuccess).toEqual(
        expect.stringContaining('Calificacion registrada'),
      ),
    );
    expect(result.current.ratingError).toBeNull();
  });

  it('captures errors when rating the movie fails', async () => {
    const detail = createDetail();

    (useCases.getMovieDetail.execute as jest.Mock).mockResolvedValue(detail);
    (useCases.getMovieCredits.execute as jest.Mock).mockResolvedValue([]);
    (useCases.getMovieRecommendations.execute as jest.Mock).mockResolvedValue([]);
    (useCases.rateMovie.execute as jest.Mock).mockRejectedValue(new Error('boom'));

    const { result } = renderHook(() => useMovieDetailViewModel(detail.id));

    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.rateMovie(5);
    });

    await waitFor(() =>
      expect(result.current.ratingError).toBe('No pudimos registrar tu calificacion.'),
    );
    expect(result.current.ratingSuccess).toBeNull();
  });
});
