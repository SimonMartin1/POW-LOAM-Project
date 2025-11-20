import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, Href } from 'expo-router';

// 1. Definimos los tipos
type SettingItemData = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  route?: Href; // Opcional: Puede ser una ruta
  onPress?: () => void; // Opcional: Puede ser una función
  isLast?: boolean;
};

// 2. El Componente Inteligente
const SettingsItem = ({ icon, label, route, onPress, isLast }: SettingItemData) => {
  
  // Este es el contenido visual (Icono + Texto + Flecha)
  const Content = (
    <Pressable 
      style={({ pressed }) => [
        styles.itemContainer, 
        isLast && styles.lastItem, // Quita el borde si es el último
        pressed && styles.pressed
      ]}
      // Si NO hay ruta, usamos el onPress aquí. Si HAY ruta, el Link maneja el toque.
      onPress={!route ? onPress : undefined} 
    >
      <View style={styles.leftContent}>
        <Ionicons name={icon} size={22} color="#f8a932ff" style={styles.icon} />
        <Text style={styles.label}>{label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#f8a932ff" />
    </Pressable>
  );


  if (route) {
    return (
      <Link href={route} asChild >
        {Content}
      </Link>
    );
  }

  return Content;
};

// 3. El Menú Completo
const SettingsMenu = () => {
  
  const handleLogout = () => {
    console.log("Cerrando sesión...");
  };

  return (
    <View style={styles.cardContainer}>
    
      <SettingsItem 
        icon="person-outline" 
        label="Personal" 
        route="/settingsProfile" 
      />
      
      <SettingsItem 
        icon="notifications-outline" 
        label="Notificaciones" 
        route="/settingsGeneral" 
      />
      
      <SettingsItem 
        icon="help-circle-outline" 
        label="Ayuda" 
        route="/settingsHelp" 
      />

      <SettingsItem 
        icon="log-out-outline" 
        label="Cerrar Sesión"
        route="/(tabs)"
        isLast
      />

    </View>
  );
};

const styles = StyleSheet.create({
    cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 20,
    marginVertical: 10,
    // Sombras
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  itemContainer: {
    flexDirection: 'row', // Alineación horizontal
    alignItems: 'center', // Centrado vertical
    justifyContent: 'space-between', // Separación máxima
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  pressed: {
    backgroundColor: '#fff8e1',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  icon: {
    width: 24,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
});

export default SettingsMenu;