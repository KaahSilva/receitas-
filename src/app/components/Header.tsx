import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export function Header() {
  const router = useRouter();

  return (
    <View style={styles.headerTop}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Feather name="arrow-left" size={24} color="#fff" />
      </TouchableOpacity>
      <Image source={require('@/assets/images/hat.png')} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerTop: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
    marginBottom: 12,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    padding: 6,
    backgroundColor: '#AF814C',
    borderRadius: 22,
  },
  image: {
    width: 50,
    height: 50,
  },
});
