import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  ScrollView, 
  Pressable,
  Alert // Importamos Alert por si acaso
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import CustomSwitch from '@/components/CustomSwitch';
import { View, Text } from '@/components/Themed'; 
import { useSettings } from '@/context/SettingsContext';

// IMPORTANTE: Importa tu servicio aquí. 
// Asegúrate que la ruta sea correcta según tu estructura de carpetas.
import { BiometricService } from '@/services/biometricService'; 

const SettingsSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionBody}>
      {children}
    </View>
  </View>
);

type SwitchRowProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: boolean;
  onValueChange: (val: boolean) => void;
  isLast?: boolean; 
};

const SwitchRow = ({ icon, label, value, onValueChange, isLast }: SwitchRowProps) => {
  return (
    <View style={[styles.row, isLast && styles.lastRow]}>
      <View style={styles.rowLeft}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={20} color="#555" />
        </View>
        <Text style={styles.rowLabel}>{label}</Text>
      </View>
      
      <CustomSwitch 
        value={value} 
        onValueChange={onValueChange}
      />
    </View>
  );
};

// ... (LinkRow se mantiene igual) ...
type LinkRowProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  isLast?: boolean;
};

const LinkRow = ({ icon, label, onPress, isLast }: LinkRowProps) => {
  return (
    <Pressable 
      onPress={onPress}
      style={({ pressed }) => [
        styles.row, 
        isLast && styles.lastRow,
        pressed && styles.rowPressed
      ]}
    >
      <View style={styles.rowLeft}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={20} color="#555" />
        </View>
        <Text style={styles.rowLabel}>{label}</Text>
      </View>
      
      <Ionicons name="chevron-forward" size={20} color="#ccc" />
    </Pressable>
  );
};

export default function SettingsScreen() {

  // Estados locales (Idealmente esto vendría de tu SettingsContext para persistencia)
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  
  // Estado para la biometría
  const [biometricsEnabled, setBiometricsEnabled] = useState(false);

  /**
   * LÓGICA DE CONEXIÓN
   * Esta función maneja el intento de cambio del switch
   */
  const handleBiometricToggle = async (newValue: boolean) => {
    
    // CASO 1: El usuario quiere ACTIVAR la biometría
    if (newValue === true) {
      // A. Verificamos si el celular tiene sensor y huellas guardadas
      const canUse = await BiometricService.checkHardware();
      
      if (!canUse) {
        // El servicio ya muestra una alerta, así que solo detenemos el flujo
        // y nos aseguramos que el switch quede apagado
        setBiometricsEnabled(false);
        return;
      }

      // B. Pedimos al usuario que ponga su huella para confirmar que es él
      const success = await BiometricService.authenticate("Verifica tu identidad para activar");

      if (success) {
        setBiometricsEnabled(true);
        // AQUÍ DEBERÍAS GUARDAR EN ASYNCSTORAGE O CONTEXTO
        // ej: saveSettings({ useBiometrics: true });
      } else {
        // Si falla o cancela, el switch se queda apagado
        setBiometricsEnabled(false);
      }
    } 
    
    // CASO 2: El usuario quiere DESACTIVAR
    else {
      // Simplemente desactivamos (o podrías pedir huella para desactivar también)
      setBiometricsEnabled(false);
      // AQUÍ DEBERÍAS ACTUALIZAR ASYNCSTORAGE O CONTEXTO
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      <SettingsSection title="Preferencias">
        <SwitchRow 
          icon="moon" 
          label="Modo Oscuro" 
          value={isDarkMode} 
          onValueChange={setIsDarkMode} 
        />
        <SwitchRow 
          icon="notifications" 
          label="Notificaciones Push" 
          value={notificationsEnabled} 
          onValueChange={setNotificationsEnabled} 
        />
         <SwitchRow 
          icon="location" 
          label="Permitir Ubicación" 
          value={locationEnabled} 
          onValueChange={setLocationEnabled} 
          isLast
        />
      </SettingsSection>

      <SettingsSection title="Seguridad">
        {/* Aquí conectamos nuestra nueva función */}
        <SwitchRow 
          icon="finger-print" 
          label="Usar Biometría (Huella/FaceID)" 
          value={biometricsEnabled} 
          onValueChange={handleBiometricToggle} 
        />
        <LinkRow 
          icon="lock-closed" 
          label="Cambiar Contraseña" 
          onPress={() => console.log("Ir a cambiar pass")} 
          isLast
        />
      </SettingsSection>

      {/* ... Resto del código (Cuenta, Versión, Estilos) igual ... */}
      <SettingsSection title="Cuenta">
        <LinkRow 
          icon="person" 
          label="Editar Perfil" 
          onPress={() => router.push('/(tabs)/profile')} 
        />
        <LinkRow 
          icon="help-circle" 
          label="Ayuda y Soporte" 
          onPress={() => console.log("Ir a ayuda")} 
        />
         <LinkRow 
          icon="log-out" 
          label="Cerrar Sesión" 
          onPress={()=> router.push('/(tabs)')} 
          isLast
        />
      </SettingsSection>

      <Text style={styles.versionText}>Versión 1.0.0</Text>

    </ScrollView>
  );
}

// ... (Tus estilos styles se mantienen igual)
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
    marginLeft: 10,
    textTransform: 'uppercase',
  },
  sectionBody: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden', 
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0', 
    backgroundColor: '#fff',
  },
  lastRow: {
    borderBottomWidth: 0, 
  },
  rowPressed: {
    backgroundColor: '#f9f9f9',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 30,
    alignItems: 'center',
  },
  rowLabel: {
    fontSize: 16,
    color: '#333',
  },
  versionText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
    marginTop: 10,
  },
});