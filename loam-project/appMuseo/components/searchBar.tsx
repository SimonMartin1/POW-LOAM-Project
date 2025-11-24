
// En: components/SearchBar.tsx

import React, { useState } from 'react';
import { TextInput, StyleSheet, useColorScheme, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { View, Text } from '@/components/Themed'; 

type SearchBarProps = {
  onSearch?: (query: string) => void; // Para "Enter"
  onChangeQuery?: (query: string) => void; // Para "mientras escribe"
};

const SearchBar = ({ onSearch, onChangeQuery }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const colorScheme = useColorScheme();

  const theme = Colors[colorScheme ?? 'light'];
  
  const containerBackgroundColor = colorScheme === 'dark' ? '#ffffffff' : '#f0f0f0';
  const iconColor = colorScheme === 'dark' ? '#888' : '#555';
  
  const handleClear = () => {
    setSearchQuery('');
    if (onSearch) {
      onSearch('');
    }
  };

  const handleTextChange = (text: string) => {
    setSearchQuery(text); // Actualiza el estado local
    if (onChangeQuery) {
      onChangeQuery(text);
    }
  };


  return (
    <View style={[styles.container, { backgroundColor: containerBackgroundColor }]}>
      
      <Ionicons 
        name="search" 
        size={20} 
        color={iconColor} 
        style={styles.icon} 
      />
      
      <TextInput
        placeholder="Buscar"
        placeholderTextColor={iconColor}
        style={[styles.input, { color: Colors.light.text }]}
        value={searchQuery}
        onChangeText={(text) => {
          setSearchQuery(text);
          onSearch?.(text); 
        }}
        onSubmitEditing={() => onSearch && onSearch(searchQuery)}
      />

      {searchQuery.length > 0 && (
        <Pressable onPress={handleClear} style={styles.clearButton}>
          <Ionicons name="close-circle" size={20} color={iconColor} />
        </Pressable>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginVertical: 10,
    height: '100%',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    outlineWidth: 0,
    flex: 1, 
    fontSize: 16,
    height: '100%',
  },
  clearButton: {
    marginLeft: 5,
  },
});

export default SearchBar;