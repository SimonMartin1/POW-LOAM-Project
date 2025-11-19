import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import MuseumDetailScreen, { MuseumDetailProps } from '@/components/MuseumDetailScreen';
import CommentModal from '@/components/CommentModal'; 

const OBRAS_DB: MuseumDetailProps[] = [ // Usamos el tipo MuseumDetailProps para que TypeScript nos ayude
  { 
    id: '1', // Asegúrate de que este ID coincida con el de tu lista en home.tsx
    title: 'Geoda', 
    category: 'Paleontología', 
    image: require('@/assets/images/fosil6.png'), // Imagen principal
    location: 'Sala de Minerales, Piso 2',
    description: 'Las geodas son estructuras huecas en las rocas, rellenas de cristales. Esta pieza en particular fue hallada en la región de Artigas y posee cristales de amatista de gran pureza.',
    model3dUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb', // Modelo 3D de prueba
    
    // --- DATOS DE LA GALERÍA (IMÁGENES Y VIDEO) ---
    gallery: [
      { 
        id: 'g1', 
        type: 'image', 
        source: require('@/assets/images/fosil5.png') // Otra imagen local
      },
      { 
        id: 'g2', 
        type: 'video', 
        // Video MP4 público de prueba (Big Buck Bunny)
        source: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' 
      },
      { 
        id: 'g3', 
        type: 'image', 
        source: { uri: 'https://picsum.photos/id/1015/600/400' } // Imagen de internet (paisaje)
      },
      { 
        id: 'g4', 
        type: 'image', 
        source: { uri: 'https://picsum.photos/id/1016/600/400' } // Otra imagen
      },
    ]
  },
  { 
    id: '2', 
    title: 'Amonita', 
    category: 'Fósiles', 
    image: require('@/assets/images/fosil5.png'),
    location: 'Sala de Paleontología, Vitrina 4',
    description: 'Los amonites son una subclase de moluscos cefalópodos extintos que existieron en los mares desde el Devónico Medio hasta finales del Cretácico.',
    
    // --- GALERÍA SOLO DE IMÁGENES ---
    gallery: [
      { 
        id: 'g2a', 
        type: 'image', 
        source: { uri: 'https://picsum.photos/id/10/600/400' } 
      },
      { 
        id: 'g2b', 
        type: 'image', 
        source: { uri: 'https://picsum.photos/id/11/600/400' } 
      }
    ]
  },
  { 
    id: '3', 
    title: 'Grammostola doeringi', 
    category: 'Aracnidos', 
    image: require('@/assets/images/fosil4.png'),
    description: 'Conocida como araña pollito, es una especie de tarántula propia del sur de Sudamérica. Es dócil y de movimientos lentos.',
    
    // --- GALERÍA CON VIDEO VERTICAL DE PRUEBA ---
    gallery: [
      {
        id: 'v1',
        type: 'video',
        // Video vertical de prueba
        source: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
      },
      { 
        id: 'i1', 
        type: 'image', 
        source: require('@/assets/images/fosil2.png') 
      }
    ]
  },
  {
    id: '4',
    title: 'Punta de Flecha',
    category: 'Arqueología',
    image: require('@/assets/images/fosil2.png'),
    // Esta obra NO tiene galería, para probar que no se rompa si falta
  },
];
// --------------------------------------------------------------


export default function ObraDetailPage() {
  const { id } = useLocalSearchParams();
  const [obra, setObra] = useState<MuseumDetailProps | null>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const found = OBRAS_DB.find((item) => item.id === id);
    
    if (found) {
      setObra(found);
    }
  }, [id]);

  // --- 2. LÓGICA PARA ABRIR EL MODAL ---
  const handleOpenCommentModal = () => {
    setModalVisible(true);
  };

  // --- 3. LÓGICA PARA ENVIAR EL COMENTARIO ---
  const handleSendComment = async (text: string) => {
    setIsSubmitting(true);

    // SIMULACIÓN DE LLAMADA A LA API (Laravel)
    // En la realidad sería: await api.post('/comments', { obra_id: id, content: text })
    setTimeout(() => {
      setIsSubmitting(false);
      setModalVisible(false); // Cierra el modal

      // ALERTA DE ÉXITO (Requisito de Moderación)
      Alert.alert(
        "¡Comentario Enviado!",
        "Tu comentario ha sido enviado a moderación. Será visible una vez que sea aprobado por un administrador.",
        [{ text: "Entendido" }]
      );
      
      console.log("Comentario enviado para obra ID:", id, "Contenido:", text);
    }, 1500); // Simulamos 1.5 segundos de carga
  };

  return (
    <>
      <Stack.Screen 
        options={{
          headerTitle: obra ? obra.title : 'Detalle de Obra', 
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#000',
        }} 
      />
      {!obra ? (
        <View style={styles.center}>
          <Text>Cargando...</Text>
        </View>
      ) : (
        <MuseumDetailScreen 
        {...obra}
        onPressComment={handleOpenCommentModal}
        />
      )}
      <CommentModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSendComment}
        isSubmitting={isSubmitting}
      />
    </>
  );
}


const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});