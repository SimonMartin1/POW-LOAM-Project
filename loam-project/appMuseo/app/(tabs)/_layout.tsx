import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, Image, View } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

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



export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: '',
          title: 'index',
          headerShown: false,
          tabBarStyle: { display: 'none' },
          href: null
        }}/>
      <Tabs.Screen
        name="login"
        options={{
          tabBarLabel: '',
          title: 'login',
          headerShown: false,
          tabBarStyle: { display: 'none' },
          href: null
        }}/>
      <Tabs.Screen
        name="register"
        options={{
          tabBarLabel: '',
          title: 'register',
          headerShown: false,
          tabBarStyle: { display: 'none' },
          href: null
        }}/>
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: '',
          title: 'Inicio',
          headerTitle: () => <LogoTitle/>,
          tabBarIcon: ({ color }) => <Image
              source={require('@/assets/icons/home.png')} style={{ width: 28, height: 28, tintColor: color }}/>,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Image source={require('@/assets/icons/more_vert.png')} style={{ width: 28, height: 28}}/>
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="Escanear"
        options={{
          tabBarLabel: '',
          title: 'Escanear',
          tabBarIcon: ({ color }) => <Image
              source={require('@/assets/icons/qr_code_scanner.png')} style={{ width: 28, height: 28, tintColor: color }}/>,
        }}
      />
      
      <Tabs.Screen
        name="Perfil"
        options={{
          tabBarLabel: '',
          title: 'Perfil',
          tabBarIcon: ({ color }) => <Image
              source={require('@/assets/icons/profile.png')} style={{ width: 28, height: 28, tintColor: color }}/>,
        }}
      />
    </Tabs>
  );
}
