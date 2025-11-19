import { StyleSheet, FlatList,ImageSourcePropType, ScrollView } from 'react-native';
import SearchBar from '@/components/searchBar';
import MuseoCard from '@/components/card';
import React, { useState, useEffect } from 'react';
import Dropdown, { DropdownOption } from '@/components/Dropdown';
import { Text, View } from '@/components/Themed'; 
// Espacio entre cards
const SeparatorComponent = () => <View style={{ width: 15 }} />;

type Obra = {
  id: string;
  title: string;
  category: string;
  image: ImageSourcePropType;
  author: string;
  date: string;
  keywords: string[];
};

// 1. DATOS DE EJEMPLO (IMPORTANTE: Deben tener datos para que el filtro funcione)
const OBRAS_MUSEO: Obra[] = [
  {
    id: '1',
    title: 'Geoda',
    category: 'Paleontología',
    image: require('@/assets/images/fosil6.png'),
    author: 'Juan Perez', // <--- Datos necesarios
    date: '2023',
    keywords: ['cristal', 'mineral', 'violeta']
  },
  {
    id: '2',
    title: 'Amonita',
    category: 'Fósiles',
    image: require('@/assets/images/fosil5.png'),
    author: 'Maria Lopez',
    date: '2022',
    keywords: ['marino', 'caracol']
  },
  {
    id: '3',
    title: 'Grammostola doeringi',
    category: 'Aracnidos',
    image: require('@/assets/images/fosil4.png'),
    author: 'Carlos Diaz',
    date: '2024',
    keywords: ['araña', 'insecto']
  },
  {
    id: '4',
    title: 'Punta de Flecha',
    category: 'Arqueología',
    image: require('@/assets/images/fosil2.png'),
    author: 'Ana Garcia',
    date: '1990',
    keywords: ['indigena', 'arma']
  },
];

const FILTER_OPTIONS = [
  { label: 'Todo', value: 'all' },
  { label: 'Categoría', value: 'category' },
  { label: 'Fecha', value: 'date' },
  { label: 'Autor', value: 'author' },
  { label: 'Palabras Clave', value: 'keywords' },
];

export default function Gallery() {
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
  const [selectedCategory, setSelectedCategory] = useState<DropdownOption | null>(null);
  
  // 2. LÓGICA DE FILTRADO CORREGIDA
  useEffect(() => {
    // Si no hay texto escrito, mostramos todo (reiniciar lista)
    if (query.trim() === '') {
      setFilteredObras(OBRAS_MUSEO);
      return;
    }

    const lowerCaseQuery = query.toLowerCase();
    // Si no hay dropdown seleccionado, buscamos en "Todo" por defecto
    const filterType = selectedCategory ? selectedCategory.value : 'all';

    const result = OBRAS_MUSEO.filter(item => {
      // El switch decide EN QUÉ CAMPO buscar el texto 'query'
      switch (filterType) {
        case 'category':
          return item.category.toLowerCase().includes(lowerCaseQuery);
        
        case 'date':
          return item.date.toLowerCase().includes(lowerCaseQuery);
        
        case 'author':
          return item.author.toLowerCase().includes(lowerCaseQuery);
        
        case 'keywords':
          // Keywords es un array, usamos .some() para ver si alguna coincide
          return item.keywords.some(k => k.toLowerCase().includes(lowerCaseQuery));
        
        case 'all':
        default:
          // Búsqueda general: busca si el texto coincide con Título O Categoría O Autor
          return item.title.toLowerCase().includes(lowerCaseQuery) ||
                 item.category.toLowerCase().includes(lowerCaseQuery) ||
                 item.author.toLowerCase().includes(lowerCaseQuery);
      }
    });

    setFilteredObras(result);

  }, [query, selectedCategory]); // Se ejecuta cuando cambia el texto O el dropdown

  return (
    <ScrollView style={styles.container}>
      
      <View style={styles.filterContainer}>
        <View style={styles.searchWrapper}>
          <SearchBar onSearch={(text) => setQuery(text)} />
        </View>
        
        <View style={styles.dropdownWrapper}>
          <Dropdown
            placeholder="Filtro" 
            data={FILTER_OPTIONS} 
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
        // Mensaje útil si no hay resultados
        ListEmptyComponent={
            <Text style={{textAlign: 'center', marginTop: 20, color: '#666'}}>
                No se encontraron obras con ese criterio.
            </Text>
        }
      />
    </ScrollView>
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
  filterContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    paddingHorizontal: 15, 
    gap: 10, 
    marginBottom: 10,
    marginTop: 10,
    width: '100%',
    backgroundColor: 'transparent',
  },
  searchWrapper: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    height:'70%',
  },
  dropdownWrapper: {
    width: 160,
    backgroundColor: 'transparent',
  }
});
