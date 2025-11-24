import React from 'react';
import { Image } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons'; // Importamos Ionicons para el nuevo botón
import { useThemeColor } from '@/components/Themed'; 
// Componentes y Hooks
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// Contextos
import { AuthProvider, useAuth } from '@/context/AuthContext'; 
import { SettingsProvider } from '@/context/SettingsContext';

// --- LOGO AUXILIAR ---
function LogoTitle() {
  return (
    <Image
      style={{ width: 110, height: 70 }} 
      resizeMode="contain" 
      source={require('@/assets/images/icon.png')} 
    />
  );
}

// --- PARTE 1: EL NAVEGADOR ---
function DrawerNavigator() {
  const { user } = useAuth(); 

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          drawerPosition: 'right',
          headerShown: useClientOnlyValue(false, true),
          headerRight: () => <DrawerToggleButton />,
          headerLeft: () => null, 
          drawerActiveTintColor: '#F79A2B', 
          drawerActiveBackgroundColor: '#FFF3E0', 
        }}>
        
        {/* --- PANTALLAS OCULTAS SIEMPRE --- */}
        <Drawer.Screen
          name="index"
          options={{
            title: 'Bienvenida',
            drawerItemStyle: { display: 'none' }, 
            headerShown: false,
            swipeEnabled: false,
          }}/>
        
        <Drawer.Screen
          name="login"
          redirect={user !== null} 
          options={{
            title: 'Ingresar',
            drawerItemStyle: { display: 'none' }, // Mantenemos login oculto del menú (acceden desde Register si quieren)
            headerShown: false,
            swipeEnabled: false, 
          }}/>
          
        <Drawer.Screen
          name="twoFactor"
          options={{
            title: 'Verificación 2FA',
            drawerItemStyle: { display: 'none' },
            headerShown: false,
            swipeEnabled: false,
          }}/>

        {/* --- PANTALLAS VISIBLES --- */}

        <Drawer.Screen
          name="home"
          options={{
            title: 'Inicio',
            headerTitle: () => <LogoTitle/>,
            swipeEnabled: true,
            drawerIcon: ({ color }) => (
              <Image source={require('@/assets/icons/home.png')} style={{ width: 24, height: 24, tintColor: color }}/>
            ),
          }}
        />
        
        <Drawer.Screen
          name="news"
          options={{
            title: 'Noticias',
            headerTitle: () => <LogoTitle/>,
            swipeEnabled: true,
            drawerIcon: ({ color }) => (
              <Image source={require('@/assets/icons/news.png')} style={{ width: 24, height: 24, tintColor: color }}/>
            ),
          }}
        />

        <Drawer.Screen
          name="gallery"
          options={{
            title: 'Galería',
            headerTitle: () => <LogoTitle/>,
            swipeEnabled: true,
            drawerIcon: ({ color }) => (
              <Image source={require('@/assets/icons/gallery.png')} style={{ width: 24, height: 24, tintColor: color }}/>
            ),
          }}
        />
        
        <Drawer.Screen
          name="qr_scan"
          options={{
            title: 'Escanear QR',
            headerTitle: () => <LogoTitle/>,
            swipeEnabled: true,
            drawerIcon: ({ color }) => (
              <Image source={require('@/assets/icons/qr_code_scanner.png')} style={{ width: 24, height: 24, tintColor: color }}/>
            ),
          }}
        />
        
        {/* --- PANTALLAS CONDICIONALES (Login vs Perfil) --- */}

        {/* 1. Opción para NO Logueados: Redirige a Register */}
        <Drawer.Screen
          name="register"
          options={{
            title: 'Iniciar Sesión', // Texto solicitado (redirecciona a register)
            headerShown: false,
            swipeEnabled: false,
            // LOGICA: Si hay usuario, OCULTAR. Si no hay usuario, MOSTRAR.
            drawerItemStyle: user ? { display: 'none' } : undefined,
            drawerIcon: ({ color, size }) => (
              // Usamos Ionicons 'log-in' para que sea claro
              <Ionicons name="log-in-outline" size={24} color={color} />
            ),
          }}/>

        {/* 2. Opción para Logueados: Perfil/Configuración */}
        <Drawer.Screen
          name="profile"
          redirect={!user} 
          options={{
            title: 'Configuración',
            headerTitle: () => <LogoTitle/>,
            swipeEnabled: true,
            // LOGICA: Si NO hay usuario, OCULTAR. Si hay, MOSTRAR.
            drawerItemStyle: !user ? { display: 'none' } : undefined,
            drawerIcon: ({ color }) => (
              <Image source={require('@/assets/icons/profile.png')} style={{ width: 24, height: 24, tintColor: color }}/>
            ),
          }}
        />

      </Drawer>
    </GestureHandlerRootView>
  );
}

// --- PARTE 2: EL LAYOUT PRINCIPAL ---
export default function Layout() {
  return (
    <AuthProvider>
      <SettingsProvider> 
        <DrawerNavigator />
      </SettingsProvider> 
    </AuthProvider> 
  );
}