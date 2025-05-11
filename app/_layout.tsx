// app/_layout.tsx
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        
        {/* --- AÑADE ESTA LÍNEA EXACTAMENTE ASÍ --- */}
        <Stack.Screen 
          name="routineDayDetail" 
          // Las opciones específicas como el título y headerShown: true
          // se tomarán de lo que tienes configurado DENTRO de routineDayDetail.tsx.
          // Opcionalmente, podrías definir opciones por defecto aquí si quisieras,
          // por ejemplo: options={{ title: 'Detalle Rutina', headerBackTitleVisible: false }}
        />
        {/* --- FIN DE LÍNEA AÑADIDA --- */}

        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}