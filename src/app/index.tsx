import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();

  return (
    
    <View style={styles.container}>
     
      <Image
        source={require('../assets/images/pegareceita.png')}
        style={styles.image}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/recipes')}
      >
        <Text style={styles.buttonText}>Ver Receitas</Text>
      </TouchableOpacity>

        <TouchableOpacity
        style={styles.buttonAbout}
        onPress={() => router.push('/about')}
      >
        <Text style={styles.buttonText}>Sobre Nós</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebde95',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -30,
    marginTop: -60,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#af814c', 
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom:20,
  },
  buttonAbout: {
    backgroundColor: '#af814c', 
    paddingVertical: 12,
    paddingHorizontal: 31,
    borderRadius: 8,
    marginBottom:10,
  },
  buttonText: {
    color: 'white', 
    fontSize: 20,
    fontWeight: 'bold',
  },
});

