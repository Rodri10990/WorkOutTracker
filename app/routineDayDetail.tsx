// app/routineDayDetail.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  ActivityIndicator,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert 
} from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { workoutPlanData } from '../data/workoutData'; // Verifica esta ruta

// --- Interfaces (sin cambios) ---
interface LoggedSet {
  weight: string;
  reps: string;
}
interface LoggedExercisesData {
  [exerciseId: string]: LoggedSet[];
}

// --- Función getNumberOfSets (sin cambios) ---
const getNumberOfSets = (seriesString: string): number => {
  if (!seriesString) return 1;
  const lowerSeriesString = seriesString.toLowerCase();
  if (lowerSeriesString.includes('amrap') || lowerSeriesString.includes('fallo')) return 1;
  const parts = seriesString.split('-');
  if (parts.length > 1) {
    const num = parseInt(parts[parts.length - 1].trim(), 10);
    return isNaN(num) ? 1 : Math.max(1, num);
  }
  const num = parseInt(parts[0].trim(), 10);
  return isNaN(num) ? 1 : Math.max(1, num);
};

// --- FUNCIÓN HELPER PARA CREAR DATOS INICIALES DE LOGS (LA USAREMOS VARIAS VECES) ---
const createInitialLogDataForDay = (currentDayData: any): LoggedExercisesData => {
  const initialData: LoggedExercisesData = {};
  if (currentDayData && currentDayData.exercises) {
    currentDayData.exercises.forEach((exercise: any) => {
      const numSets = getNumberOfSets(exercise.series);
      initialData[exercise.id] = Array(numSets).fill(null).map(() => ({ weight: '', reps: '' }));
    });
  }
  return initialData;
};


