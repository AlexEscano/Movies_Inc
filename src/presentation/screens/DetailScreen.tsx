import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import env from "../../core/config/env";
import { ErrorState } from "../components/ErrorState";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { useMovieDetailViewModel } from "../hooks/useMovieDetailViewModel";
import { RootStackParamList } from "../navigation/types";
import { colors, spacing, typography } from "../theme";

type Props = NativeStackScreenProps<RootStackParamList, "Detail">;

export const DetailScreen: React.FC<Props> = ({ route }) => {
  const { movieId } = route.params;
  const { data, credits, loading, error } = useMovieDetailViewModel(movieId);

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <StatusBar barStyle="light-content" />
        <LoadingIndicator />
      </View>
    );
  }

  if (error || !data) {
    return (
      <View style={[styles.container, styles.centered]}>
        <StatusBar barStyle="light-content" />
        <ErrorState
          message={error ?? "No se encontro la informacion de la pelicula."}
        />
      </View>
    );
  }

  const backdropSource = data.backdropPath
    ? { uri: `${env.imageBaseUrl}${data.backdropPath}` }
    : undefined;

  const Header = backdropSource ? (
    <ImageBackground
      source={backdropSource}
      style={styles.backdrop}
      imageStyle={styles.backdropImage}
    >
      <View style={styles.backdropOverlay} />
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{data.title}</Text>
        {data.tagline ? (
          <Text style={styles.tagline}>{data.tagline}</Text>
        ) : null}
      </View>
    </ImageBackground>
  ) : (
    <View style={[styles.backdrop, styles.backdropFallback]}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{data.title}</Text>
        {data.tagline ? (
          <Text style={styles.tagline}>{data.tagline}</Text>
        ) : null}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <StatusBar barStyle="light-content" />

      {Header}

      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Sinopsis</Text>
        <Text style={styles.body}>{data.overview}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Detalles</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Duracion</Text>
          <Text style={styles.detailValue}>
            {data.runtime ? `${data.runtime} min` : "N/A"}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Estatus</Text>
          <Text style={styles.detailValue}>{data.status}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Calificacion</Text>
          <Text style={[styles.detailValue, styles.rating]}>
            {data.voteAverage.toFixed(1)}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Generos</Text>
        <View style={styles.genreContainer}>
          {data.genres.map((genre) => (
            <View key={genre.id} style={styles.genreChip}>
              <Text style={styles.genreText}>{genre.name}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Reparto principal</Text>
        {credits.length === 0 ? (
          <Text style={styles.body}>No hay informacion del reparto.</Text>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.creditsList}
          >
            {credits.slice(0, 15).map((actor) => (
              <View key={actor.id} style={styles.creditCard}>
                {actor.profilePath ? (
                  <Image
                    source={{ uri: `${env.imageBaseUrl}${actor.profilePath}` }}
                    style={styles.creditImage}
                  />
                ) : (
                  <View style={[styles.creditImage, styles.creditImageFallback]}>
                    <Text style={styles.creditFallbackInitial}>
                      {actor.name.slice(0, 1).toUpperCase()}
                    </Text>
                  </View>
                )}
                <Text style={styles.creditName} numberOfLines={1}>
                  {actor.name}
                </Text>
                <Text style={styles.creditCharacter} numberOfLines={1}>
                  {actor.character || "Sin rol"}
                </Text>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centered: {
    justifyContent: "center",
  },
  content: {
    paddingBottom: spacing.xl,
  },
  backdrop: {
    height: 320,
    justifyContent: "flex-end",
  },
  backdropImage: {
    opacity: 0.7,
  },
  backdropOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(13, 13, 13, 0.6)",
  },
  backdropFallback: {
    backgroundColor: colors.surface,
  },
  titleWrapper: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  title: {
    color: colors.textPrimary,
    fontFamily: typography.fontBold,
    fontSize: 28,
  },
  tagline: {
    color: colors.textSecondary,
    fontFamily: typography.fontMedium,
    fontSize: 16,
    marginTop: spacing.sm,
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xl,
  },
  sectionHeading: {
    color: colors.textPrimary,
    fontFamily: typography.fontSemiBold,
    fontSize: 20,
    marginBottom: spacing.md,
  },
  body: {
    color: colors.textSecondary,
    fontFamily: typography.fontRegular,
    fontSize: 15,
    lineHeight: 22,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },
  detailLabel: {
    color: colors.textSecondary,
    fontFamily: typography.fontMedium,
    fontSize: 14,
  },
  detailValue: {
    color: colors.textPrimary,
    fontFamily: typography.fontSemiBold,
    fontSize: 14,
  },
  rating: {
    color: colors.accent,
  },
  genreContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  genreChip: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: 999,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  genreText: {
    color: colors.textPrimary,
    fontFamily: typography.fontRegular,
    fontSize: 13,
  },
  creditsList: {
    paddingRight: spacing.lg,
  },
  creditCard: {
    width: 120,
    marginRight: spacing.md,
  },
  creditImage: {
    width: 120,
    height: 160,
    borderRadius: 16,
    backgroundColor: colors.surface,
    marginBottom: spacing.sm,
  },
  creditImageFallback: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  creditFallbackInitial: {
    color: colors.textSecondary,
    fontFamily: typography.fontSemiBold,
    fontSize: 24,
  },
  creditName: {
    color: colors.textPrimary,
    fontFamily: typography.fontMedium,
    fontSize: 14,
  },
  creditCharacter: {
    color: colors.textSecondary,
    fontFamily: typography.fontRegular,
    fontSize: 12,
  },
});
