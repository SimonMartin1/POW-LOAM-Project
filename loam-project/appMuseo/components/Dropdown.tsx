import React, { useState } from 'react';
import { 
  StyleSheet, 
  Pressable, 
  Modal, 
  FlatList, 
  TouchableOpacity 
} from 'react-native';
import { View, Text } from '@/components/Themed'; 
import { FontAwesome } from '@expo/vector-icons';

export type DropdownOption = {
  label: string;
  value: string;
};

type DropdownProps = {
  label?: string;          
  placeholder?: string;    
  data: DropdownOption[];  
  selected: DropdownOption | null; 
  onSelect: (item: DropdownOption) => void; 
};

const Dropdown = ({ label, placeholder = "Seleccionar...", data, selected, onSelect }: DropdownProps) => {
  const [visible, setVisible] = useState(false);
  const [dropdownTop, setDropdownTop] = useState(0);

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
      
      <Pressable style={styles.button} onPress={toggleDropdown}>
        <Text style={[styles.buttonText, !selected && styles.placeholderText]}>
          {selected ? selected.label : placeholder}
        </Text>
        <FontAwesome name={visible ? "chevron-up" : "chevron-down"} size={14} color="#666" />
      </Pressable>

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
    borderRadius: 10,     
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ccc',
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
    backgroundColor: 'rgba(0,0,0,0.5)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    backgroundColor: '#fff',
    width: '80%',
    maxHeight: 300, 
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