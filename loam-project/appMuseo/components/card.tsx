import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  useColorScheme, 
  Pressable,
  ImageSourcePropType
} from 'react-native';
import Colors from '../constants/Colors';


type MuseoCardProps = {
  title: string;
  category: string;
  imageUrl: ImageSourcePropType; 
  onPress?: () => void; 
};

const MuseoCard = ({ title, category, imageUrl, onPress }: MuseoCardProps) => {
  const colorScheme = useColorScheme();
  const theme =  Colors.light.text;


  const cardBackground = Colors.light.background;
  const shadowColor = colorScheme === 'dark' ? '#000' : '#000';

  return (
    <Pressable 
      onPress={onPress} 
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: cardBackground, shadowColor: shadowColor },
        pressed && styles.pressed 
      ]}
    >
      <Image 
        source={imageUrl} 
        style={styles.image} 
      />
      
      <View style={styles.content}>
        <Text style={[styles.category, { color: theme }]}>
          {category.toUpperCase()}
        </Text>
        <Text style={[styles.title, { color: theme }]}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    width: 250,
    maxHeight:300,
    overflow: 'hidden', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    
    elevation: 5,
  },
  pressed: {
    opacity: 0.8, 
    transform: [{ scale: 0.98 }], 
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: '#ccc', 
  },
  content: {
    padding: 15,
  },
  category: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default MuseoCard;