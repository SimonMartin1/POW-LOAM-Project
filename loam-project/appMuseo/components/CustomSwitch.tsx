import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  ViewStyle,
} from 'react-native';

interface CustomSwitchProps {
  value: boolean;
  onValueChange: (val: boolean) => void;
  activeText?: string; // Mantenido por compatibilidad, aunque no se renderiza visualmente
  inActiveText?: string;
  backgroundActive?: string;
  backgroundInactive?: string;
  circleActiveColor?: string;
  circleInActiveColor?: string;
}

// Constantes de dimensiones para replicar el estilo anterior
const SWITCH_WIDTH = 44; // Aprox switchWidthMultiplier={2} * 20 + márgenes
const SWITCH_HEIGHT = 24; // Aprox barHeight={20} + márgenes
const CIRCLE_SIZE = 20;
const PADDING = 2;

const CustomSwitch: React.FC<CustomSwitchProps> = ({
  value,
  onValueChange,
  backgroundActive = '#f5ac0fff',
  backgroundInactive = '#767577',
  circleActiveColor = '#fff',
  circleInActiveColor = '#fff',
}) => {
  // Valor animado: 0 para apagado, 1 para encendido
  const animValue = useRef(new Animated.Value(value ? 1 : 0)).current;

  // Efecto para disparar la animación cuando cambia el prop 'value'
  useEffect(() => {
    Animated.timing(animValue, {
      toValue: value ? 1 : 0,
      duration: 200, // Duración de la transición
      useNativeDriver: false, // False es necesario para animar colores de fondo
    }).start();
  }, [value, animValue]);

  // Interpolación de posición (movimiento del círculo)
  const translateX = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [PADDING, SWITCH_WIDTH - CIRCLE_SIZE - PADDING],
  });

  // Interpolación del color de fondo de la barra
  const trackBackgroundColor = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [backgroundInactive, backgroundActive],
  });

  // Interpolación del color del círculo
  const circleColor = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [circleInActiveColor, circleActiveColor],
  });

  return (
    <Pressable
      onPress={() => onValueChange(!value)}
      style={{ alignSelf: 'flex-start' }} // Evita que ocupe todo el ancho si está en un container flex
    >
      <Animated.View
        style={[
          styles.track,
          {
            backgroundColor: trackBackgroundColor,
            width: SWITCH_WIDTH,
            height: SWITCH_HEIGHT,
            borderRadius: SWITCH_HEIGHT / 2,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.circle,
            {
              backgroundColor: circleColor,
              width: CIRCLE_SIZE,
              height: CIRCLE_SIZE,
              borderRadius: CIRCLE_SIZE / 2,
              transform: [{ translateX }],
            },
          ]}
        />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  track: {
    justifyContent: 'center',
    // Si necesitas sombra en la barra, descomenta esto:
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.22,
    // shadowRadius: 2.22,
    // elevation: 3,
  },
  circle: {
    position: 'absolute',
    // Sombra para el círculo (estilo "switch" nativo)
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 1.5,
  },
});

export default CustomSwitch;