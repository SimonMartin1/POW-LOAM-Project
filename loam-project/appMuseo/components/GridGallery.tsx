import React from 'react';
import { 
  FlatList, 
  View, 
  StyleSheet, 
  Dimensions, 
  ImageSourcePropType
} from 'react-native';


import NewsCard from './NewsCard';


export type GalleryItem = {
  id: string;
  title: string;
  resume: string;
  date: string;
  image: ImageSourcePropType;
  featured: boolean;
};


const screenWidth = Dimensions.get('window').width*34/100;
const numColumns = 2; 
const gap = 1; 

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
      
      contentContainerStyle={{ padding: gap }}
      columnWrapperStyle={{ gap: gap }} 
      showsVerticalScrollIndicator={false}
    />
  );
};

export default GridGallery;