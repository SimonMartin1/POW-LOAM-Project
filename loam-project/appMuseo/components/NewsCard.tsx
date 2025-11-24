// En: components/NoticeCard.tsx

import React from 'react';
import { 
  Image, 
  StyleSheet, 
  Pressable, 
  ImageSourcePropType 
} from 'react-native';
import { View, Text } from '@/components/Themed'; 
import { FontAwesome } from '@expo/vector-icons'; // Para el ícono de estrella
import Colors from '@/constants/Colors';
import { router } from 'expo-router';
// 1. Definimos los props para la tarjeta de noticia
type NoticeCardProps = {
  id: string;
  title: string;
  resume: string;
  date: string;
  imageSource: ImageSourcePropType;
  isFeatured?: boolean; // Para mostrar la estrella
  onPress?: () => void;
};

const NewsCard = ({
    id,
    title,
    date, 
    resume,
    imageSource, 
    isFeatured = false, // Valor por defecto
    onPress 
}: NoticeCardProps) => {
  
  
  const currentColors = Colors.light;
  const shadowColor =   currentColors.tint;
  const textColor = '#4a4a4aff';
  const secondaryTextColor = '#000000ff';

  const handlePress = () => {
      if (onPress) {
        onPress(); // Si el padre mandó una acción, úsala
      } else {
        router.push(`/noticia/${id}`); 
      }
    };

  return (
    <Pressable 
      onPress={handlePress}
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: currentColors.background, shadowColor: shadowColor },
        pressed && styles.pressed
      ]}
    >
      {/* 1. Imagen Superior */}
      <Image source={imageSource} style={styles.image} />
      
      {/* 2. Contenido de Texto */}
    <View style={styles.content}>
        <View style={styles.header}>
            {isFeatured && (
            <FontAwesome 
                name="star" 
                size={16} 
                color="#F79A2B" // Color naranja de tu imagen
                style={styles.icon} 
            />
            )}
            <Text style={[styles.title, { color: currentColors.text }]}>
            {title}
            </Text>
        </View>
        <Text style={[styles.date, { color: secondaryTextColor }]}>
            {date}
        </Text>
        <Text style={[styles.resume, { color: textColor }]}>
            {resume}
        </Text>
    </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 350,
    marginHorizontal: 15, // Ocupa el ancho - los márgenes
    marginVertical: 10,   // Espacio entre cards en la lista vertical
    borderRadius: 12,
    overflow: 'hidden',
    // Sombra
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pressed: {
    opacity: 0.8,
  },
  image: {
    width: '100%',
    height: 160, // Altura de la imagen de noticia
    backgroundColor: '#ccc',
  },
  content: {
    padding: 14,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Para que la estrella se alinee bien si el título es largo
    marginBottom: 8,
  },
  icon: {
    marginRight: 6,
    marginTop: 2, // Pequeño ajuste para alinear con el texto
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1, // Permite que el texto se ajuste (wrap)
  },
  date: {
    fontSize: 14,
    fontWeight: '500',
    paddingBottom:12,
  },
  resume: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default NewsCard;