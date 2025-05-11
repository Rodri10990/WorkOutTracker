// app/(tabs)/routine.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router'; // Asegúrate de tener esta importación
import { workoutPlanData } from '../../data/workoutData'; // Verifica que esta ruta sea correcta

// Ya NO necesitas las siguientes importaciones aquí (si las tenías para useNavigation):
// import { useNavigation } from '@react-navigation/native';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { RootStackParamList } from '../../types/navigation'; // A menos que uses RootStackParamList para otra cosa

export default function RoutineScreen() {
  // Ya NO necesitas llamar a useNavigation() aquí

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.mainTitle}>Mis Rutinas</Text>
      <Text style={styles.subtitle}>Selecciona un día para ver el detalle:</Text>
      
      {workoutPlanData.days.map((day) => (
        <TouchableOpacity 
          key={day.id} 
          style={styles.daySelectorButton}
          // --- ASEGÚRATE DE QUE EL onPress SE VEA ASÍ ---
          onPress={() => router.push({ pathname: "/routineDayDetail", params: { dayId: day.id } })}
        >
          <Text style={styles.daySelectorButtonText}>{day.name}</Text>
        </TouchableOpacity>
      ))}
      
    </ScrollView>
  );
}

// Tus estilos (styles) se mantienen igual que la última vez que los ajustamos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    color: '#555',
  },
  daySelectorButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  daySelectorButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});