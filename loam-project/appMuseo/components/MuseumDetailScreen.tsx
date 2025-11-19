import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  ScrollView, 
  Dimensions, 
  ImageSourcePropType,
  Pressable
} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import ModelViewer from './ModelViewer';
import MediaGallery from './MediaGallery';
import { MediaItem } from './MediaGallery';
type Comment = {
  id: string;
  user: string;
  text: string;
  date: string;
};

const COMENTARIOS_DATA: Comment[] = [
  { id: '1', user: 'Ana García', text: '¡Increíble pieza! Me encantó ver los detalles de cerca.', date: 'Hace 2 días' },
  { id: '2', user: 'Carlos Lopez', text: 'Muy buena conservación. Recomiendo visitar el museo.', date: 'Hace 5 días' },
  { id: '3', user: 'Visitante Anónimo', text: 'Me gustaría saber más sobre el proceso de excavación.', date: 'Hace 1 semana' },
  { id: '4', user: 'Marta Diaz', text: 'Excelente explicación del guía.', date: 'Hace 2 semanas' },
  { id: '5', user: 'Juan Perez', text: 'Una joya de la paleontología.', date: 'Hace 1 mes' },
];

export type MuseumDetailProps = {
  id: String;
  title: string;
  category: string;
  image: ImageSourcePropType;
  model3dUrl?: string;
  description?: string;
  location?: string;
  onPressComment?: () => void;
  gallery?: MediaItem[]; 
};

const { width } = Dimensions.get('window');

const MuseumDetailScreen = (props: MuseumDetailProps) => {
  const navigation = useNavigation();
  
  // --- NUEVO ESTADO PARA VER MÁS ---
  const [showAllComments, setShowAllComments] = useState(false);
  
  const INITIAL_COMMENT_COUNT = 2; // Mostramos solo 2 al principio

  const {
    id,
    title,
    category,
    image,
    location = 'Museo de Ciencias Naturales',
    description = 'Pecheras Teams y Compañia',
    onPressComment,
    gallery,
  } = props;

  // Lógica para cortar la lista
  const displayedComments = showAllComments 
    ? COMENTARIOS_DATA 
    : COMENTARIOS_DATA.slice(0, INITIAL_COMMENT_COUNT);

  const renderCommentItem = ({ item }: { item: Comment }) => (
    <View style={styles.commentItem}>
      <View style={styles.commentHeader}>
        <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>{item.user.charAt(0)}</Text>
        </View>
        <View>
            <Text style={styles.commentUser}>{item.user}</Text>
            <Text style={styles.commentDate}>{item.date}</Text>
        </View>
      </View>
      <Text style={styles.commentText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.fullScreenContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View>
          <Image source={image} style={styles.image} resizeMode="cover" />
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.row}>
            <Ionicons name="pricetag-outline" size={16} color="#F79A2B" />
            <Text style={styles.category}>{category}</Text>
          </View>
          <Text style={styles.location}>{location}</Text>
          <Text style={styles.sectionTitle}>Sobre la obra</Text>
          <Text style={styles.description}>{description}</Text>

          {gallery && gallery.length > 0 && (
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Galería Multimedia</Text>
              <MediaGallery items={gallery} />
            </View>
          )}

          {props.model3dUrl && (
            <View style={{ marginTop: 20 }}>
              <Text style={styles.sectionTitle}>Vista 3D Interactiva</Text>
              <ModelViewer modelUrl={props.model3dUrl} />
              <Text style={styles.rotarText}>Toca y arrastra para rotar el objeto</Text>
            </View>
          )}

          {/* --- SECCIÓN DE COMENTARIOS --- */}
          <View style={styles.commentsSection}>
            <View style={styles.commentsHeaderSection}>
                <Text style={styles.sectionTitle}>Comentarios</Text>
                <Text style={styles.commentCount}>({COMENTARIOS_DATA.length})</Text>
            </View>
            
            <Pressable 
                style={({ pressed }) => [styles.commentButton, pressed && { opacity: 0.7 }]}
                onPress={onPressComment}
            >
                <Ionicons name="chatbubble-outline" size={20} color="#F79A2B" />
                <Text style={styles.commentButtonText}>Escribir una reseña</Text>
            </Pressable>

            {/* Renderizamos la lista cortada o completa */}
            {displayedComments.map((comment) => (
                <View key={comment.id}>
                    {renderCommentItem({ item: comment })}
                </View>
            ))}

            {/* --- BOTÓN VER MÁS / VER MENOS --- */}
            {COMENTARIOS_DATA.length > INITIAL_COMMENT_COUNT && (
              <Pressable 
                style={styles.viewMoreButton}
                onPress={() => setShowAllComments(!showAllComments)}
              >
                <Text style={styles.viewMoreText}>
                  {showAllComments ? 'Ver menos comentarios' : `Ver los ${COMENTARIOS_DATA.length - INITIAL_COMMENT_COUNT} comentarios restantes`}
                </Text>
                <Ionicons 
                  name={showAllComments ? "chevron-up" : "chevron-down"} 
                  size={16} 
                  color="#666" 
                />
              </Pressable>
            )}

            {COMENTARIOS_DATA.length === 0 && (
                <Text style={styles.noCommentsText}>
                    Sé el primero en opinar sobre esta obra.
                </Text>
            )}
          </View>

        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  // ... (Tus estilos anteriores se mantienen) ...
fullScreenContainer: { 
    flex: 1, 
    backgroundColor: 
    '#f0f4f8' },
scrollContent: { paddingBottom: 30 },
    image: { width: width, height: width * 0.8 },
    infoCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    marginTop: -30,    
    padding: 25,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
},
title: { 
    fontSize: 26, 
    fontWeight: '800', 
    color: '#2D2D2D', 
    marginBottom: 8 },
    row: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 5 },

