import React from 'react';
import { Image, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Importante para el Drawer
import { Drawer } from 'expo-router/drawer';
import { DrawerToggleButton } from '@react-navigation/drawer';

// Componentes y Hooks
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// Contexto de Autenticación
import { AuthProvider } from '@/context/AuthContext'; 

function LogoTitle() {
  return (
    <Image
      style={{ width: 110, height: 70 }} 
      resizeMode="contain" 
      source={require('@/assets/images/icon.png')} 
    />
  );
}

export default function Layout() {
  const colorScheme = useColorScheme();

  return (
    // 1. AuthProvider: Provee la lógica de login a toda la app
    <AuthProvider>
      {/* 2. GestureHandler: Necesario para que el menú deslice bien */}
      <GestureHandlerRootView style={{ flex: 1 }}>
        
        <Drawer
          screenOptions={{
            drawerPosition: 'right',
            headerShown: useClientOnlyValue(false, true),
            headerRight: () => <DrawerToggleButton />,
            headerLeft: () => null, 
            drawerActiveTintColor: '#F79A2B', // Color naranja activo (opcional, para que combine)
            drawerActiveBackgroundColor: '#FFF3E0', // Fondo suave al seleccionar
          }}>
          
          {/* --- PANTALLAS OCULTAS DEL MENÚ (Login, Registro, etc) --- */}
          
          <Drawer.Screen
            name="index" // Pantalla de Bienvenida
            options={{
              title: 'Bienvenida',
              drawerItemStyle: { display: 'none' }, // Oculto del menú
              headerShown: false,
              swipeEnabled: false,
            }}/>
          
          <Drawer.Screen
            name="login"
            options={{
              title: 'Iniciar Sesión',
              drawerItemStyle: { display: 'none' },
              headerShown: false,
              swipeEnabled: false, // No abrir menú en login
            }}/>
            
          <Drawer.Screen
            name="twoFactor"
            options={{
              title: 'Verificación 2FA',
              drawerItemStyle: { display: 'none' },
              headerShown: false,
              swipeEnabled: false,
            }}/>

          <Drawer.Screen
            name="register"
            options={{
              title: 'Registro',
              drawerItemStyle: { display: 'none' },
              headerShown: false,
              swipeEnabled: false,
            }}/>

          {/* --- PANTALLAS VISIBLES EN EL MENÚ --- */}

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
          
          <Drawer.Screen
            name="profile"
            options={{
              title: 'Configuración',
              headerTitle: () => <LogoTitle/>,
              swipeEnabled: true,
              drawerIcon: ({ color }) => (
                <Image source={require('@/assets/icons/profile.png')} style={{ width: 24, height: 24, tintColor: color }}/>
              ),
            }}
          />

        </Drawer>
      </GestureHandlerRootView>
    </AuthProvider> 
  );
}