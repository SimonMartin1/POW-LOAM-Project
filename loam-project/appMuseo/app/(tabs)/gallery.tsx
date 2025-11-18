import { View, StyleSheet, FlatList, Text, ImageSourcePropType } from 'react-native';
import SearchBar from '@/components/searchBar';
import MuseoCard from '@/components/card';
import React, { useState, useEffect } from 'react';


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

export default function TabOneScreen() {
  
  const renderCard = ({ item }: { item: Obra }) => (
    <MuseoCard 
      title={item.title}
      category={item.category}
      imageUrl={item.image}
      onPress={() => console.log("Ir a detalles de:", item.title)}
    />
  )
  const [filteredObras, setFilteredObras] = useState(OBRAS_MUSEO);
  const [query, setQuery] = useState('');
  const filtered = OBRAS_MUSEO.filter((obra) =>
  obra.title.toLowerCase().includes(query.toLowerCase()) ||
  obra.category.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    // Esta función se ejecutará cada vez que 'query' cambie
    if (query === '') {
      setFilteredObras(OBRAS_MUSEO);
    } else {
      const lowerCaseQuery = query.toLowerCase();

      // Filtra Obras
      const newFilteredObras = OBRAS_MUSEO.filter(item => {
        // Busca en título y categoría
        return item.title.toLowerCase().includes(lowerCaseQuery) ||
               item.category.toLowerCase().includes(lowerCaseQuery);
      });
      setFilteredObras(newFilteredObras);
    }
  }, [query]);

  return (
    <View style={styles.container}>
      
    <SearchBar onSearch={(text) => setQuery(text)} />

      <Text style={styles.sectionTitle}>Nuestras Obras de Artes</Text>

      
      <FlatList
        data={filteredObras}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        
        
        horizontal={true} 
        showsHorizontalScrollIndicator={false} 
        
        contentContainerStyle={styles.listContainer} 
        ItemSeparatorComponent={SeparatorComponent} 
      />
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