category: { 
    fontSize: 16, 
    fontWeight: '700', 
    color: '#F79A2B', 
    marginLeft: 6, 
    textTransform: 'uppercase', 
    letterSpacing: 0.5 },

location: { 
    fontSize: 15, 
    color: '#999', 
    marginBottom: 20 },

sectionTitle: { 
    fontSize: 18, 
    fontWeight: '700', 
    marginBottom: 10, 
    marginTop: 10, 
    color: '#333' },

description: { 
    fontSize: 16, 
    color: '#555', 
    lineHeight: 26 },

rotarText: { 
    fontSize: 12, 
    color: '#999', 
    textAlign: 'center', 
    marginTop: 5 },

commentsSection: { 
    marginTop: 30, 
    borderTopWidth: 1, 
    borderTopColor: '#eee', 
    paddingTop: 20 },

commentsHeaderSection: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 15 },

commentCount: { 
    fontSize: 16, 
    color: '#888', 
    marginLeft: 5, 
    marginTop: 2 },

commentButton: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
    paddingVertical: 12, 
    paddingHorizontal: 20, 
    borderRadius: 12,
    borderWidth: 1, 
    borderColor: '#F79A2B', 
    backgroundColor: '#FFF5E5', 
    marginBottom: 20,
},
commentButtonText: { 
    marginLeft: 8, 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#F79A2B' },

noCommentsText: { 
    textAlign: 'center', 
    color: '#999', 
    fontStyle: 'italic', 
    fontSize: 14, 
    marginTop: 5 },

commentItem: { 
    marginBottom: 15, 
    paddingBottom: 15, 
    borderBottomWidth: 1, 
    borderBottomColor: '#f0f0f0' },

commentHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 8 },

avatarPlaceholder: { 
    width: 36, 
    height: 36, 
    borderRadius: 18, 
    backgroundColor: '#ddd', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 10 },

avatarText: { 
    fontWeight: 'bold', 
    color: '#666', 
    fontSize: 16 },

commentUser: { 
    fontWeight: '600', 
    fontSize: 14, 
    color: '#333' },

commentDate: { 
    fontSize: 12, 
    color: '#999' },

commentText: { 
    fontSize: 14, 
    color: '#444', 
    lineHeight: 20 },

  // --- ESTILOS NUEVOS PARA "VER MÁS" ---
viewMoreButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 5,
},
viewMoreText: {
    color: '#666',
    fontWeight: '600',
    marginRight: 5,
    fontSize: 14,
},sectionContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
});

export default MuseumDetailScreen;