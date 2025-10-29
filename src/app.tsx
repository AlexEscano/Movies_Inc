import 'react-native-gesture-handler';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { AppNavigator } from './presentation/navigation/AppNavigator';
import { LoadingIndicator } from './presentation/components/LoadingIndicator';
import { FavoritesProvider } from './presentation/state/FavoritesContext';
import { ThemeProvider, useTheme } from './presentation/theme';

const AppContent: React.FC = () => {
  const { colors } = useTheme();
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center' }}>
        <LoadingIndicator />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <FavoritesProvider>
        <View style={{ flex: 1, backgroundColor: colors.background }}>
          <AppNavigator />
        </View>
      </FavoritesProvider>
    </SafeAreaProvider>
  );
};

const App: React.FC = () => (
  <ThemeProvider>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppContent />
    </GestureHandlerRootView>
  </ThemeProvider>
);

export default App;
