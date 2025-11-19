import React, { useState } from 'react';
import { 
  StyleSheet, 
  Image, 
  Pressable, 
  Alert, 
  ActivityIndicator, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView,
  TouchableOpacity 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Iconos para mejorar UX
import Input from '@/components/input'; // Tu componente Input actual
import Colors from '@/constants/Colors';
import { Text, View } from '@/components/Themed'; 
import { useAuth } from '@/context/AuthContext';

export default function Login() {
  const router = useRouter();
  const { loginStepOne, isLoading } = useAuth();
  const currentColors = Colors.light;

  // Estados
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Nuevo estado para ver contraseña

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Campos vacíos', 'Por favor ingrese su email y contraseña para continuar.');
      return;
    }

    try {
      const result = await loginStepOne(email, password);

      console.log(result.status);
      if (result.status === '2FA_REQUIRED') {
        router.push({
          pathname: '/(tabs)/twoFactor', // Asegúrate que la ruta coincida con tu archivo
          params: { userId: result.userId }
        });
      } else {
        router.replace('/home');
      }
    } catch (error: any) {
      const msg = error.response?.data?.message || 'Credenciales incorrectas';
      Alert.alert('Error de Acceso', msg);
    }
  };

  return (
    // KeyboardAvoidingView evita que el teclado tape el botón de login
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView 
        contentContainerStyle={[styles.scrollContainer, { backgroundColor: currentColors.background }]}
        showsVerticalScrollIndicator={false}
      >
        
        {/* SECCIÓN SUPERIOR: LOGO Y BIENVENIDA */}
        <View style={styles.headerContainer}>
          <View style={styles.logoBackground}>
             <Image 
              source={require('@/assets/images/icon.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          
          <Text style={[styles.title, { color: '#4B2A00' }]}>
            Museo de Ciencias Naturales
          </Text>
          <Text style={[styles.subtitle, { color: currentColors.text }]}>
            Explora la historia de La Pampa
          </Text>
        </View>

        {/* SECCIÓN FORMULARIO */}
        <View style={styles.formContainer}>
          
          <Text style={styles.label}>Correo Electrónico</Text>
          <Input
            placeHolder={'ejemplo@correo.com'}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.inputSpacing}
          />

          <Text style={styles.label}>Contraseña</Text>
          <View style={styles.passwordContainer}>
            <Input
              placeHolder={'********'}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword} // Alternar visibilidad
              style={{ flex: 1 }} 
            />
            {/* Botón del ojito para ver contraseña */}
            <TouchableOpacity 
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <Ionicons 
                name={showPassword ? "eye-off-outline" : "eye-outline"} 
                size={24} 
                color="#666" 
              />
            </TouchableOpacity>
          </View>

          {/* Enlace de "Olvidé mi contraseña" (Visual) */}
          <TouchableOpacity style={styles.forgotPassword}>
             <Text style={{ color: '#F79A2B', fontSize: 14 }}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>

          <Pressable 
            style={({ pressed }) => [
              styles.button, 
              isLoading && styles.buttonDisabled,
              pressed && styles.buttonPressed // Efecto al presionar
            ]} 
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#4B2A00" />
            ) : (
              <Text style={styles.buttonText}>INGRESAR</Text>
            )}
          </Pressable>

        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  logoBackground: {
    // Un circulo sutil detrás del logo para resaltarlo
    width: 180,
    height: 180,
    backgroundColor: 'rgba(247, 154, 43, 0.1)', // Naranja muy suave
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 220, 
    height: 160, 
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 5,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
    fontWeight: '500',
  },
  formContainer: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginLeft: 10, // Alinear con el input visualmente
    color: '#555',
  },
  inputSpacing: {
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    position: 'relative', // Necesario para posicionar el icono encima si fuera necesario
  },
  eyeIcon: {
    position: 'absolute',
    right: 25,
    height: '100%',
    justifyContent: 'center',
    zIndex: 10,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginRight: 10,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#F79A2B', 
    borderRadius: 15, // Bordes un poco menos redondos para verse más moderno
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#F79A2B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }], // Pequeña animación al presionar
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    elevation: 0,
  },
  buttonText: {
    color: '#4B2A00', 
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1,
  },
});