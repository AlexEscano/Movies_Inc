import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useHomeViewModel } from '../hooks/useHomeViewModel';
import { ColorTheme, spacing, typography, useTheme, useThemedStyles } from '../theme';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { ErrorState } from '../components/ErrorState';
import { MovieCarousel } from '../components/MovieCarousel';
import env from '../../core/config/env';
import { RootStackParamList } from '../navigation/types';
import { NowPlayingList } from '../components/NowPlayingList';
import { useFavorites } from '../state/FavoritesContext';
import { Movie } from '../../domain/entities/Movie';
import { HeroCarousel } from '../components/HeroCarousel';
import { ThemeToggle } from '../components/ThemeToggle';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const createStyles = (colors: ColorTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      paddingVertical: spacing.xl,
    },
    header: {
      paddingHorizontal: spacing.lg,
      marginBottom: spacing.xl,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    heading: {
      fontFamily: typography.fontBold,
      fontSize: 28,
      color: colors.textPrimary,
    },
    heroWrapper: {
      marginBottom: spacing.xl,
    },
    loadingWrapper: {
      paddingVertical: spacing.xl,
    },
  });

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { popular, topRated, upcoming, nowPlaying, loading, error } = useHomeViewModel();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { mode } = useTheme();
  const styles = useThemedStyles(createStyles);

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
      <StatusBar barStyle={mode === 'dark' ? 'light-content' : 'dark-content'} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Text style={styles.heading}>Movies Inc</Text>
            <ThemeToggle />
          </View>
        </View>

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
