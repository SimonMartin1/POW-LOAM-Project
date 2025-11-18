import { View, StyleSheet, FlatList, Text, ImageSourcePropType } from 'react-native';
import SearchBar from '@/components/searchBar';
import NewsCard from '@/components/NewsCard';


//Espacio entre cards
const SeparatorComponent = () => <View style={{ width: 15 }} />;


type Noticia = {
  id: string;
  title: string;
  resume: string;
  date: string;
  image: ImageSourcePropType;
  featured: boolean;
};


const NOTICIAS_DATA: Noticia[] = [
  { 
    id: '1', 
    title: 'Nuevo Fosil en el Museo', 
    resume: 'Durante una recoleccion en el valle de la luna se encontro un Cráneo de Diplodocus y esta semana arribo a nuestro museo, puede ser obrservado en la seccion animales exoticos',
    date: 'hace 8 días', 
    image: require('@/assets/images/fosil2.png'), // <-- Cambia a tu imagen
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
  }
];



export default function TabOneScreen() {
  
  
  const renderNew = ({ item }: { item: Noticia }) => (
    <NewsCard
      title={item.title}
      resume={item.resume}
      date={item.date}
      imageSource={item.image}
      isFeatured={item.featured}
      onPress={() => console.log('Ir a noticia:', item.id)}
      />
  );

  
  return (
    <View style={styles.container}>
      
    <Text style={styles.sectionTitle}>Noticias</Text>

      
      <FlatList
        data={NOTICIAS_DATA}
        renderItem={renderNew}
        keyExtractor={(item) => item.id}
      />

    </View>
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