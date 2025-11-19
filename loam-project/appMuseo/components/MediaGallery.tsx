import React, { useRef, useState, useCallback } from 'react';
import { 
  View, 
  Image, 
  StyleSheet, 
  FlatList, 
  Dimensions, 
  Pressable,
  ImageSourcePropType,
  Modal,
  StatusBar,
  Text,
  ViewToken
} from 'react-native';
import { Video, ResizeMode, AVPlaybackSource } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.8; 
const SPACING = 15;

export type MediaItem = {
  id: string;
  type: 'image' | 'video';
  source: ImageSourcePropType | string; 
  thumbnail?: ImageSourcePropType; 
};

type MediaGalleryProps = {
  items: MediaItem[];
};

const MediaGallery = ({ items }: MediaGalleryProps) => {
  // --- ESTADOS ---
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const videoRefs = useRef<(Video | null)[]>([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); 

  // --- LÓGICA ROBUSTA PARA EL CONTADOR (NUEVO) ---
  // onViewableItemsChanged nos dice exactamente qué ítem se ve, sin matemáticas raras
  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  // Configuración: Consideramos que el ítem cambió cuando el 50% es visible
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  // --- FUNCIONES CARRUSEL PEQUEÑO ---
  const handlePlayPress = (index: number) => {
    const currentVideo = videoRefs.current[index];
    if (playingIndex === index) {
      currentVideo?.pauseAsync();
      setPlayingIndex(null);
    } else {
      if (playingIndex !== null) videoRefs.current[playingIndex]?.pauseAsync();
      currentVideo?.playAsync();
      setPlayingIndex(index);
    }
  };

  // --- FUNCIONES MODAL ---
  const openModal = (index: number) => {
    if (playingIndex !== null) {
        videoRefs.current[playingIndex]?.pauseAsync();
        setPlayingIndex(null);
    }
    setCurrentIndex(index);
    setModalVisible(true);
  };

  // --- RENDER ITEM PEQUEÑO ---
  const renderSmallItem = ({ item, index }: { item: MediaItem, index: number }) => {
    return (
      <Pressable 
        onPress={() => openModal(index)} 
        style={[styles.mediaContainer, { marginLeft: index === 0 ? 20 : 0 }]}
      >
        {item.type === 'image' ? (
          <Image 
            source={item.source as ImageSourcePropType} 
            style={styles.media} 
            resizeMode="cover" 
          />
        ) : (
          <View style={styles.videoContainer}>
            <Video
              ref={(ref) => { videoRefs.current[index] = ref; }}
              style={styles.media}
              source={typeof item.source === 'string' ? { uri: item.source } : (item.source as AVPlaybackSource)}
              useNativeControls={false} 
              resizeMode={ResizeMode.COVER}
              isLooping
            />
            <Pressable 
                style={styles.playButtonOverlay}
                onPress={(e) => {
                    e.stopPropagation(); 
                    handlePlayPress(index);
                }}
            >
                {playingIndex !== index && (
                    <View style={styles.playButtonCircle}>
                        <Ionicons name="play" size={30} color="#F79A2B" style={{ marginLeft: 4 }} />
                    </View>
                )}
            </Pressable>
          </View>
        )}
        <View style={styles.typeBadge}>
            <Ionicons name={item.type === 'video' ? 'videocam' : 'image'} size={12} color="#fff" />
        </View>
      </Pressable>
    );
  };

  // --- RENDER ITEM PANTALLA COMPLETA ---
  const renderFullScreenItem = ({ item }: { item: MediaItem }) => {
    return (
        <View style={{ width: width, height: height, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
            {item.type === 'image' ? (
                <Image 
                    source={item.source as ImageSourcePropType} 
                    style={{ width: width, height: '80%' }} 
                    resizeMode="contain" 
                />
            ) : (
                <Video
                    style={{ width: width, height: '80%' }}
                    source={typeof item.source === 'string' ? { uri: item.source } : (item.source as AVPlaybackSource)}
                    useNativeControls
                    resizeMode={ResizeMode.CONTAIN}
                    isLooping
                    shouldPlay={true} 
                />
            )}
        </View>
    );
  };

  if (!items || items.length === 0) return null;

  return (
    <View style={styles.container}>
      
      {/* Carrusel Pequeño */}
      <FlatList
        data={items}
        keyExtractor={(item, index) => item.id + index.toString()}
        renderItem={renderSmallItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH + SPACING}
        decelerationRate="fast"
        contentContainerStyle={{ paddingRight: 20 }}
        ItemSeparatorComponent={() => <View style={{ width: SPACING }} />}
      />

      {/* Modal Pantalla Completa */}
      <Modal
        visible={modalVisible}
        transparent={false}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
            <StatusBar hidden />
            
            <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={30} color="#fff" />
            </Pressable>

            <View style={styles.counterContainer}>
                <Text style={styles.counterText}>
                    {currentIndex + 1} / {items.length}
                </Text>
            </View>

            {/* Lista Gigante */}
            <FlatList 
                data={items}
                keyExtractor={(item, index) => item.id + index.toString()}
                renderItem={renderFullScreenItem}
                horizontal
                pagingEnabled // Mantenemos pagingEnabled
                
                // --- TRUCO PARA SCROLL DURO ---
                // Forzamos el snap y la desaceleración rápida para evitar saltos
                snapToInterval={width} 
                decelerationRate="fast"
                disableIntervalMomentum={true} // Esto evita que salte múltiples páginas a la vez
                
                showsHorizontalScrollIndicator={false}
                initialScrollIndex={currentIndex}
                
                getItemLayout={(data, index) => (
                    { length: width, offset: width * index, index }
                )}
                
                // --- NUEVO SISTEMA DE CONTADOR ---
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
            />
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 20,
  },
  mediaContainer: {
    width: ITEM_WIDTH,
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#000',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  media: {
    width: '100%',
    height: '100%',
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonOverlay: {
    ...StyleSheet.absoluteFillObject, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)', 
  },
  playButtonCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 5,
  },
  counterContainer: {
    position: 'absolute',
    top: 45,
    alignSelf: 'center',
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.3)', // Fondo suave para que se lea mejor
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  counterText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default MediaGallery;