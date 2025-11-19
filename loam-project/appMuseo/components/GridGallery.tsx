import React from 'react';
import { 
  FlatList, 
  View, 
  StyleSheet, 
  Dimensions, 
  ImageSourcePropType
} from 'react-native';

// 1. IMPORTA TU COMPONENTE NEWSCARD
// Asegúrate de que la ruta coincida con donde guardaste el archivo (ej. components/NoticeCard.tsx)
import NewsCard from './NewsCard';

// 2. ACTUALIZA EL TIPO DE DATOS
// Ahora debe tener las propiedades que NewsCard espera
export type GalleryItem = {
  id: string;
  title: string;
  resume: string;
  date: string;
  image: ImageSourcePropType;
  featured: boolean;
};

// --- CÁLCULOS DEL GRID ---
const screenWidth = Dimensions.get('window').width*34/100;
const numColumns = 2; 
const gap = 1; 
// Calculamos el ancho disponible para cada columna
const availableWidth = screenWidth - (gap * (numColumns + 1));
const itemSize = availableWidth / numColumns;


const GridGallery = ({ data, onPressItem }: { data: GalleryItem[]; onPressItem?: (id: string) => void }) => {

  const renderItem = ({ item }: { item: GalleryItem }) => (
    <View style={{ width: itemSize, marginBottom: gap }}>
      
      <NewsCard
        id={item.id}
        title={item.title}
        resume={item.resume}
        date={item.date}
        imageSource={item.image}
        isFeatured={item.featured}
      />
    </View>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      
      numColumns={numColumns}
      
      // Espaciado del Grid
      contentContainerStyle={{ padding: gap }}
      columnWrapperStyle={{ gap: gap }} // Espacio horizontal entre columnas
      showsVerticalScrollIndicator={false}
    />
  );
};

export default GridGallery;