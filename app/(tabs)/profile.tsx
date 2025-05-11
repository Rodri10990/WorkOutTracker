// app/(tabs)/profile.tsx
import React, { useState, useEffect } from 'react'; // Asumo que useEffect ya está si lo usas para loadPersonalInfo
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity, // Asegúrate de que Button o TouchableOpacity esté si usas uno para guardar
  Platform, 
  TextInput,
  Alert 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../../constants/Colors';

// Tu PERSONAL_INFO_KEY y Colors se mantienen igual
const PERSONAL_INFO_KEY = '@MyApp:personalInfo';

export default function ProfileScreen() {
  // const colorScheme = useColorScheme();
  const colorScheme = 'light'; // Asumiendo 'light' como antes

  const [antesImageUri, setAntesImageUri] = useState<string | null>(null);
  const [despuesImageUri, setDespuesImageUri] = useState<string | null>(null);
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');

  // Usaremos useEffect para cargar los datos al montar el componente
  useEffect(() => {
    const loadPersonalInfo = async () => {
      try {
        const storedInfo = await AsyncStorage.getItem(PERSONAL_INFO_KEY);
        if (storedInfo !== null) {
          const info = JSON.parse(storedInfo);
          setName(info.name || '');
          setAge(info.age || '');
          setHeight(info.height || '');
          setWeight(info.weight || '');
          // --- AÑADIR ESTAS LÍNEAS PARA CARGAR LAS URIs DE LAS IMÁGENES ---
          setAntesImageUri(info.antesImageUri || null); 
          setDespuesImageUri(info.despuesImageUri || null);
          // --- FIN DE LÍNEAS AÑADIDAS ---
        }
      } catch (error) {
        console.error('Error cargando datos personales desde AsyncStorage:', error);
        Alert.alert('Error', 'No se pudieron cargar tus datos personales.');
      }
    };

    loadPersonalInfo();
    
    // Permisos de imagen (como lo tenías antes)
    (async () => {
      if (Platform.OS !== 'web') {
        const libraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (libraryStatus.status !== 'granted') {
          // Opcional: Alertar si los permisos no son concedidos
          // Alert.alert('Permisos necesarios', 'Se necesitan permisos para acceder a la galería.');
        }
      }
    })();
  }, []); // Se ejecuta solo una vez al montar el componente

  const savePersonalInfo = async () => {
    // La condición para mostrar alerta si no hay datos puede incluir las imágenes si lo deseas,
    // o simplemente guardar null si no hay imagen. Por ahora, solo valida los campos de texto.
    if (!name && !age && !height && !weight && !antesImageUri && !despuesImageUri) {
        Alert.alert('Atención', 'Por favor, ingresa al menos un dato o selecciona una imagen para guardar.');
        return;
    }
    try {
      const personalInfo = {
        name: name,
        age: age,
        height: height,
        weight: weight,
        // --- AÑADIR ESTAS LÍNEAS PARA INCLUIR LAS URIs DE LAS IMÁGENES AL GUARDAR ---
        antesImageUri: antesImageUri,
        despuesImageUri: despuesImageUri,
        // --- FIN DE LÍNEAS AÑADIDAS ---
      };
      await AsyncStorage.setItem(PERSONAL_INFO_KEY, JSON.stringify(personalInfo));
      Alert.alert('¡Guardado!', 'Tus datos personales e imágenes de progreso se han guardado.');
    } catch (error) {
      console.error('Error guardando datos personales en AsyncStorage:', error);
      Alert.alert('Error', 'No se pudieron guardar tus datos personales.');
    }
  };

  const pickImageAsync = async (setImageUri: React.Dispatch<React.SetStateAction<string | null>>) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3], // O el aspect ratio que prefieras
      quality: 0.8,    // Calidad de la imagen
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
      // Nota: La imagen solo se actualiza en el estado aquí. 
      // Se guardará en AsyncStorage cuando el usuario presione "Guardar Datos".
    }
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={[styles.mainTitle, { color: Colors[colorScheme].text }]}>Mi Progreso</Text>

      {/* Encabezado Dividido con Imágenes (tu JSX se mantiene igual) */}
      <View style={styles.header}>
        <View style={styles.headerSection}>
          <Text style={[styles.headerTitle, { color: Colors[colorScheme].text }]}>Antes</Text>
          <TouchableOpacity onPress={() => pickImageAsync(setAntesImageUri)} style={styles.imageContainer}>
             {antesImageUri ? (
              <Image source={{ uri: antesImageUri }} style={styles.image} />
            ) : (
              <View style={[styles.imagePlaceholder, { backgroundColor: Colors[colorScheme].placeholderContainer || '#e0e0e0' }]}>
                <Text style={{ color: Colors[colorScheme].placeholderText || Colors[colorScheme].text }}>Toca para seleccionar</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.headerSection}>
          <Text style={[styles.headerTitle, { color: Colors[colorScheme].text }]}>Después</Text>
          <TouchableOpacity onPress={() => pickImageAsync(setDespuesImageUri)} style={styles.imageContainer}>
             {despuesImageUri ? (
              <Image source={{ uri: despuesImageUri }} style={styles.image} />
            ) : (
              <View style={[styles.imagePlaceholder, { backgroundColor: Colors[colorScheme].placeholderContainer || '#e0e0e0' }]}>
                <Text style={{ color: Colors[colorScheme].placeholderText || Colors[colorScheme].text }}>Toca para seleccionar</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Sección para Datos Personales (tu JSX para Nombre, Edad, Altura, Peso y el botón Guardar se mantienen igual) */}
      <View style={styles.dataSection}>
        <Text style={[styles.sectionTitle, { color: Colors[colorScheme].text }]}>Mis Datos Personales</Text>
        
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: Colors[colorScheme].text }]}>Nombre:</Text>
          <TextInput
            style={[styles.input, { color: Colors[colorScheme].inputText, borderColor: Colors[colorScheme].inputBorder, backgroundColor: Colors[colorScheme].background }]}
            value={name}
            onChangeText={setName}
            placeholder="Tu nombre"
            placeholderTextColor={Colors[colorScheme].placeholder}
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: Colors[colorScheme].text }]}>Edad:</Text>
          <TextInput
            style={[styles.input, { color: Colors[colorScheme].inputText, borderColor: Colors[colorScheme].inputBorder, backgroundColor: Colors[colorScheme].background }]}
            value={age}
            onChangeText={setAge}
            placeholder="Ej: 25"
            keyboardType="numeric"
            placeholderTextColor={Colors[colorScheme].placeholder}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: Colors[colorScheme].text }]}>Altura (cm):</Text>
          <TextInput
            style={[styles.input, { color: Colors[colorScheme].inputText, borderColor: Colors[colorScheme].inputBorder, backgroundColor: Colors[colorScheme].background }]}
            value={height}
            onChangeText={setHeight}
            placeholder="Ej: 175"
            keyboardType="numeric"
            placeholderTextColor={Colors[colorScheme].placeholder}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: Colors[colorScheme].text }]}>Peso (kg):</Text>
          <TextInput
            style={[styles.input, { color: Colors[colorScheme].inputText, borderColor: Colors[colorScheme].inputBorder, backgroundColor: Colors[colorScheme].background }]}
            value={weight}
            onChangeText={setWeight}
            placeholder="Ej: 70.5"
            keyboardType="decimal-pad" // Cambiado a decimal-pad para facilitar comas/puntos
            placeholderTextColor={Colors[colorScheme].placeholder}
          />
        </View>

        <TouchableOpacity 
            style={[styles.saveButton, { backgroundColor: Colors[colorScheme].buttonBackground }]} 
            onPress={savePersonalInfo}
        >
            <Text style={[styles.saveButtonText, { color: Colors[colorScheme].buttonText }]}>Guardar Datos</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// Tus estilos (styles) se mantienen igual
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20, // Moví el padding aquí para que no afecte al ScrollView en sí
    paddingTop: 20,        // y el KeyboardAvoidingView lo maneje mejor.
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  headerSection: {
    alignItems: 'center',
    width: '45%',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  imageContainer: {
    width: 150, // Puedes ajustar esto
    height: 200, // Puedes ajustar esto
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc', // Un color de borde genérico
    overflow: 'hidden', // Para asegurar que la imagen se contenga bien
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8, // Para que coincida con imageContainer
  },
  dataSection: {
    marginBottom: 20,
    // paddingHorizontal: 10, // Quitado, ya que el container tiene paddingHorizontal
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8, // Ajuste para padding vertical en Android
    fontSize: 16,
  },
  saveButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});