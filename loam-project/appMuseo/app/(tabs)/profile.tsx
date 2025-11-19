import { View, ScrollView, StyleSheet, FlatList, Text, ImageSourcePropType } from 'react-native';
import UserAvatar from '@/components/userAvatar';
import SettingsMenu from '@/components/SettingsMenu';


export default function TabOneScreen() {
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}><UserAvatar 
      imageSource={require("@/assets/images/profile_icon.png")} 
      size={60} 
      /></View>
      <SettingsMenu />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '10%',
    margin: 10,
  }
});