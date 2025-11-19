import { View, StyleSheet, FlatList, Text, ImageSourcePropType, ScrollView } from 'react-native';
import SearchBar from '@/components/searchBar';
import MuseoCard from '@/components/card';
import React, { useState, useEffect } from 'react';
import Dropdown from '@/components/Dropdown';
import { DropdownOption } from '@/components/Dropdown';
import MuseumDetailScreen from '@/components/MuseumDetailScreen';


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


const CATEGORIAS = [
  { label: 'Categoria', value: 'category' },
  { label: 'Fecha', value: 'date' },
  { label: 'Autor', value: 'author' },
  { label: 'Palabras Clave', value: 'keywords' },
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

  const [filteredObras, setFilteredObras] = useState(OBRAS_MUSEO);
  const [query, setQuery] = useState('');
  
  // Lógica de filtrado
  useEffect(() => {
    if (query === '') {
      setFilteredObras(OBRAS_MUSEO);
    } else {
      const lowerCaseQuery = query.toLowerCase();
      const newFilteredObras = OBRAS_MUSEO.filter(item => {
        return item.title.toLowerCase().includes(lowerCaseQuery) ||
               item.category.toLowerCase().includes(lowerCaseQuery);
      });
      setFilteredObras(newFilteredObras);
    }
  }, [query]);

  const [selectedCategory, setSelectedCategory] = useState<DropdownOption | null>(null);

  return (
    <ScrollView style={styles.container}>
      
      <View style={styles.filterContainer}>
        <View style={styles.searchWrapper}>
          <SearchBar onSearch={(text) => setQuery(text)} />
        </View>
        
        <View style={styles.dropdownWrapper}>
          <Dropdown
            placeholder="Categoria" 
            data={CATEGORIAS}
            selected={selectedCategory}
            onSelect={setSelectedCategory} 
          />
        </View>
      </View>

      <Text style={styles.sectionTitle}>Nuestras Obras de Artes</Text>

      <FlatList
        data={filteredObras}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false} 
        
        contentContainerStyle={styles.listContainer} 
        ItemSeparatorComponent={SeparatorComponent} 
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
  filterContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    paddingHorizontal: 15, 
    gap: 10, 
    marginBottom: 10,
    marginTop: 10,
  },
  searchWrapper: {
    flex: 1,
    height: '100%', // Ojo con esto, a veces height: 100% en flex children da problemas, mejor quítalo si no hace falta
  },
  dropdownWrapper: {
    width: 140, // Ajuste de ancho para que entre bien
  }
});