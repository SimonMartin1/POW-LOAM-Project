import React from 'react';
import { TextInput, StyleSheet, useColorScheme, TextInputProps, ViewStyle } from 'react-native';
import Colors from '@/constants/Colors';
import { View, Text } from '@/components/Themed'; 
interface InputProps extends TextInputProps {
  placeHolder?: string;
  // Agregamos esta prop para poder mover el contenedor gris desde fuera
  containerStyle?: ViewStyle; 
}

const Input = ({ placeHolder, style, containerStyle, ...props }: InputProps) => {
    const colorScheme = useColorScheme();    
    const theme = Colors[colorScheme ?? 'light'];
    
    const containerBackgroundColor = colorScheme === 'dark' ? '#0000002c' : '#e0e0e0'; // Un gris un poco más oscuro para contraste
    const iconColor = colorScheme === 'dark' ? '#888' : '#555';
      
    return( 
      <View style={[
          styles.container, 
          { backgroundColor: containerBackgroundColor },
          containerStyle // <--- AQUÍ APLICAMOS EL ESTILO EXTERNO AL CONTENEDOR
      ]}>
        <TextInput
          placeholder={placeHolder}
          placeholderTextColor={iconColor} 
          style={[styles.input, { color: theme.text }, style]} 
          {...props} 
        />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10, // Bordes redondeados modernos
    paddingHorizontal: 15,
    marginVertical: 10,
    width: '100%', // Asegura que ocupe todo el ancho disponible
    height: 50,    // Un poco más alto para mejor tacto
  },
  input: {
    flex: 1, 
    fontSize: 16,
    height: '100%'
  },
});

export default Input;