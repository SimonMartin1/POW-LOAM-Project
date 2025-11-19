import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// 1. Definimos los tipos para nuestros datos
type SettingItemData = {
  icon: keyof typeof Ionicons.glyphMap; // Asegura que el nombre del icono sea válido
  label: string;
  route?: string; // Opcional: para navegar
  onPress?: () => void;
};

// 2. Componente para una sola fila (Row)
const SettingsItem = ({ icon, label, onPress }: SettingItemData) => {
  return (
    <Pressable 
      style={({ pressed }) => [styles.itemContainer, pressed && styles.pressed]} 
      onPress={onPress}
    >
      <View style={styles.leftContent}>
        {/* Icono Izquierdo */}
        <Ionicons name={icon} size={22} color="#2E2E5D" style={styles.icon} />
        
        {/* Texto */}
        <Text style={styles.label}>{label}</Text>
      </View>

      {/* Icono Flecha Derecha */}
      <Ionicons name="chevron-forward" size={20} color="#2E2E5D" />
    </Pressable>
  );
};

// 3. El Componente Principal de la Lista
const SettingsMenu = () => {
  
  const handlePress = (label: string) => {
    console.log(`Presionado: ${label}`);
    // Aquí agregarías tu lógica de navegación (router.push...)
  };

  return (
    <View style={styles.cardContainer}>
      
      <SettingsItem 
        icon="person" 
        label="Personal" 
        onPress={() => handlePress('Personal')} 
      />
      
      <SettingsItem 
        icon="options" 
        label="General" 
        onPress={() => handlePress('General')} 
      />
      
      <SettingsItem 
        icon="notifications" 
        label="Notification" 
        onPress={() => handlePress('Notification')} 
      />

      <SettingsItem 
        icon="help-circle" 
        label="Help" 
        onPress={() => handlePress('Help')} 
      />

    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginHorizontal: 20, // Margen exterior
    marginVertical: 10,
    
    // Sombra suave (estilo iOS)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    // Sombra suave (estilo Android)
    elevation: 3,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 15,
  },
  pressed: {
    backgroundColor: '#f5f5f5', // Efecto visual al tocar
    borderRadius: 10,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 15,
    width: 24, // Ancho fijo para que el texto se alinee perfectamente
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2E2E5D', // El color azul oscuro de tu imagen
  },
});

export default SettingsMenu;