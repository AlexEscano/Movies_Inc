import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { useTheme, spacing, typography } from '../theme';

export const ThemeToggle: React.FC = () => {
  const { mode, toggleTheme, colors } = useTheme();
  const isDark = mode === 'dark';

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.textSecondary }]}>
        {isDark ? 'Modo oscuro' : 'Modo claro'}
      </Text>
      <Switch
        value={isDark}
        onValueChange={toggleTheme}
        thumbColor={isDark ? colors.accent : '#FFFFFF'}
        trackColor={{ false: colors.border, true: colors.accent }}
        ios_backgroundColor={colors.border}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontFamily: typography.fontMedium,
    fontSize: 14,
    marginRight: spacing.sm,
  },
});
