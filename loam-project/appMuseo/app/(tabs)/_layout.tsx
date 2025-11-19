import React from 'react';
import { Image } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { DrawerToggleButton } from '@react-navigation/drawer';
// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

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
    <Drawer
      screenOptions={{
        drawerPosition: 'right',
        headerShown: useClientOnlyValue(false, true),
        headerRight: () => <DrawerToggleButton />,
        headerLeft: () => null, 
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
        }}/>
      <Drawer.Screen
        name="register"
        options={{
          title: 'register',
          drawerItemStyle: { display: 'none' },
          headerShown: useClientOnlyValue(true, false),
          headerRight: () => null,
        }}/>
      <Drawer.Screen
        name="home"
        options={{
          title: 'Inicio',
          headerTitle: () => <LogoTitle/>,
          drawerIcon: ({ color }) => <Image
              source={require('@/assets/icons/home.png')} style={{ width: 28, height: 28, tintColor: color }}/>,
        }}
      />
      <Drawer.Screen
        name="gallery"
        options={{
          title: 'Galeria',
          headerTitle: () => <LogoTitle/>,
          drawerIcon: ({ color }) => <Image
              source={require('@/assets/icons/gallery.png')} style={{ width: 28, height: 28, tintColor: color }}/>,
        }}
      />
      <Drawer.Screen
        name="qr_scan"
        options={{
          title: 'Escanear',
          drawerIcon: ({ color }) => <Image
              source={require('@/assets/icons/qr_code_scanner.png')} style={{ width: 28, height: 28, tintColor: color }}/>,
        }}
      />
      <Drawer.Screen
        name="news"
        options={{
          title: 'Noticias',
          headerTitle: () => <LogoTitle/>,
          drawerIcon: ({ color }) => <Image
              source={require('@/assets/icons/news.png')} style={{ width: 28, height: 28, tintColor: color }}/>,
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          title: 'Perfil',
          drawerIcon: ({ color }) => <Image
              source={require('@/assets/icons/profile.png')} style={{ width: 28, height: 28, tintColor: color }}/>,
        }}
      />
    </Drawer>
  );
}
