import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  ScrollView, 
  Dimensions, 
  ImageSourcePropType,
  Pressable
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

const { width } = Dimensions.get('window');

// Usamos los mismos tipos que tu Noticia
export type NewsDetailProps = {
  title: string;
  resume: string;
  date: string;
  image: ImageSourcePropType;
  featured: boolean;
  // body?: string; // En el futuro podrías tener un "cuerpo" más largo que el resumen
};

const NewsDetailScreen = (props: NewsDetailProps) => {
  const navigation = useNavigation();
  const { title, resume, date, image, featured } = props;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Imagen de Cabecera */}
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.image} resizeMode="cover" />
          
          {/* Botón Atrás Flotante */}
          <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </Pressable>
        </View>

        <View style={styles.contentContainer}>
          
          {/* Cabecera: Fecha y Badge Destacado */}
          <View style={styles.metaRow}>
            <View style={styles.dateContainer}>
              <Ionicons name="time-outline" size={16} color="#666" />
              <Text style={styles.dateText}>{date}</Text>
            </View>
            
            {featured && (
              <View style={styles.featuredBadge}>
                <FontAwesome name="star" size={12} color="#fff" />
                <Text style={styles.featuredText}>Destacado</Text>
              </View>
            )}
          </View>

          {/* Título */}
          <Text style={styles.title}>{title}</Text>

          {/* Separador Decorativo */}
          <View style={styles.divider} />

          {/* Contenido (Resumen) */}
          <Text style={styles.bodyText}>
            {resume}
          </Text>
          
          {/* Aquí podrías agregar más texto simulado si el resumen es corto */}
          <Text style={[styles.bodyText, { marginTop: 10 }]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </Text>

        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: width,
    height: 250,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    padding: 20,
    marginTop: -20, // Efecto solapado sobre la imagen
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  dateText: {
    color: '#666',
    fontSize: 14,
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F79A2B',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 5,
  },
  featuredText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#333',
    marginBottom: 15,
    lineHeight: 30,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginBottom: 20,
    width: '30%', // Solo una linea corta
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 26,
    color: '#444',
    textAlign: 'justify',
  },
});

export default NewsDetailScreen;