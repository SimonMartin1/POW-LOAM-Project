import * as LocalAuthentication from 'expo-local-authentication';
import { Alert } from 'react-native';

export const BiometricService = {

  checkHardware: async (): Promise<boolean> => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!hasHardware || !isEnrolled) {
      Alert.alert(
        "No disponible",
        "Este dispositivo no tiene soporte biométrico o no hay huellas/rostros configurados."
      );
      return false;
    }
    return true;
  },

  authenticate: async (message: string = "Escanea tu huella para continuar"): Promise<boolean> => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: message,
        cancelLabel: "Cancelar",
        disableDeviceFallback: false, 
      });

      if (result.success) {
        return true;
      } else {
        return false; 
      }
    } catch (error) {
      console.error("Error en biometría:", error);
      return false;
    }
  }
};