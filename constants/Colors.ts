// En tu archivo constants/Colors.ts

const tintColorLight = '#007AFF'; // Tu color de acento para el tema claro
const tintColorDark = '#0A84FF';  // Tu color de acento para el tema oscuro

export const Colors = {
  light: {
    text: '#11181C',              // Color de texto principal
    background: '#fff',           // Color de fondo principal
    tint: tintColorLight,         // Color de acento
    placeholder: '#ccc',          // Color para texto de placeholder en inputs
    inputBorder: '#ddd',          // Color del borde de los inputs
    inputText: '#000',            // Color del texto dentro de los inputs
    buttonBackground: tintColorLight, // Color de fondo para botones principales
    buttonText: '#fff',           // Color del texto para botones principales
    // ---- Propiedades que podrías necesitar añadir ----
    placeholderContainer: '#e0e0e0', // Fondo para el placeholder de imagen
    placeholderText: '#666',        // Texto para el placeholder de imagen
    // ... añade cualquier otra que uses ...
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',        // Un fondo oscuro común
    tint: tintColorDark,
    placeholder: '#555',
    inputBorder: '#444',
    inputText: '#fff',
    buttonBackground: tintColorDark,
    buttonText: '#000', // O blanco, según el contraste con tintColorDark
    // ---- Propiedades que podrías necesitar añadir ----
    placeholderContainer: '#333', // Fondo oscuro para placeholder de imagen
    placeholderText: '#aaa',       // Texto claro para placeholder de imagen en modo oscuro
    // ... añade cualquier otra que uses ...
  },
}