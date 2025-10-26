import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../theme';

type Props = {
  message: string;
};

export const ErrorState: React.FC<Props> = ({ message }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Ups...</Text>
    <Text style={styles.message}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl,
  },
  title: {
    color: colors.accent,
    fontFamily: typography.fontSemiBold,
    fontSize: 18,
    marginBottom: spacing.sm,
  },
  message: {
    color: colors.textSecondary,
    fontFamily: typography.fontRegular,
    fontSize: 14,
    textAlign: 'center',
  },
});
