import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { colors } from '../theme';

export const LoadingIndicator: React.FC = () => (
  <View style={styles.container}>
    <ActivityIndicator color={colors.accent} size="large" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
