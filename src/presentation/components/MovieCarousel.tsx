import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Movie } from '../../domain/entities/Movie';
import { colors, spacing, typography } from '../theme';
import { MovieCard } from './MovieCard';

type Props = {
  title: string;
  data: Movie[];
  imageBaseUrl: string;
  onPressItem: (movie: Movie) => void;
  onToggleFavorite?: (movie: Movie) => void;
  isFavorite?: (id: number) => boolean;
};

export const MovieCarousel: React.FC<Props> = ({
  title,
  data,
  imageBaseUrl,
  onPressItem,
  onToggleFavorite,
  isFavorite,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        contentContainerStyle={styles.listContent}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            imageBaseUrl={imageBaseUrl}
            onPress={onPressItem}
            onToggleFavorite={onToggleFavorite}
            isFavorite={isFavorite ? isFavorite(item.id) : false}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xl,
  },
  title: {
    color: colors.textPrimary,
    fontFamily: typography.fontSemiBold,
    fontSize: 20,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
  },
});