export default function RoutineDayDetailScreen() {
  const { dayId } = useLocalSearchParams<{ dayId?: string }>(); 
  
  const [dayData, setDayData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loggedExercises, setLoggedExercises] = useState<LoggedExercisesData>({});

  const LOG_KEY = dayId ? `@MyApp:loggedSets:${dayId}` : null;

  useEffect(() => {
    const loadDataAndLogsForDay = async () => {
      setIsLoading(true);
      setLoggedExercises({}); 

      if (dayId) {
        const foundDay = workoutPlanData.days.find(d => d.id === dayId);
        setDayData(foundDay);

        if (foundDay) {
          const initialData = createInitialLogDataForDay(foundDay);
          let dataToDisplay = initialData;

          if (LOG_KEY) {
            try {
              const savedLogsString = await AsyncStorage.getItem(LOG_KEY);
              if (savedLogsString) {
                const savedLogsFromFile = JSON.parse(savedLogsString) as LoggedExercisesData;
                const mergedData = { ...initialData };
                Object.keys(savedLogsFromFile).forEach(exerciseId => {
                  if (mergedData[exerciseId] && 
                      savedLogsFromFile[exerciseId] && 
                      savedLogsFromFile[exerciseId].length === mergedData[exerciseId].length) {
                    mergedData[exerciseId] = savedLogsFromFile[exerciseId];
                  }
                });
                dataToDisplay = mergedData;
              }
            } catch (e) {
              console.error("Fallo al cargar sets guardados desde AsyncStorage", e);
              Alert.alert("Error", "No se pudo cargar el progreso guardado para este día.");
            }
          }
          setLoggedExercises(dataToDisplay);
        }
      } else {
        setDayData(null);
      }
      setIsLoading(false);
    };

    loadDataAndLogsForDay();
  }, [dayId, LOG_KEY]); 

  const handleSetInputChange = useCallback((exerciseId: string, setIndex: number, field: 'weight' | 'reps', value: string) => {
    setLoggedExercises(prev => {
      const updatedExerciseSets = [...(prev[exerciseId] || [])];
      if (updatedExerciseSets[setIndex]) {
        updatedExerciseSets[setIndex] = { ...updatedExerciseSets[setIndex], [field]: value };
      }
      return { ...prev, [exerciseId]: updatedExerciseSets };
    });
  }, []);

  const saveLoggedDayData = async () => {
    if (!LOG_KEY) {
      Alert.alert("Error", "No hay un día seleccionado para guardar.");
      return;
    }
    try {
      await AsyncStorage.setItem(LOG_KEY, JSON.stringify(loggedExercises));
      Alert.alert("¡Guardado!", "El progreso de tu entrenamiento ha sido guardado localmente.");
    } catch (e) {
      console.error("Fallo al guardar sets en AsyncStorage", e);
      Alert.alert("Error", "No se pudo guardar tu progreso.");
    }
  };

  // --- NUEVAS FUNCIONES DE BORRADO ---

  // Borrar una serie individual
  const handleDeleteSetProgress = async (exerciseId: string, setIndex: number) => {
    const newLoggedExercises = { ...loggedExercises };
    if (newLoggedExercises[exerciseId] && newLoggedExercises[exerciseId][setIndex]) {
      newLoggedExercises[exerciseId] = [...newLoggedExercises[exerciseId]]; // Clonar array de series
      newLoggedExercises[exerciseId][setIndex] = { weight: '', reps: '' }; // Limpiar la serie
      setLoggedExercises(newLoggedExercises);
      if (LOG_KEY) {
        try {
          await AsyncStorage.setItem(LOG_KEY, JSON.stringify(newLoggedExercises));
          // Opcional: Alert.alert("Serie borrada", "La serie ha sido limpiada.");
        } catch (e) {
          console.error("Error guardando tras borrar serie:", e);
          Alert.alert("Error", "No se pudo actualizar el progreso tras borrar la serie.");
        }
      }
    }
  };

  // Borrar todo el progreso de un ejercicio específico
  const handleDeleteExerciseProgress = (exerciseId: string) => {
    Alert.alert(
      "Confirmar Borrado",
      `¿Estás seguro de que quieres borrar todos los datos registrados para este ejercicio (${dayData?.exercises.find((ex:any) => ex.id === exerciseId)?.name || ''})?`,
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Borrar", 
          style: "destructive",
          onPress: async () => {
            const numSets = getNumberOfSets(dayData?.exercises.find((ex:any) => ex.id === exerciseId)?.series || '');
            const emptyExerciseData = Array(numSets).fill(null).map(() => ({ weight: '', reps: '' }));
            
            const newLoggedExercises = { 
              ...loggedExercises,
              [exerciseId]: emptyExerciseData
            };
            setLoggedExercises(newLoggedExercises);
            if (LOG_KEY) {
              try {
                await AsyncStorage.setItem(LOG_KEY, JSON.stringify(newLoggedExercises));
                Alert.alert("Ejercicio Borrado", "Todos los datos de este ejercicio han sido borrados.");
              } catch (e) {
                console.error("Error guardando tras borrar ejercicio:", e);
                Alert.alert("Error", "No se pudo actualizar el progreso tras borrar el ejercicio.");
              }
            }
          }
        }
      ]
    );
  };

  // Borrar todo el progreso del día
  const handleDeleteDayProgress = () => {
    Alert.alert(
      "Confirmar Borrado Total",
      "¿Estás seguro de que quieres borrar TODO el progreso registrado para este día? Esta acción no se puede deshacer.",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Borrar Todo", 
          style: "destructive",
          onPress: async () => {
            const initialData = createInitialLogDataForDay(dayData);
            setLoggedExercises(initialData);
            if (LOG_KEY) {
              try {
                // Podrías usar removeItem o guardar un estado vacío. Guardar estado vacío es más consistente con la carga.
                await AsyncStorage.setItem(LOG_KEY, JSON.stringify(initialData)); 
                Alert.alert("Progreso Borrado", "Todo el progreso de este día ha sido borrado.");
              } catch (e) {
                console.error("Error borrando el progreso del día:", e);
                Alert.alert("Error", "No se pudo borrar el progreso del día.");
              }
            }
          }
        }
      ]
    );
  };

  if (isLoading) { /* ... (como antes) ... */ 
    return <View style={styles.centered}><ActivityIndicator size="large" color="#007AFF" /></View>;
  }
  if (!dayData) { /* ... (como antes) ... */ 
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: "Error", headerShown: true, headerBackVisible: false }} />
        <Text style={styles.errorText}>Día no encontrado o ID no proporcionado.</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: styles.container.backgroundColor || '#fff' }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0} 
    >
      <ScrollView 
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 40, paddingTop: 16 }}
        keyboardShouldPersistTaps="handled"
      >
        <Stack.Screen options={{ title: dayData.name, headerShown: true }} /> 
        <Text style={styles.dayTitle}>{dayData.name}</Text>
        
        {dayData.exercises.map((exercise: any) => {
          const numSets = getNumberOfSets(exercise.series);
          const currentExerciseLoggedSets = loggedExercises[exercise.id] || createInitialLogDataForDay({ exercises: [exercise] })[exercise.id];

          return (
            <View key={exercise.id} style={styles.exerciseContainer}>
              {/* --- BOTÓN PARA BORRAR PROGRESO DEL EJERCICIO --- */}
              <TouchableOpacity 
                style={styles.deleteExerciseButton} 
                onPress={() => handleDeleteExerciseProgress(exercise.id)}
              >
                <Text style={styles.deleteButtonTextSmall}>🗑️ Borrar Ejercicio</Text>
              </TouchableOpacity>

              {exercise.imageUrl && ( /* ... (imagen como antes) ... */
                <Image source={{ uri: exercise.imageUrl }} style={styles.exerciseImage} resizeMode="contain" />
              )}
              <Text style={styles.exerciseName}>{exercise.name}</Text>
              <Text style={styles.exerciseDetail}>Objetivo: {exercise.series} series, {exercise.repetitions} reps, {exercise.rest} descanso</Text>
              
              <View style={styles.setsInputContainer}>
                <View style={styles.setRow}>
                  <Text style={[styles.setHeaderLabel, styles.columnHeaderSet]}>Serie</Text>
                  <Text style={[styles.setHeaderLabel, styles.columnHeaderData]}>Peso (kg)</Text>
                  <Text style={[styles.setHeaderLabel, styles.columnHeaderData, { flexGrow: 1.2 }]}>Reps</Text> {/* Ajustado un poco el flexGrow para el botón */}
                  <View style={styles.actionHeaderPlaceholder} />{/* Espacio para botón de borrar serie */}
                </View>
                {Array.from({ length: numSets }).map((_, setIndex) => (
                  <View key={setIndex} style={styles.setRow}>
                    <Text style={[styles.setNumberLabel, styles.columnSet]}>{setIndex + 1}</Text>
                    <TextInput /* ... (peso como antes) ... */
                      style={[styles.setInput, styles.columnDataInput]}
                      value={currentExerciseLoggedSets[setIndex]?.weight || ''}
                      onChangeText={(text) => handleSetInputChange(exercise.id, setIndex, 'weight', text)}
                      placeholder="-" keyboardType="numeric" placeholderTextColor="#ccc"
                    />
                    <TextInput /* ... (reps como antes) ... */
                      style={[styles.setInput, styles.columnDataInput]}
                      value={currentExerciseLoggedSets[setIndex]?.reps || ''}
                      onChangeText={(text) => handleSetInputChange(exercise.id, setIndex, 'reps', text)}
                      placeholder="-" keyboardType="numeric" placeholderTextColor="#ccc"
                    />
                    {/* --- BOTÓN PARA BORRAR SERIE INDIVIDUAL --- */}
                    <TouchableOpacity 
                        style={styles.deleteSetButton} 
                        onPress={() => handleDeleteSetProgress(exercise.id, setIndex)}
                    >
                        <Text style={styles.deleteButtonTextSmall}>❌</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          );
        })}

        <TouchableOpacity style={styles.saveProgressButton} onPress={saveLoggedDayData}>
          <Text style={styles.saveProgressButtonText}>Guardar Progreso del Día</Text>
        </TouchableOpacity>

        {/* --- NUEVO BOTÓN PARA BORRAR PROGRESO DEL DÍA --- */}
        <TouchableOpacity style={styles.deleteDayButton} onPress={handleDeleteDayProgress}>
          <Text style={styles.deleteDayButtonText}>Borrar Progreso del Día</Text>
        </TouchableOpacity>

        {/* ... (Secciones de notas como antes) ... */}
        <View style={styles.notesSection}>
          <Text style={styles.sectionTitle}>Consideraciones Generales</Text>
          <Text style={styles.subSectionTitle}>Calentamiento:</Text>
          <Text style={styles.notesText}>{workoutPlanData.generalConsiderations.warmUp}</Text>
          {/* ... más consideraciones ... */}
          <Text style={styles.subSectionTitle}>Registro:</Text>
          <Text style={styles.notesText}>{workoutPlanData.generalConsiderations.registro}</Text>
        </View>
        <View style={styles.notesSection}>
          <Text style={styles.sectionTitle}>Notas Adicionales</Text>
          <Text style={styles.subSectionTitle}>Banco Ajustable:</Text>
          <Text style={styles.notesText}>{workoutPlanData.additionalNotesText.bancoAjustable}</Text>
          {/* ... más notas ... */}
          <Text style={styles.subSectionTitle}>Si solo puedes 2 días:</Text>
          <Text style={styles.notesText}>{workoutPlanData.additionalNotesText.dosDias}</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  // ... (todos tus estilos anteriores se mantienen)
  container: { flex: 1, backgroundColor: '#fff', },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', },
  errorText: { fontSize: 18, color: 'red', textAlign: 'center', marginTop: 20, },
  dayTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#333', paddingHorizontal: 16, },
  exerciseContainer: { marginBottom: 25, padding: 15, backgroundColor: '#f9f9f9', borderRadius: 10, borderWidth: 1, borderColor: '#e8e8e8', marginHorizontal: 16, position: 'relative', }, // position: 'relative' para el botón de borrar ejercicio
  exerciseImage: { width: '100%', height: 200, borderRadius: 6, marginBottom: 12, backgroundColor: '#e0e0e0', },
  exerciseName: { fontSize: 19, fontWeight: 'bold', marginBottom: 8, color: '#333', },
  exerciseDetail: { fontSize: 15, color: '#555', marginBottom: 15, lineHeight: 22, },
  setsInputContainer: { marginTop: 10, paddingHorizontal: 5, },
  setRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, },
  setHeaderLabel: { fontSize: 14, fontWeight: '600', color: '#444', textAlign: 'center',},
  columnHeaderSet: { width: '20%', },
  columnHeaderData: { width: '35%', }, // Ajustado para dar espacio al botón de borrar serie
  actionHeaderPlaceholder: { width: '10%', }, // Espacio para el encabezado de la columna de acción de serie
  setNumberLabel: { fontSize: 16, fontWeight: '500', color: '#333', textAlign: 'center', },
  columnSet: { width: '20%', justifyContent: 'center', alignItems: 'center', },
  setInput: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 10, fontSize: 15, textAlign: 'center', backgroundColor: '#fff', },
  columnDataInput: { width: '35%', marginHorizontal: '1%', }, // Ajustado
  notesSection: { marginTop: 25, marginBottom: 10, padding: 15, backgroundColor: '#fdfdfd', borderRadius: 8, borderWidth: 1, borderColor: '#eaf2ff', marginHorizontal: 16, },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#0056b3', marginBottom: 12, borderBottomWidth: 1, borderBottomColor: '#cce0ff', paddingBottom: 6, },
  subSectionTitle: { fontSize: 17, fontWeight: '600', color: '#333', marginTop: 10, marginBottom: 4, },
  notesText: { fontSize: 16, lineHeight: 23, color: '#444', marginBottom: 12, },
  saveProgressButton: { backgroundColor: '#28a745', paddingVertical: 15, paddingHorizontal: 20, borderRadius: 8, alignItems: 'center', marginHorizontal: 16, marginTop: 20, marginBottom: 10, },
  saveProgressButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold', },

  // --- NUEVOS ESTILOS PARA BOTONES DE BORRADO ---
  deleteDayButton: {
    backgroundColor: '#dc3545', // Rojo para borrar
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 20,
  },
  deleteDayButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteExerciseButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
    // backgroundColor: 'rgba(255,0,0,0.1)', // Opcional: un fondo sutil
    borderRadius: 5,
  },
  deleteSetButton: {
    padding: 8,
    marginLeft: 5, // Espacio después del input de reps
    justifyContent: 'center',
    alignItems: 'center',
    width: '10%', // Ancho para el botón de borrar serie
  },
  deleteButtonTextSmall: {
    fontSize: Platform.OS === 'ios' ? 16 : 14, // Ajusta el tamaño del emoji/texto
    color: '#dc3545', // Rojo
  },
})