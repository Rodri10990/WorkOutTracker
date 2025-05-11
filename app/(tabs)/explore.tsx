// app/(tabs)/explore.tsx (o el nombre de tu archivo para esta pestaña)
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

// Datos de ejemplo para diseñar la lista
const mockActivities = [
  {
    id: '1',
    type: 'Carrera',
    source: 'Nike Run Club', // Para la idea futura
    date: '08 de Mayo, 2025',
    metric: '5.2 km',
    icon: 'figure.run' // Ejemplo de nombre de ícono SF Symbol (si usas IconSymbol)
  },
  {
    id: '2',
    type: 'Ciclismo',
    source: 'Strava', // Para la idea futura
    date: '07 de Mayo, 2025',
    metric: '45 min - 15 km',
    icon: 'bicycle' // Ejemplo de nombre de ícono SF Symbol
  },
  {
    id: '3',
    type: 'Entrenamiento de Fuerza',
    source: 'App Propia', // Podría ser una entrada de tu pestaña Rutinas
    date: '06 de Mayo, 2025',
    metric: '60 min',
    icon: 'dumbbell.fill' // Ejemplo de nombre de ícono SF Symbol
  },
];

// Si estás usando tu componente IconSymbol, podrías importarlo aquí
// import { IconSymbol } from '../../components/ui/IconSymbol'; // Ajusta la ruta

export default function OtherActivitiesScreen() {
  // const colorScheme = useColorScheme(); // Si lo usas para colores
  // const colors = Colors[colorScheme ?? 'light'];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.mainTitle}>Otras Actividades</Text>

      <View style={styles.placeholderContainer}>
        <Text style={styles.placeholderText}>
          En el futuro quiero vincular la actividad que registro en otras apps como Nike Run Club.
        </Text>
      </View>

      <Text style={styles.listTitle}>Actividades Registradas (Diseño Ejemplo)</Text>

      {mockActivities.map((activity) => (
        <View key={activity.id} style={styles.activityItem}>
          <View style={styles.activityIconContainer}>
            {/* Si tienes IconSymbol y quieres usarlo:
              <IconSymbol name={activity.icon} size={24} color="#007AFF" /> 
              Si no, puedes omitir el ícono por ahora o usar un Text
            */}
            <Text style={styles.activityIconPlaceholder}>🏃</Text> 
          </View>
          <View style={styles.activityDetails}>
            <Text style={styles.activityType}>{activity.type} <Text style={styles.activitySource}>({activity.source})</Text></Text>
            <Text style={styles.activityMetric}>{activity.metric}</Text>
            <Text style={styles.activityDate}>{activity.date}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff', // o tu color de fondo del tema
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    // color: colors.text, // Si usas colorScheme
  },
  placeholderContainer: {
    backgroundColor: '#f0f0f0', // Un fondo suave para el mensaje
    padding: 15,
    borderRadius: 8,
    marginBottom: 25,
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 15,
    textAlign: 'center',
    color: '#555',
    lineHeight: 22,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    // color: colors.text, // Si usas colorScheme
  },
  activityItem: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 2,
  },
  activityIconContainer: {
    marginRight: 15,
    padding: 10,
    backgroundColor: '#e0e0e0', // Un fondo para el ícono
    borderRadius: 25, // Para hacerlo circular
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityIconPlaceholder: { // Si no usas IconSymbol, un emoji o texto como placeholder
    fontSize: 24,
  },
  activityDetails: {
    flex: 1, // Para que ocupe el espacio restante
  },
  activityType: {
    fontSize: 17,
    fontWeight: 'bold',
    // color: colors.text, // Si usas colorScheme
  },
  activitySource: {
    fontSize: 13,
    color: '#666',
  },
  activityMetric: {
    fontSize: 15,
    color: '#333',
    marginTop: 4,
  },
  activityDate: {
    fontSize: 13,
    color: '#888',
    marginTop: 4,
  },
});