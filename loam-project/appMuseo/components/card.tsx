import React from 'react';
import {
  View, Text ,   
  Image, 
  StyleSheet, 
  useColorScheme, 
  Pressable,
  ImageSourcePropType
} from 'react-native';


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
        { backgroundColor: '#ffffffff', shadowColor: '#000' },
        pressed && styles.pressed 
      ]}
    >
      <Image 
        source={imageUrl} 
        style={styles.image} 
      />
      
      <View style={styles.content}>
        <Text style={[styles.category, ]}>
          {category.toUpperCase()}
        </Text>
        <Text style={[styles.title, ]}>
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