
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, useColorScheme, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';


const Input = ({placeHolder}: { placeHolder : String }) =>{

      const colorScheme = useColorScheme();    
      const theme = Colors[colorScheme ?? 'light'];
      
      const containerBackgroundColor = colorScheme === 'dark' ? '#0000002c' : '#f0f0f0';
      const iconColor = colorScheme === 'dark' ? '#888' : '#555';
      
    
    return( <View style={[styles.container, { backgroundColor: containerBackgroundColor }]}>
      
      <TextInput
        placeholder='Ingrese Nombre'
        placeholderTextColor={iconColor} 
        style={[styles.input, { color: theme.text }]}/>
    </View>);
}


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
    height: '100%'
  },
  clearButton: {
    marginLeft: 5,
  },
});

export default Input;