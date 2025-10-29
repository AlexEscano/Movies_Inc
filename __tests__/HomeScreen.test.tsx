import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react-native';
import { HomeScreen } from '@/presentation/screens/HomeScreen';
import { useHomeViewModel } from '@/presentation/hooks/useHomeViewModel';
import { renderWithProviders } from '@/test-utils/render';
import { Movie } from '@/domain/entities/Movie';

jest.mock('@/presentation/hooks/useHomeViewModel');

const mockUseHomeViewModel = useHomeViewModel as jest.MockedFunction<typeof useHomeViewModel>;

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

const baseState = {
  popular: [createMovie(1, 'Popular One')],
  topRated: [createMovie(2, 'Top Rated')],
  upcoming: [createMovie(3, 'Upcoming')],
  nowPlaying: [createMovie(4, 'Now Playing')],
  loading: false,
  error: null as string | null,
};

const createNavigation = () =>
  ({
    navigate: jest.fn(),
  } as any);

const createRoute = () =>
  ({
    key: 'Home',
    name: 'Home',
  } as any);

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseHomeViewModel.mockReturnValue(baseState);
  });

  it('renders hero carousel and sections once data is ready', () => {
    const navigation = createNavigation();

    const { getByText } = renderWithProviders(
      <HomeScreen navigation={navigation} route={createRoute()} />,
    );

    expect(getByText('Movies Inc')).toBeTruthy();
    expect(getByText('Modo oscuro')).toBeTruthy();
    expect(getByText('Populares')).toBeTruthy();
    expect(getByText('Proximos estrenos')).toBeTruthy();
    expect(getByText('En cartelera')).toBeTruthy();

    fireEvent.press(getByText('Ver detalles'));
    expect(navigation.navigate).toHaveBeenCalledWith('Detail', { movieId: 1 });
  });

  it('allows toggling between dark and light modes', async () => {
    const { getByTestId, getByText } = renderWithProviders(
      <HomeScreen navigation={createNavigation()} route={createRoute()} />,
    );

    const toggle = getByTestId('theme-toggle-switch');
    fireEvent(toggle, 'valueChange', false);

    await waitFor(() => expect(getByText('Modo claro')).toBeTruthy());
  });
});
