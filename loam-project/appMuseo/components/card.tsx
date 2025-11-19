import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  useColorScheme, 
  Pressable,
  ImageSourcePropType
} from 'react-native';
import Colors from '../constants/Colors';
import { router } from 'expo-router'; // 1. Importamos el router

type MuseoCardProps = {
  id: string; // 2. Ahora el ID es obligatorio para saber a dónde ir
  title: string;
  category: string;
  imageUrl: ImageSourcePropType; 
  onPress?: () => void; // Opcional: por si quieres anular la navegación por defecto
};

const MuseoCard = ({ id, title, category, imageUrl, onPress }: MuseoCardProps) => {
  const colorScheme = useColorScheme();
  
  // Ajuste de colores seguro por si Colors.light.text no existe directo
  const themeText = colorScheme === 'light' ? Colors.dark.text : Colors.light.text;
  const cardBackground = colorScheme === 'light' ? Colors.dark.background : Colors.light.background;
  const shadowColor = colorScheme === 'light' ? '#000' : '#000';

  // 3. Función interna que decide qué hacer
  const handlePress = () => {
    if (onPress) {
      onPress(); // Si el padre mandó una acción, úsala
    } else {
      router.push(`/obra/${id}`); 
    }
  };

  return (
    <Pressable 
      onPress={handlePress} // Usamos nuestra función interna
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: cardBackground, shadowColor: shadowColor },
        pressed && styles.pressed 
      ]}
    >
      <Image 
        source={imageUrl} 
        style={styles.image} 
      />
      
      <View style={styles.content}>
        <Text style={[styles.category, { color: themeText }]}>
          {category.toUpperCase()}
        </Text>
        <Text style={[styles.title, { color: themeText }]}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    width: 250,
    maxHeight: 300,
    overflow: 'hidden', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    // Agregamos margen inferior para que la sombra se vea bien en listas
    marginBottom: 5, 
  },
  pressed: {
    opacity: 0.8, 
    transform: [{ scale: 0.98 }], 
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: '#ccc', 
  },
  content: {
    padding: 15,
  },
  category: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default MuseoCard;