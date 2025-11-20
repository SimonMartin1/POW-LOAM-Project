import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import NewsDetailScreen, { NewsDetailProps } from '@/components/NewsDetailScreen';

// --- CONFIGURACIÓN ---
const IP = '192.168.1.36'; // <--- Verifica que sea tu IP actual
const BASE_URL = `http://${IP}:8000`;

export default function NewsPage() {
  const { id } = useLocalSearchParams();
  const [noticia, setNoticia] = useState<NewsDetailProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNoticia();
  }, [id]);

  // Función auxiliar CORREGIDA: Siempre devuelve un string (nunca null)
  const getImageUrl = (path: any): string => {
    if (!path) return 'https://via.placeholder.com/300'; // Imagen por defecto si viene vacía
    
    const pathString = path.toString();
    
    if (pathString.startsWith('http')) return pathString;
    
    // Lógica para noticias (quita la barra inicial si existe)
    return `${BASE_URL}${pathString.startsWith('/') ? '' : '/'}${pathString}`;
  };

  const fetchNoticia = async () => {
    try {
      // Traemos todas las noticias y filtramos (solución temporal hasta tener endpoint por ID)
      const response = await fetch(`${BASE_URL}/api/news`);
      const data = await response.json();
      
      // Buscamos la noticia por ID
      const found = data.find((item: any) => item.id.toString() === id);
      
      if (found) {
        setNoticia({
            title: found.title,
            resume: found.excerpt,
            date: found.published_at,
            // AQUI ESTABA EL ERROR: Ahora getImageUrl asegura devolver un string
            image: { uri: getImageUrl(found.image_path) },
            featured: false, 
        });
      }
    } catch (error) {
      console.error("Error buscando noticia:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Ocultamos el header por defecto para usar el de la imagen */}
      <Stack.Screen options={{ headerShown: false }} />

      {loading ? (
         <View style={styles.center}>
            <ActivityIndicator size="large" color="#F79A2B" />
         </View>
      ) : !noticia ? (
        <View style={styles.center}>
          <Text>Noticia no encontrada...</Text>
        </View>
      ) : (
        <NewsDetailScreen {...noticia} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});