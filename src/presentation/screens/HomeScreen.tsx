import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useHomeViewModel } from '../hooks/useHomeViewModel';
import { colors, spacing, typography } from '../theme';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { ErrorState } from '../components/ErrorState';
import { MovieCarousel } from '../components/MovieCarousel';
import env from '../../core/config/env';
import { RootStackParamList } from '../navigation/types';
import { NowPlayingList } from '../components/NowPlayingList';
import { useFavorites } from '../state/FavoritesContext';
import { Movie } from '../../domain/entities/Movie';
import { HeroCarousel } from '../components/HeroCarousel';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { popular, topRated, upcoming, nowPlaying, loading, error } = useHomeViewModel();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const handlePressMovie = (id: number) => {
    navigation.navigate('Detail', { movieId: id });
  };

  const handleToggleFavorite = React.useCallback(
    (movie: Movie) => {
      toggleFavorite(movie);
    },
    [toggleFavorite],
  );

  const favoriteMovies = React.useMemo(
    () => [...favorites].sort((a, b) => a.title.localeCompare(b.title, 'es', { sensitivity: 'base' })),
    [favorites],
  );

  const heroMovies = React.useMemo(
    () => popular.slice(0, Math.min(popular.length, 5)),
    [popular],
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Movies Inc</Text>

        {loading && (
          <View style={styles.loadingWrapper}>
            <LoadingIndicator />
          </View>
        )}
        {error && !loading && <ErrorState message={error} />}

        {!loading && !error && (
          <>
            <View style={styles.heroWrapper}>
              <HeroCarousel
                movies={heroMovies}
                imageBaseUrl={env.imageBaseUrl}
                onPressDetails={movie => handlePressMovie(movie.id)}
              />
            </View>
            {favoriteMovies.length > 0 && (
              <MovieCarousel
                title="Mis favoritos"
                data={favoriteMovies}
                imageBaseUrl={env.imageBaseUrl}
                onPressItem={movie => handlePressMovie(movie.id)}
                onToggleFavorite={handleToggleFavorite}
                isFavorite={isFavorite}
              />
            )}
            <MovieCarousel
              title="Populares"
              data={popular}
              imageBaseUrl={env.imageBaseUrl}
              onPressItem={movie => handlePressMovie(movie.id)}
              onToggleFavorite={handleToggleFavorite}
              isFavorite={isFavorite}
            />
            <MovieCarousel
              title="Mejor valoradas"
              data={topRated}
              imageBaseUrl={env.imageBaseUrl}
              onPressItem={movie => handlePressMovie(movie.id)}
              onToggleFavorite={handleToggleFavorite}
              isFavorite={isFavorite}
            />
            <MovieCarousel
              title="Proximos estrenos"
              data={upcoming}
              imageBaseUrl={env.imageBaseUrl}
              onPressItem={movie => handlePressMovie(movie.id)}
              onToggleFavorite={handleToggleFavorite}
              isFavorite={isFavorite}
            />
            <NowPlayingList
              movies={nowPlaying}
              imageBaseUrl={env.imageBaseUrl}
              onPressItem={movie => handlePressMovie(movie.id)}
              onToggleFavorite={handleToggleFavorite}
              isFavorite={isFavorite}
            />
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingVertical: spacing.xl,
  },
  heading: {
    fontFamily: typography.fontBold,
    fontSize: 28,
    color: colors.textPrimary,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  heroWrapper: {
    marginBottom: spacing.xl,
  },
  loadingWrapper: {
    paddingVertical: spacing.xl,
  },
});
