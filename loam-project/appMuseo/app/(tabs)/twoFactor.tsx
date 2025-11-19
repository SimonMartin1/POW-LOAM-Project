import React, { useState } from 'react';
import { StyleSheet, Image, Pressable, Alert, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Input from '@/components/input';
import Colors from '@/constants/Colors';
import { Text, View } from '@/components/Themed';
import { useAuth } from '@/context/AuthContext';

export default function TwoFactor() {
  const router = useRouter();
  
  // 1. Capturamos el ID temporal del usuario que viene de la pantalla anterior
  const params = useLocalSearchParams();
  const userId = params.userId ? Number(params.userId) : null;

  const { verifyOtp, isLoading } = useAuth();
  const currentColors = Colors.light;
  
  const [code, setCode] = useState('');

  const handleVerify = async () => {
    if (!code || code.length < 6) {
      Alert.alert('Código incompleto', 'Por favor ingrese el código de 6 dígitos.');
      return;
    }

    if (!userId) {
      Alert.alert('Error', 'No se encontró el ID de usuario. Vuelva a iniciar sesión.');
      router.replace('/'); // Volver al login
      return;
    }

    try {
      // 2. Llamamos a la función del Contexto
      await verifyOtp(userId, code);
      
      // 3. Si no hay error, vamos al Home
      router.replace('/home');
    } catch (error: any) {
      Alert.alert('Código Incorrecto', 'El código ingresado no es válido o ha expirado.');
      setCode(''); // Limpiamos el input para reintentar
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: currentColors.background }]}>
      
      <Image 
        source={require('@/assets/images/icon.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={[styles.title, { color: currentColors.text }]}>
        Verificación de Dos Pasos
      </Text>
      
      <Text style={[styles.subtitle, { color: currentColors.text }]}>
        Ingrese el código de 6 dígitos de su aplicación autenticadora.
      </Text>

      {/* Reutilizamos tu componente Input modificado */}
      <Input
        placeHolder={'000 000'}
        value={code}
        onChangeText={setCode}
        keyboardType="number-pad" // Teclado numérico
        maxLength={6} // Limitar a 6 caracteres
        style={{ textAlign: 'center', letterSpacing: 5, fontSize: 20 }} // Estilo para que parezca un código
      />

      <Pressable 
        style={[styles.button, isLoading && styles.buttonDisabled]} 
        onPress={handleVerify}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#4B2A00" />
        ) : (
          <Text style={styles.buttonText}>Verificar Código</Text>
        )}
      </Pressable>

      {/* Opción para volver atrás si se equivocó de cuenta */}
      <Pressable onPress={() => router.back()} style={{ marginTop: 20 }}>
         <Text style={{ color: '#F79A2B', fontWeight: '600' }}>Volver al Login</Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 150, // Un poco más pequeño que en el login principal
    height: 100, 
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    opacity: 0.8,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#F79A2B', 
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 25,
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#4B2A00', 
    fontSize: 16,
    fontWeight: '700',
  },
});