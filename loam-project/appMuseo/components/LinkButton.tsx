import { View, StyleSheet, Text, Pressable, ColorValue } from 'react-native';
import { Href, Link } from 'expo-router';

type Data = {
  show_text: string;
  colour: ColorValue;
  route: Href;
  onPress?: () => void;
};


const LinkButton = ({show_text, colour, route}: Data)=>{
console.log(colour)
return (
    <Link href={route} asChild>
        <Pressable style={styles.button }>
        <Text style={styles.buttonText}>{show_text}</Text>
        </Pressable>
    </Link>
)};

const styles = StyleSheet.create({
    button: { 
    backgroundColor: '#F79A2B' ,
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 25,
    width: 120,
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
}
});

export default LinkButton;