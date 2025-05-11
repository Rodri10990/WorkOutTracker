// app/(tabs)/index.tsx
import React, { useState, useCallback } from 'react'; // Cambiamos useEffect por useCallback
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  ImageBackground, 
  Platform 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router'; // Importamos useFocusEffect

const PERSONAL_INFO_KEY = '@MyApp:personalInfo'; 
const DEFAULT_USER_NAME = "Rodrigo"; 

const HEADER_BACKGROUND_IMAGE_URI = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80';

// --- Tus arrays motivationalQuotes y musicSuggestions se mantienen igual ---
const motivationalQuotes = [
  "El único entrenamiento malo es el que no tienes.",
  "La disciplina es el puente entre tus metas y tus logros.",
  // ... (más frases)
];
const musicSuggestions = [
  { title: "Energía Pura", suggestion: "Playlist 'Beast Mode' en Spotify" },
  { title: "Clásicos del Rock", suggestion: "AC/DC - Thunderstruck" },
  // ... (más sugerencias)
];

export default function HomeScreen() {
  const [currentUserName, setCurrentUserName] = useState<string>(DEFAULT_USER_NAME);

  const today = new Date();
  const dayOfMonth = today.getDate();
  const dailyQuote = motivationalQuotes[(dayOfMonth - 1) % motivationalQuotes.length];
  const dailyMusicSuggestion = musicSuggestions[(dayOfMonth - 1) % musicSuggestions.length];

  // --- USAMOS useFocusEffect EN LUGAR DE useEffect ---
  useFocusEffect(
    useCallback(() => {
      // La función loadUserName es la misma que tenías dentro de useEffect
      const loadUserName = async () => {
        try {
          const storedInfoString = await AsyncStorage.getItem(PERSONAL_INFO_KEY);
          if (storedInfoString) {
            const storedInfo = JSON.parse(storedInfoString);
            if (storedInfo && storedInfo.name && storedInfo.name.trim() !== '') {
              setCurrentUserName(storedInfo.name);
            } else {
              setCurrentUserName(DEFAULT_USER_NAME); 
            }
          } else {
            setCurrentUserName(DEFAULT_USER_NAME);
          }
        } catch (error) {
          console.error("Error cargando nombre desde AsyncStorage en Home:", error);
          setCurrentUserName(DEFAULT_USER_NAME); 
        }
      };

      loadUserName();

      // Opcional: Si necesitas una función de limpieza cuando la pantalla pierde el foco,
      // la retornas aquí. Para este caso simple de cargar datos, no es necesaria.
      // return () => console.log("Home screen perdió el foco");
    }, []) // El array de dependencias vacío para useCallback es importante aquí
          // para asegurar que la función loadUserName no se recree innecesariamente.
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContentContainer}>
      <ImageBackground 
        source={{ uri: HEADER_BACKGROUND_IMAGE_URI }}
        style={styles.header}
        imageStyle={styles.headerBackgroundImageStyle}
      >
        <View style={styles.headerOverlay}>
          <Text style={styles.greetingText}>
            Hola {currentUserName}, ¡Bienvenido de Nuevo! 💪🏻
          </Text>
        </View>
      </ImageBackground>

      <View style={styles.mainContent}>
        {/* ... (El resto de tu JSX para Frase, Música, Resumen del Día se mantiene igual) ... */}
        <View style={[styles.card, styles.quoteCard]}>
          <Text style={styles.cardTitle}>Frase del Día ✨</Text>
          <Text style={styles.quoteText}>"{dailyQuote}"</Text>
        </View>

        <View style={[styles.card, styles.musicCard]}>
          <Text style={styles.cardTitle}>Música para tu Entreno 🎧</Text>
          <Text style={styles.musicTitle}>{dailyMusicSuggestion.title}</Text>
          <Text style={styles.musicSuggestionText}>{dailyMusicSuggestion.suggestion}</Text>
        </View>
        
        <Text style={styles.sectionTitle}>Resumen del Día</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Próxima Rutina:</Text>
          <Text style={styles.cardText}>Día B - Enfoque Piernas (Mañana)</Text>
        </View>
      </View>
    </ScrollView>
  );
}

// --- Tus estilos (styles) se mantienen igual que antes ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f8',
  },
  scrollContentContainer: {
    paddingBottom: 20,
  },
  header: {
    height: 220,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerBackgroundImageStyle: {
    resizeMode: 'cover',
  },
  headerOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  greetingText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  mainContent: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
    marginTop: 10, 
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20, 
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 17, 
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8, 
  },
  cardText: {
    fontSize: 14,
    color: '#666',
  },
  quoteCard: {
    backgroundColor: '#e6f7ff', 
    borderColor: '#b3e0ff',
    borderWidth: 1,
  },
  quoteText: {
    fontSize: 15,
    fontStyle: 'italic',
    color: '#205070', 
    textAlign: 'center',
    lineHeight: 22,
  },
  musicCard: {
    backgroundColor: '#fff3e0', 
    borderColor: '#ffe0b3',
    borderWidth: 1,
  },
  musicTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#795548', 
    marginBottom: 4,
  },
  musicSuggestionText: {
    fontSize: 14,
    color: '#a1887f',
  }
});