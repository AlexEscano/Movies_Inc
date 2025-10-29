import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ColorTheme, spacing, typography, useThemedStyles } from '../theme';

type Props = {
  message: string;
};

const createStyles = (colors: ColorTheme) =>
  StyleSheet.create({
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

export const ErrorState: React.FC<Props> = ({ message }) => {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ups...</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};
