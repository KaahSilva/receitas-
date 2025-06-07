import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Header } from './components/header';

export default function About() {
  const openLinkedIn = () => {
    Linking.openURL('https://www.linkedin.com/in/kalline-ferreira-front-end/');
  };

  return (
    
    <View style={styles.container}>
        
        <Header/>
       
     
     <View style={styles.centerContent}>
        <Image source={require('../assets/images/kah.jpeg')} style={styles.profileImage} />

        <Text style={styles.name}>Kalline Ferreira</Text>

        <Text style={styles.description}>
        Programadora Front-End e Mobile com foco em React, React Native, JavaScript e TypeScript. Entre em contato conosco.
        </Text>

        <TouchableOpacity style={styles.linkedinButton} onPress={openLinkedIn}>
            <FontAwesome name="linkedin" size={20} color="#fff" />
            <Text style={styles.linkedinText}>Linkedin</Text>
        </TouchableOpacity>

     </View>

  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebde95',
    paddingTop: 30,
    paddingHorizontal: 20,
    marginBottom: -30,
    marginTop: -60,

  },
   centerContent: {
    paddingTop: 30,
    alignItems: 'center',
  },
 
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#af814c',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  linkedinButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0e76a8',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  linkedinText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
  },
});
