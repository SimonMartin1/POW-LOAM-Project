import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Link } from 'expo-router';

import Colors from '@/constants/Colors';

export default function WelcomeScreen() {

  const currentColors = Colors.light;

  return (
    <View style={[styles.container, { backgroundColor: currentColors.background }]}>
      

      <Image 
        source={require('@/assets/images/icon.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={[styles.title, { color: currentColors.text }]}>
        Te damos la Bienvenida al Museo
      </Text>
      <Text style={[styles.subtitle, { color: currentColors.text }]}>
        Disfrute la Experiencia
      </Text>

      <Link href="/home" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Acceder como invitado</Text>
        </Pressable>
      </Link>
      
      <Link href="/register" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Registrarme</Text>
        </Pressable>
      </Link>

      <View style={styles.loginContainer}>
        <Text style={[styles.loginText, { color: currentColors.text }]}>
          Ya tienes cuenta -{' '}
        </Text>
        
        <Link href="/login">
          <Text style={[styles.loginLink, { color: currentColors.tint }]}>
            Iniciar Sesión
          </Text>
        </Link>
      </View>

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
    width: 250, 
    height: 180, 
    marginBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 50,
    opacity: 0.9,
  },
  button: {
    backgroundColor: '#F79A2B', 
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 25,
    width: '80%',
    alignItems: 'center',
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
    fontWeight: '700',
  },
  loginContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  loginText: {
    fontSize: 14,
  },
  loginLink: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});