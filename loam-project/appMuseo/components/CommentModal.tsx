import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TextInput, 
  Pressable, 
  KeyboardAvoidingView, 
  Platform,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type CommentModalProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (text: string) => void;
  isSubmitting?: boolean; // Para mostrar spinner mientras "envía"
};

const CommentModal = ({ visible, onClose, onSubmit, isSubmitting = false }: CommentModalProps) => {
  const [commentText, setCommentText] = useState('');
  const MAX_CHARS = 250; // Requisito del TP

  const handleSubmit = () => {
    if (commentText.trim().length > 0) {
      onSubmit(commentText);
      setCommentText(''); // Limpiar el campo
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      {/* Fondo oscuro semitransparente */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.centeredView}
      >
        <View style={styles.modalView}>
          
          {/* Cabecera del Modal */}
          <View style={styles.header}>
            <Text style={styles.modalTitle}>Tu Opinión</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#666" />
            </Pressable>
          </View>

          <Text style={styles.label}>¿Qué te pareció esta obra?</Text>

          {/* Área de Texto */}
          <TextInput
            style={styles.input}
            placeholder="Escribe tu comentario aquí..."
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
            maxLength={MAX_CHARS}
            value={commentText}
            onChangeText={setCommentText}
            editable={!isSubmitting}
          />

          {/* Contador de Caracteres */}
          <Text style={styles.counter}>
            {commentText.length}/{MAX_CHARS}
          </Text>

          {/* Botón de Enviar */}
          <Pressable
            style={[
              styles.submitButton, 
              (!commentText.trim() || isSubmitting) && styles.buttonDisabled
            ]}
            onPress={handleSubmit}
            disabled={!commentText.trim() || isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.textStyle}>Enviar Comentario</Text>
            )}
          </Pressable>

          {/* Nota sobre moderación (Requisito del TP) */}
          <Text style={styles.moderationNote}>
            Nota: Tu comentario pasará por moderación antes de ser publicado.
          </Text>

        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end', // Aparece desde abajo
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 5,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 15,
    height: 120,
    textAlignVertical: 'top', // Para que el texto empiece arriba en Android
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  counter: {
    textAlign: 'right',
    color: '#999',
    fontSize: 12,
    marginTop: 5,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#F79A2B',
    borderRadius: 12,
    padding: 15,
    elevation: 2,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  moderationNote: {
    marginTop: 15,
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default CommentModal;