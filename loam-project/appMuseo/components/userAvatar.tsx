import React from 'react';
import { Image, ImageSourcePropType, StyleSheet } from 'react-native';

type UserAvatarProps = {
  imageSource: ImageSourcePropType; // Acepta require() o { uri: ... }
  size?: number; // Opcional: para cambiar el tamaño (por defecto 50)
};

const UserAvatar = ({ imageSource, size = 50 }: UserAvatarProps) => {
  return (
    <Image
      source={imageSource}
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius: size / 2, // ¡Matemática simple para el círculo perfecto!
        },
      ]}
      resizeMode="cover" // Asegura que la foto llene el círculo sin estirarse
    />
  );
};

const styles = StyleSheet.create({
  avatar: {
    borderWidth: 2,        // Opcional: un borde bonito
    borderColor: '#fff',   // Opcional: color del borde
    backgroundColor: '#ccc', // Color de fondo mientras carga
  },
});

export default UserAvatar;
