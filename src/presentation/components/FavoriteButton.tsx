import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '../theme';

type Props = {
  isFavorite: boolean;
  onPress: () => void;
  compact?: boolean;
};

export const FavoriteButton: React.FC<Props> = ({ isFavorite, onPress, compact = false }) => {
  const label = compact ? 'Fav' : isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos';

  return (
    <TouchableOpacity
      accessibilityRole="button"
      onPress={onPress}
      activeOpacity={0.9}
      style={[
        styles.base,
        compact ? styles.compact : styles.regular,
        isFavorite ? styles.active : styles.inactive,
      ]}
    >
      <Text style={[styles.text, compact ? styles.textCompact : null, isFavorite ? styles.textActive : null]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  regular: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  compact: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  inactive: {
    backgroundColor: 'transparent',
  },
  active: {
    backgroundColor: colors.accent,
  },
  text: {
    color: colors.accent,
    fontFamily: typography.fontSemiBold,
    fontSize: 14,
  },
  textCompact: {
    fontSize: 12,
  },
  textActive: {
    color: colors.textPrimary,
  },
});
