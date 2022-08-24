import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from 'react-native-paper';
import AppLoading from 'expo-app-loading';
import { useFonts, Domine_400Regular, Domine_500Medium, Domine_700Bold } from '@expo-google-fonts/domine';

import AppRoutes from './src/routes/stack.routes';
import colors from './src/styles/colors';

export default function App() {
  let [fontsLoaded] = useFonts({
    Domine_400Regular, 
    Domine_500Medium, 
    Domine_700Bold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider>
       <StatusBar style="light" backgroundColor={colors.blue99} />
      <AppRoutes />
    </Provider>
  );
}
