import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { DetailScreen } from '@/presentation/screens/DetailScreen';
import { useMovieDetailViewModel } from '@/presentation/hooks/useMovieDetailViewModel';
import { renderWithProviders } from '@/test-utils/render';
import { MovieDetail } from '@/domain/entities/MovieDetail';
import { Actor } from '@/domain/entities/Actor';
import { Movie } from '@/domain/entities/Movie';

jest.mock('@/presentation/hooks/useMovieDetailViewModel');

const mockUseMovieDetailViewModel = useMovieDetailViewModel as jest.MockedFunction<
  typeof useMovieDetailViewModel
>;

const detail: MovieDetail = {
  id: 99,
  title: 'Matrix',
  overview: 'A hacker discovers the truth about reality.',
  posterPath: '/matrix-poster.jpg',
  backdropPath: '/matrix-backdrop.jpg',
  releaseDate: '1999-03-31',
  voteAverage: 8.0,
  genreIds: [1],
  genres: [{ id: 1, name: 'Sci-Fi' }],
  runtime: 136,
  tagline: 'Welcome to the Real World.',
  homepage: 'https://matrix.example.com',
  status: 'Released',
};

const credits: Actor[] = [
  { id: 1, name: 'Keanu Reeves', character: 'Neo', profilePath: '/neo.jpg' },
];

const recommendations: Movie[] = [
  {
    id: 100,
    title: 'Matrix Reloaded',
    overview: 'Second movie overview',
    posterPath: '/matrix2.jpg',
    backdropPath: '/matrix2-bg.jpg',
    releaseDate: '2003-05-01',
    voteAverage: 7.2,
    genreIds: [],
  },
];

const createNavigation = () =>
  ({
    push: jest.fn(),
  } as any);

const createRoute = () =>
  ({
    key: 'Detail',
    name: 'Detail',
    params: { movieId: detail.id },
  } as any);

describe('DetailScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders movie details, recommendations and allows rating', () => {
    const navigation = createNavigation();
    const rateMovieMock = jest.fn().mockResolvedValue(undefined);

    mockUseMovieDetailViewModel.mockReturnValue({
      data: detail,
      credits,
      recommendations,
      loading: false,
      error: null,
      rateMovie: rateMovieMock,
      ratingSubmitting: false,
      ratingSuccess: null,
      ratingError: null,
      clearRatingFeedback: jest.fn(),
    });

    const { getByText, getAllByText } = renderWithProviders(
      <DetailScreen navigation={navigation} route={createRoute()} />,
    );

    expect(getByText('Matrix')).toBeTruthy();
    expect(getByText('Recomendaciones')).toBeTruthy();
    expect(getByText('Matrix Reloaded')).toBeTruthy();

    const [fifthStar] = getAllByText('☆');
    fireEvent.press(fifthStar);

    expect(rateMovieMock).toHaveBeenCalledWith(10);
  });
});
