import React from 'react';
import { Image } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { DrawerToggleButton } from '@react-navigation/drawer';
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
    <AuthProvider> 
      <Drawer
        screenOptions={{
          drawerPosition: 'right',
          headerShown: useClientOnlyValue(false, true),
          headerRight: () => <DrawerToggleButton />,
          headerLeft: () => null, 
          swipeEnabled: false, 
        }}>
        
        <Drawer.Screen
          name="index"
          options={{
            title: 'index',
            drawerItemStyle: { display: 'none' },
            headerShown: useClientOnlyValue(true, false),
            headerRight: () => null,
          }}/>
        
        <Drawer.Screen
          name="login"
          options={{
            title: 'login',
            drawerItemStyle: { display: 'none' },
            headerShown: useClientOnlyValue(true, false),
            headerRight: () => null,
            swipeEnabled: false, // Recomendado: No permitir abrir menú en login
          }}/>
          
        <Drawer.Screen
          name="twoFactor"
          options={{
            title: '2FA',
            drawerItemStyle: { display: 'none' },
            headerShown: useClientOnlyValue(true, false),
            headerRight: () => null,
            swipeEnabled: false, // Recomendado: No permitir abrir menú en 2FA
          }}/>

        <Drawer.Screen
          name="register"
          options={{
            title: 'register',
            drawerItemStyle: { display: 'none' },
            headerShown: useClientOnlyValue(true, false),
            headerRight: () => null,
            swipeEnabled: false,
          }}/>

        <Drawer.Screen
          name="home"
          options={{
            title: 'Inicio',
            headerTitle: () => <LogoTitle/>,
            swipeEnabled: true, // Habilitamos el gesto aquí
            drawerIcon: ({ color }) => <Image
                source={require('@/assets/icons/home.png')} style={{ width: 28, height: 28, tintColor: color }}/>,
          }}
        />
        <Drawer.Screen
          name="gallery"
          options={{
            title: 'Galeria',
            headerTitle: () => <LogoTitle/>,
            swipeEnabled: true,
            drawerIcon: ({ color }) => <Image
                source={require('@/assets/icons/gallery.png')} style={{ width: 28, height: 28, tintColor: color }}/>,
          }}
        />
        <Drawer.Screen
          name="qr_scan"
          options={{
            title: 'Escanear',
            swipeEnabled: true,
            drawerIcon: ({ color }) => <Image
                source={require('@/assets/icons/qr_code_scanner.png')} style={{ width: 28, height: 28, tintColor: color }}/>,
          }}
        />
        <Drawer.Screen
          name="news"
          options={{
            title: 'Noticias',
            headerTitle: () => <LogoTitle/>,
            swipeEnabled: true,
            drawerIcon: ({ color }) => <Image
                source={require('@/assets/icons/news.png')} style={{ width: 28, height: 28, tintColor: color }}/>,
          }}
        />
        <Drawer.Screen
          name="profile"
          options={{
            title: 'Configuracion',
            swipeEnabled: true,
            drawerIcon: ({ color }) => <Image
                source={require('@/assets/icons/profile.png')} style={{ width: 28, height: 28, tintColor: color }}/>,
          }}
        />
      </Drawer>
    </AuthProvider> 
  );
}