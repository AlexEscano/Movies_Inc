import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Movie } from '../../domain/entities/Movie';
import { ColorTheme, spacing, typography, useThemedStyles } from '../theme';
import { FavoriteButton } from './FavoriteButton';

type Props = {
  movie: Movie;
  imageBaseUrl: string;
  onPress: (movie: Movie) => void;
  onToggleFavorite?: (movie: Movie) => void;
  isFavorite?: boolean;
};

const createStyles = (colors: ColorTheme) =>
  StyleSheet.create({
    container: {
      width: 140,
      marginRight: spacing.md,
    },
    posterContainer: {
      width: '100%',
      aspectRatio: 2 / 3,
      borderRadius: 16,
      overflow: 'hidden',
      backgroundColor: colors.surface,
      position: 'relative',
    },
    posterBackground: {
      width: '100%',
      aspectRatio: 2 / 3,
      borderRadius: 16,
      overflow: 'hidden',
      backgroundColor: colors.surface,
      justifyContent: 'flex-end',
    },
    poster: {
      borderRadius: 16,
    },
    placeholder: {
      flex: 1,
      borderRadius: 16,
      backgroundColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    placeholderText: {
      color: colors.textSecondary,
      fontFamily: typography.fontRegular,
      fontSize: 12,
    },
    voteBadge: {
      alignSelf: 'flex-end',
      backgroundColor: colors.accent,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderBottomLeftRadius: 12,
    },
    favoriteWrapper: {
      position: 'absolute',
      top: spacing.sm,
      left: spacing.sm,
    },
    voteText: {
      color: colors.textPrimary,
      fontFamily: typography.fontSemiBold,
      fontSize: 12,
    },
    title: {
      marginTop: spacing.sm,
      color: colors.textPrimary,
      fontFamily: typography.fontMedium,
      fontSize: 14,
    },
  });

export const MovieCard: React.FC<Props> = ({ movie, imageBaseUrl, onPress, onToggleFavorite, isFavorite = false }) => {
  const styles = useThemedStyles(createStyles);
  const posterUri = movie.posterPath ? { uri: `${imageBaseUrl}${movie.posterPath}` } : undefined;

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(movie)} activeOpacity={0.8}>
      <View style={styles.posterContainer}>
        {posterUri ? (
          <ImageBackground source={posterUri} imageStyle={styles.poster} style={styles.posterBackground}>
            <View style={styles.voteBadge}>
              <Text style={styles.voteText}>{movie.voteAverage.toFixed(1)}</Text>
            </View>
          </ImageBackground>
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>Sin imagen</Text>
          </View>
        )}
        {onToggleFavorite ? (
          <View style={styles.favoriteWrapper}>
            <FavoriteButton compact isFavorite={isFavorite} onPress={() => onToggleFavorite(movie)} />
          </View>
        ) : null}
      </View>
      <Text style={styles.title} numberOfLines={2}>
        {movie.title}
      </Text>
    </TouchableOpacity>
  );
};
