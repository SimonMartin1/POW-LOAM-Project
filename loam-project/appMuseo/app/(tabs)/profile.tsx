import { View, StyleSheet, FlatList, Text, ImageSourcePropType } from 'react-native';
import SearchBar from '@/components/searchBar';
import MuseoCard from '@/components/card';



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
    title: 'Cráneo de Oso',
    category: 'Paleontología',
    image: require('@/assets/images/fosil.png'), 
  },
  {
    id: '2',
    title: 'Amonita',
    category: 'Fósiles',
    image: require('@/assets/images/fosil.png'), 
  },
  {
    id: '3',
    title: 'Helecho Antiguo',
    category: 'Botánica',
    image: { uri: 'https://picsum.photos/400/301' }, 
  },
  {
    id: '4',
    title: 'Punta de Flecha',
    category: 'Arqueología',
    image: { uri: 'https://picsum.photos/400/302' },
  },
];


export default function TabOneScreen() {
  
  const renderCard = ({ item }: { item: Obra }) => (
    <MuseoCard 
      title={item.title}
      category={item.category}
      imageUrl={item.image}
      onPress={() => console.log("Ir a detalles de:", item.title)}
    />
  );

  return (
    <View style={styles.container}>
    
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
  },
});