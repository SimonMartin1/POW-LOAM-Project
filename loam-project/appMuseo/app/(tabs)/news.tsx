import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, ScrollView, ImageSourcePropType, ActivityIndicator } from 'react-native';
import MuseoCard from '@/components/card';
import NewsCard from '@/components/NewsCard';
import LinkButton from '@/components/LinkButton';
import { Text, View } from '@/components/Themed'; 
import { getBaseUrl } from '../config/config';

const BASE_URL = getBaseUrl();

// Espacio entre cards
const SeparatorComponent = () => <View style={{ width: 15 }} />;

type Obra = {
  id: string;
  title: string;
  category: string;
  image: ImageSourcePropType; 
};

type Noticia = {
  id: string;
  title: string;
  resume: string;
  date: string;
  image: ImageSourcePropType;
  featured: boolean;
};

export default function TabOneScreen() {
  const [obras, setObras] = useState<Obra[]>([]);
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDatos();
  }, []);

  const fetchDatos = async () => {
    try {
      // 1. Traer Noticias
      const resNews = await fetch(`${BASE_URL}/api/news`);
      const dataNews = await resNews.json();
      
      // Mapeo de DB (Laravel) a Tu Componente (React Native)
      const noticiasFormateadas = dataNews.map((item: any) => ({
        id: item.id.toString(),
        title: item.title,
        resume: item.excerpt || '',
        date: item.published_at,
        // Construcción de URL de imagen
        image: { uri: getImageUrl(item.image_path, 'noticia') },
        featured: false // Por defecto false o agregar lógica si tienes columna featured
      }));
      setNoticias(noticiasFormateadas);

    } catch (error) {
      console.error("Error cargando datos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Helper para las rutas de imagen
  const getImageUrl = (path: string, tipo: string) => {
    if (!path) return 'https://via.placeholder.com/150'; // Placeholder si no hay foto
    if (path.startsWith('http')) return path;

    if (tipo === 'noticia') {
      // Si la ruta ya tiene '/' al inicio, concatenamos directo
      return `${BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
    } 
    if (tipo === 'galeria') {
      return `${BASE_URL}/storage/${path}`;
    }
    return `${BASE_URL}/${path}`;
  };



  const renderNew = ({ item }: { item: Noticia }) => (
    <NewsCard
      id={item.id}
      title={item.title}
      resume={item.resume}
      date={item.date}
      imageSource={item.image}
      isFeatured={item.featured}
      />
  );

  if (loading) {
    return (
      <View style={[styles.container, {justifyContent: 'center', alignItems: 'center'}]}>
        <ActivityIndicator size="large" color="#F79A2B" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsHorizontalScrollIndicator={false}>
        
        <Text style={styles.sectionTitle}>Noticias</Text>
        <FlatList
          data={noticias}
          renderItem={renderNew}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<Text style={{marginLeft: 15, color: '#888'}}>No hay noticias cargadas.</Text>}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
    marginTop: 10,
  },
  listContainer: {
    paddingHorizontal: 15, 
    paddingVertical: 10, 
  }
});