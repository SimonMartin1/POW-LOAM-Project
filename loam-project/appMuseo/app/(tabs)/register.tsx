import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Alert, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter, Link } from 'expo-router';
import Input from '@/components/input';
import Colors from '@/constants/Colors';
import { useAuth } from '@/context/AuthContext';

export default function Register() {
  const router = useRouter();
  const { register, isLoading } = useAuth(); // Traemos la función del contexto
  const currentColors = Colors.light;

  // Estados para el formulario
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    // 1. Validaciones básicas
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Campos vacíos', 'Por favor completa todos los datos.');
      return;
    }

    if (password.length < 8) {
      Alert.alert('Seguridad', 'La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    // 2. Llamada al Backend
    try {
      await register(name, email, password);
      Alert.alert('¡Bienvenido!', 'Tu cuenta ha sido creada.');
      router.replace('/home'); // Redirige al Home tras registro exitoso
    } catch (error: any) {
      const msg = error.message || 'No se pudo crear la cuenta';
      Alert.alert('Error', msg);
    }
  };

  return (
    // KeyboardAvoidingView ayuda a que el teclado no tape los inputs
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={[styles.scrollContainer, { backgroundColor: currentColors.background }]}>
        
        <Image 
          source={require('@/assets/images/icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        
        <Text style={[styles.title, { color: currentColors.text }]}>
          Crear Cuenta
        </Text>
        <Text style={[styles.subtitle, { color: currentColors.text }]}>
          Únete al Museo de Ciencias
        </Text>

        {/* CAMPO: NOMBRE */}
        <View style={styles.inputContainer}>
            <Text style={styles.label}>Nombre Completo</Text>
            <Input
            placeHolder={'Ej: Juan Perez'}
            value={name}
            onChangeText={setName}
            />
        </View>

        {/* CAMPO: EMAIL */}
        <View style={styles.inputContainer}>
            <Text style={styles.label}>Correo Electrónico</Text>
            <Input
            placeHolder={'Ej: correo@email.com'}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            />
        </View>

        {/* CAMPO: CONTRASEÑA */}
        <View style={styles.inputContainer}>
            <Text style={styles.label}>Contraseña</Text>
            <Input
            placeHolder={'Mínimo 8 caracteres'}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            />
        </View>

        {/* BOTÓN DE REGISTRO */}
        <Pressable 
          style={({ pressed }) => [
            styles.button, 
            pressed && { opacity: 0.8 } // Efecto visual al presionar
          ]} 
          onPress={handleRegister}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#4B2A00" />
          ) : (
            <Text style={styles.buttonText}>REGISTRARME</Text>
          )}
        </Pressable>

        {/* LINK PARA IR AL LOGIN */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>¿Ya tienes cuenta? </Text>
          <Link href="/login" asChild>
            <Pressable>
                <Text style={[styles.loginLink, { color: '#F79A2B' }]}>Inicia Sesión</Text>
            </Pressable>
          </Link>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  logo: {
    width: 250, 
    height: 150, 
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    opacity: 0.7,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    marginLeft: 5,
    color: '#555',
  },
  button: {
    backgroundColor: '#F79A2B', 
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 25,
    width: '100%', // Botón ancho completo
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
  },
  buttonText: {
    color: '#4B2A00', 
    fontSize: 16,
    fontWeight: '800',
  },
  loginContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  loginText: {
    fontSize: 14,
    color: '#666',
  },
  loginLink: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});