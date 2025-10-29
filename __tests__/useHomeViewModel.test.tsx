import { renderHook, waitFor } from '@testing-library/react-native';
import { useHomeViewModel } from '@/presentation/hooks/useHomeViewModel';
import { Movie } from '@/domain/entities/Movie';
import { useCases } from '@/core/di/container';

const originalPopularExecute = useCases.getPopularMovies.execute;
const originalTopRatedExecute = useCases.getTopRatedMovies.execute;
const originalUpcomingExecute = useCases.getUpcomingMovies.execute;
const originalNowPlayingExecute = useCases.getNowPlayingMovies.execute;

const createMovie = (id: number, title: string): Movie => ({
  id,
  title,
  overview: `${title} overview`,
  posterPath: `/poster-${id}.jpg`,
  backdropPath: `/backdrop-${id}.jpg`,
  releaseDate: '2024-01-01',
  voteAverage: 7.5,
  genreIds: [],
});

describe('useHomeViewModel', () => {
  beforeEach(() => {
    useCases.getPopularMovies.execute = jest.fn();
    useCases.getTopRatedMovies.execute = jest.fn();
    useCases.getUpcomingMovies.execute = jest.fn();
    useCases.getNowPlayingMovies.execute = jest.fn();
  });

  afterEach(() => {
    useCases.getPopularMovies.execute = originalPopularExecute;
    useCases.getTopRatedMovies.execute = originalTopRatedExecute;
    useCases.getUpcomingMovies.execute = originalUpcomingExecute;
    useCases.getNowPlayingMovies.execute = originalNowPlayingExecute;
  });

  it('loads movies and sorts now playing alphabetically', async () => {
    const unsortedNowPlaying = [
      createMovie(1, 'Zulu'),
      createMovie(2, 'Alpha'),
      createMovie(3, 'Bravo'),
    ];

    (useCases.getPopularMovies.execute as jest.Mock).mockResolvedValue([createMovie(10, 'Popular')]);
    (useCases.getTopRatedMovies.execute as jest.Mock).mockResolvedValue([createMovie(20, 'Top rated')]);
    (useCases.getUpcomingMovies.execute as jest.Mock).mockResolvedValue([createMovie(30, 'Upcoming')]);
    (useCases.getNowPlayingMovies.execute as jest.Mock).mockResolvedValue(unsortedNowPlaying);

    const { result } = renderHook(() => useHomeViewModel());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(useCases.getPopularMovies.execute).toHaveBeenCalledTimes(1);
    expect(result.current.error).toBeNull();
    expect(result.current.nowPlaying.map((movie: Movie) => movie.title)).toEqual([
      'Alpha',
      'Bravo',
      'Zulu',
    ]);
  });

  it('returns an error message if loading movies fails', async () => {
    const errorMessage = 'Ocurrio un error inesperado.';

    (useCases.getPopularMovies.execute as jest.Mock).mockRejectedValue(new Error('network failure'));
    (useCases.getTopRatedMovies.execute as jest.Mock).mockResolvedValue([]);
    (useCases.getUpcomingMovies.execute as jest.Mock).mockResolvedValue([]);
    (useCases.getNowPlayingMovies.execute as jest.Mock).mockResolvedValue([]);

    const { result } = renderHook(() => useHomeViewModel());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe(errorMessage);
    expect(result.current.popular).toEqual([]);
    expect(result.current.nowPlaying).toEqual([]);
  });
});
