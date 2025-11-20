import { StyleSheet, FlatList, ImageSourcePropType, ScrollView } from 'react-native';
import NewsCard from '@/components/NewsCard';
import GridGallery from '@/components/GridGallery';
import { GalleryItem } from '@/components/GridGallery';
import { Text, View } from '@/components/Themed'; 



const NOTICIAS_DATA: GalleryItem[] = [
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



export default function TabOneScreen() {
  
  
  const renderNew = ({ item }: { item: GalleryItem }) => (
    <NewsCard
      id={item.id}
      title={item.title}
      resume={item.resume}
      date={item.date}
      imageSource={item.image}
      isFeatured={item.featured}
      />
  );
  
  return (
    <ScrollView style={styles.container}>
      
    <Text style={styles.sectionTitle}>Noticias</Text>

      
      <GridGallery 
        data={NOTICIAS_DATA} 
      />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
  },
});