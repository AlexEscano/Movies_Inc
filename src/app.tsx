import 'react-native-gesture-handler';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { AppNavigator } from './presentation/navigation/AppNavigator';
import { LoadingIndicator } from './presentation/components/LoadingIndicator';
import { colors } from './presentation/theme';
import { FavoritesProvider } from './presentation/state/FavoritesContext';

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.background }}>
        <LoadingIndicator />
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <FavoritesProvider>
          <AppNavigator />
        </FavoritesProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
