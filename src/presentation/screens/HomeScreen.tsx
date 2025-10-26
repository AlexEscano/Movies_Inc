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

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { popular, topRated, upcoming, loading, error } = useHomeViewModel();

  const handlePressMovie = (id: number) => {
    navigation.navigate('Detail', { movieId: id });
  };

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
            <MovieCarousel
              title="Populares"
              data={popular}
              imageBaseUrl={env.imageBaseUrl}
              onPressItem={movie => handlePressMovie(movie.id)}
            />
            <MovieCarousel
              title="Mejor valoradas"
              data={topRated}
              imageBaseUrl={env.imageBaseUrl}
              onPressItem={movie => handlePressMovie(movie.id)}
            />
            <MovieCarousel
              title="Proximos estrenos"
              data={upcoming}
              imageBaseUrl={env.imageBaseUrl}
              onPressItem={movie => handlePressMovie(movie.id)}
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
  loadingWrapper: {
    paddingVertical: spacing.xl,
  },
});
