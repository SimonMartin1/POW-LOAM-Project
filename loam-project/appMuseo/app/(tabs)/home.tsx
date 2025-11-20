import {StyleSheet, FlatList, ScrollView,ImageSourcePropType } from 'react-native';
import MuseoCard from '@/components/card';
import NewsCard from '@/components/NewsCard';
import LinkButton from '@/components/LinkButton';
import { Text, View } from '@/components/Themed'; 

//Espacio entre cards
const SeparatorComponent = () => <View style={{ width: 15 }} />;

type Obra = {
  id: string;
  title: string;
  category: string;
  image: ImageSourcePropType; 
};


// Datos de ejemplo
const OBRAS_MUSEO: Obra[] = [
  {
    id: '1',
    title: 'Geoda',
    category: 'Paleontología',
    image: require('@/assets/images/fosil6.png'), 
  },
  {
    id: '2',
    title: 'Amonita',
    category: 'Fósiles',
    image: require('@/assets/images/fosil5.png'), 
  },
  {
    id: '3',
    title: 'Grammostola doeringi',
    category: 'Aracnidos',
    image: require('@/assets/images/fosil4.png'), 
  },
  {
    id: '4',
    title: 'Punta de Flecha',
    category: 'Arqueología',
    image: require('@/assets/images/fosil2.png'),
  },
];

// useEffect(() => {
//   fetch('http://192.168.1.100:8000/api/obras') 
//     .then(response => response.json())
//     .then(data => {
//       OBRAS_MUSEO;
//     });
// }, []);



// { uri: 'https://picsum.photos/400/302' }
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

  return (
    <View style={styles.container}>
      <ScrollView showsHorizontalScrollIndicator={false}>
    <Text style={styles.sectionTitle}>Noticias</Text>

      
      <FlatList
        data={NOTICIAS_DATA}
        renderItem={renderNew}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />

      <LinkButton 
      show_text={"Ver Mas"}colour={'#ffffffff'} route={'/news'}/>


      <Text style={styles.sectionTitle}>Destacados</Text>

      
      <FlatList
        data={OBRAS_MUSEO}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        
        
        horizontal={true} 
        showsHorizontalScrollIndicator={false} 
        
        contentContainerStyle={styles.listContainer} 
        ItemSeparatorComponent={SeparatorComponent} 
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