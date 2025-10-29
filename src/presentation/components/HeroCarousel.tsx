import React from 'react';
import {
  Dimensions,
  FlatList,
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Movie } from '../../domain/entities/Movie';
import { ColorTheme, ThemeMode, spacing, typography, useTheme } from '../theme';

type Props = {
  movies: Movie[];
  imageBaseUrl: string;
  onPressDetails: (movie: Movie) => void;
  intervalMs?: number;
};

const HERO_WIDTH = Dimensions.get('window').width;
const HERO_HEIGHT = HERO_WIDTH * 0.56;
const DEFAULT_INTERVAL = 5000;

const createStyles = (colors: ColorTheme, mode: ThemeMode) =>
  StyleSheet.create({
    slide: {
      width: HERO_WIDTH,
      height: HERO_HEIGHT,
      backgroundColor: colors.surface,
    },
    background: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    backgroundImage: {
      opacity: 0.75,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: mode === 'dark' ? 'rgba(13, 13, 13, 0.45)' : 'rgba(0, 0, 0, 0.25)',
    },
    content: {
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.xl,
    },
    title: {
      color: colors.textPrimary,
      fontFamily: typography.fontBold,
      fontSize: 28,
      marginBottom: spacing.md,
    },
    button: {
      backgroundColor: colors.accent,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
      borderRadius: 999,
      alignSelf: 'flex-start',
    },
    buttonOutline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.accent,
    },
    buttonText: {
      color: colors.textPrimary,
      fontFamily: typography.fontSemiBold,
      fontSize: 14,
    },
    fallback: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-start',
      paddingHorizontal: spacing.lg,
      backgroundColor: colors.surface,
    },
    dotsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: spacing.sm,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: mode === 'dark' ? colors.surface : colors.border,
      marginHorizontal: spacing.xs,
    },
    dotActive: {
      backgroundColor: colors.accent,
      width: 16,
    },
  });

export const HeroCarousel: React.FC<Props> = ({
  movies,
  imageBaseUrl,
  onPressDetails,
  intervalMs = DEFAULT_INTERVAL,
}) => {
  const { colors, mode } = useTheme();
  const styles = React.useMemo(() => createStyles(colors, mode), [colors, mode]);
  const listRef = React.useRef<FlatList<Movie>>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  React.useEffect(() => {
    setCurrentIndex(0);
    if (listRef.current) {
      try {
        listRef.current.scrollToIndex({ index: 0, animated: false });
      } catch {
        // ignore
      }
    }
  }, [movies.length]);

  React.useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (movies.length <= 1) {
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
    }

    intervalRef.current = setInterval(() => {
      setCurrentIndex(prev => {
        const next = (prev + 1) % movies.length;
        return next;
      });
    }, intervalMs);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [movies.length, intervalMs]);

  React.useEffect(() => {
    if (!listRef.current) {
      return;
    }

    try {
      listRef.current.scrollToIndex({
        index: currentIndex,
        animated: true,
      });
    } catch {
      // FlatList might not be ready yet; ignore errors silently.
    }
  }, [currentIndex]);

  const handleMomentumEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / HERO_WIDTH);
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  const renderItem = ({ item }: { item: Movie }) => {
    const backdropUri = item.backdropPath
      ? { uri: `${imageBaseUrl}${item.backdropPath}` }
      : item.posterPath
      ? { uri: `${imageBaseUrl}${item.posterPath}` }
      : undefined;

    return (
      <View style={styles.slide}>
        {backdropUri ? (
          <ImageBackground source={backdropUri} style={styles.background} imageStyle={styles.backgroundImage}>
            <View style={styles.overlay} />
            <View style={styles.content}>
              <Text style={styles.title} numberOfLines={2}>
                {item.title}
              </Text>
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.85}
                onPress={() => onPressDetails(item)}
              >
                <Text style={styles.buttonText}>Ver detalles</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        ) : (
          <View style={styles.fallback}>
            <Text style={styles.title} numberOfLines={2}>
              {item.title}
            </Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonOutline]}
              activeOpacity={0.85}
              onPress={() => onPressDetails(item)}
            >
              <Text style={styles.buttonText}>Ver detalles</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const keyExtractor = (item: Movie) => item.id.toString();

  if (movies.length === 0) {
    return null;
  }

  return (
    <View>
      <FlatList
        ref={listRef}
        data={movies}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        snapToInterval={HERO_WIDTH}
        decelerationRate="fast"
        getItemLayout={(_, index) => ({
          length: HERO_WIDTH,
          offset: HERO_WIDTH * index,
          index,
        })}
        onMomentumScrollEnd={handleMomentumEnd}
      />
      <View style={styles.dotsContainer}>
        {movies.map((movie, index) => (
          <View
            key={movie.id}
            style={[styles.dot, index === currentIndex ? styles.dotActive : null]}
          />
        ))}
      </View>
    </View>
  );
};
