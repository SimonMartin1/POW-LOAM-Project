import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Pressable, 
  Modal, 
  FlatList, 
  TouchableOpacity 
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // O Ionicons, lo que prefieras

// Definimos el tipo para las opciones
export type DropdownOption = {
  label: string;
  value: string;
};

type DropdownProps = {
  label?: string;          // Etiqueta opcional encima del dropdown
  placeholder?: string;    // Texto cuando no hay nada seleccionado
  data: DropdownOption[];  // Lista de opciones
  selected: DropdownOption | null; // Opción actualmente seleccionada
  onSelect: (item: DropdownOption) => void; // Función al seleccionar
};

const Dropdown = ({ label, placeholder = "Seleccionar...", data, selected, onSelect }: DropdownProps) => {
  const [visible, setVisible] = useState(false);
  const [dropdownTop, setDropdownTop] = useState(0); // Para posicionar el menú (avanzado) - Simplificado aquí usamos Modal centrado o inferior

  const toggleDropdown = () => {
    setVisible(!visible);
  };

  const handleSelect = (item: DropdownOption) => {
    onSelect(item);
    setVisible(false);
  };

  const renderOption = ({ item }: { item: DropdownOption }) => (
    <TouchableOpacity 
      style={styles.optionItem} 
      onPress={() => handleSelect(item)}
    >
      <Text style={styles.optionText}>{item.label}</Text>
      {selected?.value === item.value && (
        <FontAwesome name="check" size={16} color="green" />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      {/* 1. El Botón que abre el menú */}
      <Pressable style={styles.button} onPress={toggleDropdown}>
        <Text style={[styles.buttonText, !selected && styles.placeholderText]}>
          {selected ? selected.label : placeholder}
        </Text>
        <FontAwesome name={visible ? "chevron-up" : "chevron-down"} size={14} color="#666" />
      </Pressable>

      {/* 2. El Modal que muestra la lista */}
      <Modal visible={visible} transparent animationType="fade">
        <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
          <View style={styles.dropdown}>
            <FlatList
              data={data}
              renderItem={renderOption}
              keyExtractor={(item) => item.value}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
    marginLeft: 5,

  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    height: 50,
    borderRadius: 10,     // Mismo radio que tus Inputs
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    // Sombra opcional para darle profundidad
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
  },
  placeholderText: {
    color: '#999',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // Fondo oscuro transparente
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    backgroundColor: '#fff',
    width: '80%',
    maxHeight: 300, // Altura máxima antes de hacer scroll
    borderRadius: 10,
    paddingVertical: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
});

export default Dropdown;