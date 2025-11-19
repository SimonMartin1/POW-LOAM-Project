import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import NewsDetailScreen, { NewsDetailProps } from '@/components/NewsDetailScreen';


const NOTICIAS_DB = [
  { 
    id: '1', 
    title: 'Nuevo Fosil en el Museo', 
    resume: 'Durante una recoleccion en el valle de la luna se encontro un Cráneo de Diplodocus y esta semana arribo a nuestro museo, puede ser obrservado en la seccion animales exoticos',
    date: 'hace 8 días', 
    image: require('@/assets/images/fosil2.png'), 
    featured: true 
  },
  { 
    id: '2', 
    title: 'Nueva Exhibición de Fósiles Marinos', 
    resume: 'Cráneo de Oso',
    date: 'hace 12 días', 
    image: require('@/assets/images/fosil3.png'), 
    featured: false 
  },
  { 
    id: '3', 
    title: 'Nuevo Ejemplar en nuestra coleccion', 
    resume: 'Este TopoVago del mapuche, es un roedor que habita nuestras tierras desde hace 5 decadas se los puedo encontrar en lugares muy diferentes pero su habitat natural es el pajonal',
    date: 'hace 12 días', 
    image: require('@/assets/images/topovago.png'), 
    featured: true 
  },
    { 
    id: '4', 
    title: 'Nuevo Ejemplar en nuestra coleccion', 
    resume: 'Este TopoVago del mapuche, es un roedor que habita nuestras tierras desde hace 5 decadas se los puedo encontrar en lugares muy diferentes pero su habitat natural es el pajonal',
    date: 'hace 12 días', 
    image: require('@/assets/images/topovago.png'), 
    featured: true 
  },
    { 
    id: '5', 
    title: 'Nuevo Ejemplar en nuestra coleccion', 
    resume: 'Este TopoVago del mapuche, es un roedor que habita nuestras tierras desde hace 5 decadas se los puedo encontrar en lugares muy diferentes pero su habitat natural es el pajonal',
    date: 'hace 12 días', 
    image: require('@/assets/images/topovago.png'), 
    featured: true 
  },
    { 
    id: '6', 
    title: 'Nuevo Ejemplar en nuestra coleccion', 
    resume: 'Este TopoVago del mapuche, es un roedor que habita nuestras tierras desde hace 5 decadas se los puedo encontrar en lugares muy diferentes pero su habitat natural es el pajonal',
    date: 'hace 12 días', 
    image: require('@/assets/images/topovago.png'), 
    featured: true 
  }
];

export default function NewsPage() {
  const { id } = useLocalSearchParams();
  const [noticia, setNoticia] = useState<NewsDetailProps | null>(null);

  useEffect(() => {
    // Buscar la noticia por ID
    const found = NOTICIAS_DB.find((item) => item.id === id);
    if (found) setNoticia(found);
  }, [id]);

  return (
    <>
      {/* Configuración del Header (Oculto porque usamos nuestra propia imagen header) */}
      <Stack.Screen options={{ headerShown: false }} />

      {!noticia ? (
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