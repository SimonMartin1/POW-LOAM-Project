import React from 'react';
import { StyleSheet, ActivityIndicator, Platform } from 'react-native'; // 1. Importa Platform
import { WebView } from 'react-native-webview';
import { View, Text } from '@/components/Themed'; 
type ModelViewerProps = {
  modelUrl: string; 
  posterUrl?: string; 
};

const ModelViewer = ({ modelUrl, posterUrl }: ModelViewerProps) => {
  
  // El HTML es el mismo para ambos
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.3.0/model-viewer.min.js"></script>
        <style>
          body { margin: 0; background-color: #f0f4f8; display: flex; justify-content: center; align-items: center; height: 100vh; overflow: hidden; }
          model-viewer { width: 100%; height: 100%; }
        </style>
      </head>
      <body>
        <model-viewer 
          src="${modelUrl}" 
          poster="${posterUrl || ''}"
          alt="Modelo 3D"
          auto-rotate 
          camera-controls 
          shadow-intensity="1"
          loading="eager"
        >
        </model-viewer>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      {/* 2. Renderizado Condicional */}
      {Platform.OS === 'web' ? (
        // OPCIÓN WEB: Usamos un iframe estándar
        <iframe
          srcDoc={htmlContent}
          style={{ width: '100%', height: '100%', border: 'none' }}
          title="3D Model Viewer"
        />
      ) : (
        // OPCIÓN MÓVIL: Usamos React Native WebView
        <WebView
          originWhitelist={['*']}
          source={{ html: htmlContent }}
          style={styles.webview}
          startInLoadingState={true}
          renderLoading={() => (
            <View style={styles.loading}>
              <ActivityIndicator size="large" color="#F79A2B" />
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 300, 
    borderRadius: 16,
    overflow: 'hidden',
    marginVertical: 20,
    backgroundColor: '#f0f4f8',
  },
  webview: {
    backgroundColor: 'transparent',
  },
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default ModelViewer;