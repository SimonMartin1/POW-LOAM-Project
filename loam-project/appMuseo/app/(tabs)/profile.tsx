import React from 'react'; 
import {
   View, 
   Text,  
   StyleSheet, 
   ScrollView, 
   Pressable,
   ActivityIndicator,
   Alert,
   View as RNView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar'; 

import CustomSwitch from '@/components/CustomSwitch';
import { useSettings } from '@/context/SettingsContext';
import { useAuth } from '@/context/AuthContext';
import { BiometricService } from '@/services/biometricService'; 

// 1. DEFINICIÓN DE PALETAS DE COLORES
const Colors = {
  light: {
    background: '#f2f2f6',
    card: '#ffffff',
    text: '#000000',
    subText: '#8e8e93',
    border: '#c6c6c8',
    icon: '#000000',
    pressed: '#e5e5ea'
  },
  dark: {
    background: '#000000',
    card: '#1c1c1e',
    text: '#ffffff',
    subText: '#8e8e93',
    border: '#38383a',
    icon: '#ffffff',
    pressed: '#2c2c2e'
  }
};

// --- COMPONENTES AUXILIARES (Adaptados para recibir 'theme') ---

type Theme = typeof Colors.light;

const SettingsSection = ({ title, children, theme }: { title: string, children: React.ReactNode, theme: Theme }) => (
  <View style={styles.section}>
    <Text style={[styles.sectionTitle, { color: theme.subText }]}>{title}</Text>
    <View style={[styles.sectionBody, { backgroundColor: theme.card }]}>{children}</View>
  </View>
);

type LinkRowProps = { icon: any; label: string; onPress: () => void; isLast?: boolean; theme: Theme };
const LinkRow = ({ icon, label, onPress, isLast, theme }: LinkRowProps) => (
  <Pressable 
    onPress={onPress} 
    style={({ pressed }) => [
      styles.row, 
      { borderBottomColor: theme.border, backgroundColor: pressed ? theme.pressed : theme.card },
      isLast && styles.lastRow
    ]}
  >
    <View style={styles.rowLeft}>
      <Ionicons name={icon} size={20} color={theme.icon} />
      <Text style={[styles.rowLabel, { color: theme.text }]}>{label}</Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color={theme.subText} />
  </Pressable>
);

type SwitchRowProps = { icon: any; label: string; value: boolean; onValueChange: (val: boolean) => void; isLast?: boolean; theme: Theme };
const SwitchRow = ({ icon, label, value, onValueChange, isLast, theme }: SwitchRowProps) => (
  <View style={[styles.row, { borderBottomColor: theme.border, backgroundColor: theme.card }, isLast && styles.lastRow]}>
    <View style={styles.rowLeft}>
      <Ionicons name={icon} size={20} color={theme.icon} />
      <Text style={[styles.rowLabel, { color: theme.text }]}>{label}</Text>
    </View>
    <CustomSwitch value={value} onValueChange={onValueChange} />
  </View>
);

export default function SettingsScreen() {
  const {
    isDarkMode, notificationsEnabled, locationEnabled, biometricsEnabled, isLoading,
    toggleDarkMode, toggleNotifications, toggleLocation, toggleBiometrics
  } = useSettings();

  const { logout } = useAuth();

  // 2. SELECCIONAR TEMA ACTUAL
  const theme = isDarkMode ? Colors.dark : Colors.light;

  if (isLoading) {
    return (
      <RNView style={[styles.container, styles.centerContent, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={isDarkMode ? "#ffffff" : "#0a7ea4"} />
      </RNView>
    );
  }

  const handleLogout = () => {
    Alert.alert(
      "Cerrar Sesión",
      "¿Estás seguro que quieres salir?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Salir",
          style: "destructive",
          onPress: () => {
            logout();
            router.replace('/(tabs)');
          }
        }
      ]
    );
  };

  const handleBiometricToggle = async (newValue: boolean) => {
    if (newValue === true) {
      const canUse = await BiometricService.checkHardware();
      if (!canUse) return;
      const success = await BiometricService.authenticate("Verifica tu identidad para activar");
      if (success) toggleBiometrics(); 
    } else {
      toggleBiometrics();
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* StatusBar dinámico: Si es oscuro, letras claras (light), y viceversa */}
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />

      <ScrollView contentContainerStyle={styles.content}>

        <SettingsSection title="Preferencias" theme={theme}>
          <SwitchRow 
            icon="moon" 
            label="Modo Oscuro" 
            value={isDarkMode} 
            onValueChange={() => toggleDarkMode()} 
            theme={theme}
          />
          <SwitchRow 
            icon="notifications" 
            label="Notificaciones Push" 
            value={notificationsEnabled} 
            onValueChange={() => toggleNotifications()} 
            theme={theme}
          />
          <SwitchRow 
            icon="location" 
            label="Permitir Ubicación" 
            value={locationEnabled} 
            onValueChange={() => toggleLocation()} 
            isLast 
            theme={theme}
          />
        </SettingsSection>

        <SettingsSection title="Seguridad" theme={theme}>
          <SwitchRow 
            icon="finger-print" 
            label="Usar Biometría" 
            value={biometricsEnabled} 
            onValueChange={handleBiometricToggle} 
            theme={theme}
          />
          <LinkRow 
            icon="lock-closed" 
            label="Cambiar Contraseña" 
            onPress={() => console.log("Ir a cambiar pass")} 
            isLast 
            theme={theme}
          />
        </SettingsSection>

        <SettingsSection title="Cuenta" theme={theme}>
          <LinkRow 
            icon="person" 
            label="Editar Perfil" 
            onPress={() => console.log("Editar")} 
            theme={theme}
          />
          <LinkRow 
            icon="help-circle" 
            label="Ayuda y Soporte" 
            onPress={() => console.log("Ayuda")} 
            theme={theme}
          />
          <LinkRow 
            icon="log-out" 
            label="Cerrar Sesión" 
            onPress={handleLogout} 
            isLast
            theme={theme}
          />
        </SettingsSection>

        <Text style={[styles.versionText, { color: theme.subText }]}>Versión 1.0.0</Text>

      </ScrollView>
    </View>
  );
}

// Estilos SOLO de estructura (padding, margin, flex). 
// Los colores se manejan arriba vía 'theme'.
const styles = StyleSheet.create({
  container: { 
    flex: 1 
  },
  centerContent: { 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  content: { 
    padding: 16, 
    paddingBottom: 40 
  },
  section: { 
    marginBottom: 25 
  },
  sectionTitle: { 
    fontSize: 14, 
    fontWeight: '600', 
    marginBottom: 8, 
    marginLeft: 10, 
    textTransform: 'uppercase' 
  },
  sectionBody: { 
    borderRadius: 12, 
    overflow: 'hidden' 
  },
  row: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingVertical: 12, 
    paddingHorizontal: 16, 
    borderBottomWidth: 1 // El color del borde se inyecta dinámicamente
  },
  lastRow: { 
    borderBottomWidth: 0 
  },
  rowLeft: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 12 
  },
  rowLabel: { 
    fontSize: 16 
  },
  versionText: { 
    textAlign: 'center', 
    fontSize: 12, 
    marginTop: 10 
  },
});