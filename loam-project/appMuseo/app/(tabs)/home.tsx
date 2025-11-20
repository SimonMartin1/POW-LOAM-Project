import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, ScrollView, ImageSourcePropType, ActivityIndicator } from 'react-native';
import MuseoCard from '@/components/card';
import NewsCard from '@/components/NewsCard';
import LinkButton from '@/components/LinkButton';
import { Text, View } from '@/components/Themed'; 

// CONFIGURACIÓN
const IP = '192.168.1.36'; 
const BASE_URL = `http://${IP}:8000`;

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

      // 2. Traer Obras (Galería)
      const resObras = await fetch(`${BASE_URL}/api/imagenes`);
      const dataObras = await resObras.json();

      const obrasFormateadas = dataObras.map((item: any) => ({
        id: item.id.toString(),
        title: item.nombre,
        category: item.autor || 'Colección', // Usamos autor como categoría por ahora
        image: { uri: getImageUrl(item.url_imagen, 'galeria') }
      }));
      setObras(obrasFormateadas);

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

  const renderCard = ({ item }: { item: Obra }) => (
    <MuseoCard
      id={item.id}
      title={item.title}
      category={item.category}
      imageUrl={item.image}
    />
  );

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
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={<Text style={{marginLeft: 15, color: '#888'}}>No hay noticias cargadas.</Text>}
        />

        <LinkButton show_text={"Ver Mas"} colour={'#ffffffff'} route={'/news'}/>

        <Text style={styles.sectionTitle}>Destacados</Text>
        <FlatList
          data={obras}
          renderItem={renderCard}
          keyExtractor={(item) => item.id}
          horizontal={true} 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.listContainer} 
          ItemSeparatorComponent={SeparatorComponent} 
          ListEmptyComponent={<Text style={{marginLeft: 15, color: '#888'}}>No hay obras cargadas.</Text>}
        />
        
        <LinkButton show_text={"Ver Mas"} colour={'#ffffffff'} route={'/gallery'}/>
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