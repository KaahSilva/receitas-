import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();

  return (
    
    <View style={styles.container}>
     
      <Image
        source={require('../../assets/images/pegareceita.png')}
        style={styles.image}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/pages/recipes')}
      >
        <Text style={styles.buttonText}>Ver Receitas</Text>
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
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#af814c', // cor do botão
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white', // cor do texto
    fontSize: 20,
    fontWeight: 'bold',
  },
});

