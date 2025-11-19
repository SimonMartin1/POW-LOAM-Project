import React, { useState } from 'react';
import { 
  StyleSheet, 
  Dimensions, 
  Pressable, 
  Alert,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Text, View } from '@/components/Themed'; 

const { width } = Dimensions.get('window');
const SCANNER_SIZE = width * 0.7; 

export default function EscanearScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraActive, setIsCameraActive] = useState(false); 
  const [scanned, setScanned] = useState(false);

  
  const handleStartCamera = async () => {
    if (!permission) return;

    if (!permission.granted) {
      const result = await requestPermission();
      if (result.granted) {
        setIsCameraActive(true); 
      } else {
        Alert.alert("Permiso denegado", "Necesitamos acceso a la cámara para escanear QRs.");
      }
    } else {
      setIsCameraActive(true);
    }
  };

  const handleBarCodeScanned = ({ type, data }: { type: string, data: string }) => {
    setScanned(true);
    setIsCameraActive(false); 
    console.log(`QR detectado: ${data}`);
    router.push(`/obra/${data}`); 
  };

  const handleBack = () => {
    if (isCameraActive) {
      setIsCameraActive(false);
    } else {
      router.push(`/(tabs)/qr_scan`);  
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#fff" />
      
      <View style={styles.header}>
        <Pressable onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="white" />
        </Pressable>
      </View>

      {!isCameraActive ? (
        <View style={styles.startContainer}>
          <View style={styles.iconCircle}>
            <Ionicons name="qr-code-outline" size={80} color="#F79A2B" />
          </View>
          
          <Text style={styles.startTitle}>Escanear Código QR</Text>
          <Text style={styles.startSubtitle}>
            Apunta tu cámara al código QR de la obra para ver los detalles.
          </Text>

          <Pressable 
            style={({pressed}) => [styles.btnStart, pressed && {opacity: 0.8}]}
            onPress={handleStartCamera}
          >
            <Ionicons name="camera" size={24} color="#fff" style={{marginRight: 10}}/>
            <Text style={styles.btnStartText}>Activar Cámara</Text>
          </Pressable>
        </View>

      ) : (
        <View style={styles.cameraContainer}>
          <CameraView
            style={StyleSheet.absoluteFillObject}
            facing="back"
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
          />
          <View style={styles.overlay}>
            <View style={styles.topOverlay}>
              <Text style={styles.instructions}>Ubica el código en el cuadro</Text>
            </View>
            <View style={styles.middleContainer}>
              <View style={styles.sideDark} />
              <View style={styles.focusedContainer}>
                 <View style={[styles.corner, styles.topLeft]} />
                 <View style={[styles.corner, styles.topRight]} />
                 <View style={[styles.corner, styles.bottomLeft]} />
                 <View style={[styles.corner, styles.bottomRight]} />
              </View>
              <View style={styles.sideDark} />
            </View>
            <View style={styles.bottomOverlay}>
                <Text style={styles.hintText}>Buscando...</Text>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    zIndex: 10, 
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  
  startContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  iconCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(247, 154, 43, 0.15)', 
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 2,
    borderColor: '#F79A2B',
  },
  startTitle: {
    color: '#000000b1',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  startSubtitle: {
    fontSize: 16,
    color: '#000000b1',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 22,
  },
  btnStart: {
    flexDirection: 'row',
    backgroundColor: '#F79A2B',
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#F79A2B',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  btnStartText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  cameraContainer: {
    flex: 1,
    borderRadius: 20, 
    overflow: 'hidden',
    marginHorizontal: 0,
    marginBottom: 0,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
  },
  topOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
  },
  bottomOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
  middleContainer: {
    flexDirection: 'row',
    height: SCANNER_SIZE,
  },
  sideDark: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  focusedContainer: {
    width: SCANNER_SIZE,
    height: SCANNER_SIZE,
  },
  instructions: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  hintText: {
    color: '#000000ff',
    fontSize: 14,
  },
  
  // Esquinas
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: '#F79A2B',
    borderWidth: 4,
  },
  topLeft: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0 },
  topRight: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0 },
  bottomLeft: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0 },
  bottomRight: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0 },
});