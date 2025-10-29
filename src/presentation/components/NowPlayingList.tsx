import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Movie } from '../../domain/entities/Movie';
import { ColorTheme, spacing, typography, useThemedStyles } from '../theme';
import { FavoriteButton } from './FavoriteButton';

type Props = {
  movies: Movie[];
  imageBaseUrl: string;
  onPressItem: (movie: Movie) => void;
  onToggleFavorite: (movie: Movie) => void;
  isFavorite: (id: number) => boolean;
  title?: string;
};

const formatDate = (value: string) => {
  if (!value) {
    return 'No disponible';
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toLocaleDateString('es-ES');
};

const createStyles = (colors: ColorTheme) =>
  StyleSheet.create({
    container: {
      marginBottom: spacing.xl,
      paddingHorizontal: spacing.lg,
    },
    heading: {
      color: colors.textPrimary,
      fontFamily: typography.fontSemiBold,
      fontSize: 20,
      marginBottom: spacing.md,
    },
    item: {
      flexDirection: 'row',
      marginBottom: spacing.lg,
    },
    posterWrapper: {
      width: 100,
      height: 150,
      borderRadius: 16,
      overflow: 'hidden',
      marginRight: spacing.md,
      backgroundColor: colors.surface,
    },
    poster: {
      width: '100%',
      height: '100%',
    },
    posterFallback: {
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: colors.border,
      borderWidth: 1,
    },
    posterFallbackText: {
      color: colors.textSecondary,
      fontFamily: typography.fontRegular,
      fontSize: 12,
    },
    details: {
      flex: 1,
      justifyContent: 'center',
    },
    title: {
      color: colors.textPrimary,
      fontFamily: typography.fontSemiBold,
      fontSize: 16,
    },
    meta: {
      color: colors.textSecondary,
      fontFamily: typography.fontRegular,
      fontSize: 13,
      marginTop: spacing.xs,
    },
  });

export const NowPlayingList: React.FC<Props> = ({
  movies,
  imageBaseUrl,
  onPressItem,
  onToggleFavorite,
  isFavorite,
  title = 'En cartelera',
}) => {
  const styles = useThemedStyles(createStyles);

  if (movies.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{title}</Text>
      {movies.map(movie => {
        const posterUri = movie.posterPath ? { uri: `${imageBaseUrl}${movie.posterPath}` } : undefined;
        return (
          <View key={movie.id} style={styles.item}>
            <TouchableOpacity
              style={styles.posterWrapper}
              activeOpacity={0.8}
              onPress={() => onPressItem(movie)}
            >
              {posterUri ? (
                <Image source={posterUri} style={styles.poster} />
              ) : (
                <View style={[styles.poster, styles.posterFallback]}>
                  <Text style={styles.posterFallbackText}>Sin imagen</Text>
                </View>
              )}
            </TouchableOpacity>

            <View style={styles.details}>
              <TouchableOpacity onPress={() => onPressItem(movie)} activeOpacity={0.8}>
                <Text style={styles.title} numberOfLines={2}>
                  {movie.title}
                </Text>
              </TouchableOpacity>
              <Text style={styles.meta}>Estreno: {formatDate(movie.releaseDate)}</Text>
              <Text style={styles.meta}>Media de votos: {movie.voteAverage.toFixed(1)}</Text>
              <FavoriteButton
                compact
                isFavorite={isFavorite(movie.id)}
                onPress={() => onToggleFavorite(movie)}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
};
