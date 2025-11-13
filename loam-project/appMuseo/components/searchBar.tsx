
// En: components/SearchBar.tsx

import React, { useState } from 'react';
import { View, TextInput, StyleSheet, useColorScheme, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';


type SearchBarProps = {
  onSearch?: (query: string) => void;
};

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const colorScheme = useColorScheme();

  const theme = Colors[colorScheme ?? 'light'];
  
  
  const containerBackgroundColor = colorScheme === 'dark' ? '#1e1e1e' : '#f0f0f0';
  const iconColor = colorScheme === 'dark' ? '#888' : '#555';
  
  const handleClear = () => {
    setSearchQuery('');
    if (onSearch) {
      onSearch('');
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
        placeholder="Buscar fosil, seccion, categoría..."
        placeholderTextColor={iconColor} 
        style={[styles.input, { color: theme.text }]}
        value={searchQuery}
        onChangeText={setSearchQuery}
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
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginVertical: 10,
    marginHorizontal: 15,
    height: 45,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1, 
    fontSize: 16,
    height: '100%',
  },
  clearButton: {
    marginLeft: 5,
  },
});

export default SearchBar;