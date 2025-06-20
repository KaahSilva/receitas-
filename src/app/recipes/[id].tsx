import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, StyleSheet, Image, TouchableOpacity, View, ScrollView, SafeAreaView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import Header from '../components/Header';

type Recipe = {
  id: number;
  name: string;
  image: string;
  ingredients: string[];
  instructions: string;
};

export default function RecipeDetails() {
  const { id } = useLocalSearchParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (id) {
      axios.get(`https://dummyjson.com/recipes/${id}`)
        .then(res => {
          setRecipe(res.data);
          checkIfFavorite(res.data.id);
        })
        .catch(() => setError('Erro ao carregar detalhes da receita'));
    }
  }, [id]);

  const checkIfFavorite = async (recipeId: number) => {
    const saved = await AsyncStorage.getItem('favorites');
    if (saved) {
      const list = JSON.parse(saved) as Recipe[];
      const exists = list.some(r => r.id === recipeId);
      setIsFavorite(exists);
    }
  };

  const toggleFavorite = async () => {
    if (!recipe) return;

    const saved = await AsyncStorage.getItem('favorites');
    const list = saved ? (JSON.parse(saved) as Recipe[]) : [];

    const exists = list.some(r => r.id === recipe.id);
    let updated: Recipe[];

    if (exists) {
      updated = list.filter(r => r.id !== recipe.id);
      setIsFavorite(false);
    } else {
      updated = [...list, recipe];
      setIsFavorite(true);
    }

    await AsyncStorage.setItem('favorites', JSON.stringify(updated));
  };

  if (error) return <Text style={styles.error}>{error}</Text>;
  if (!recipe) return <Text style={styles.loading}>Carregando...</Text>;

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.headerContainer}>
        <Header />
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: recipe.image }} style={styles.image} />
          <TouchableOpacity style={styles.heartIcon} onPress={toggleFavorite}>
            <FontAwesome
              name={isFavorite ? 'heart' : 'heart-o'}
              size={28}
              color="#EB6D6C"
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>{recipe.name}</Text>

        <Text style={styles.section}>Ingredientes:</Text>
        {recipe.ingredients.map((ing, i) => (
          <Text key={i} style={styles.text}>• {ing}</Text>
        ))}

        <Text style={styles.section}>Instruções:</Text>
        <Text style={styles.text}>{recipe.instructions}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#ebde95',
    marginTop:-60,
    marginBottom:-30
  },
  headerContainer: {
    paddingHorizontal: 20, 
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 12,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 16,
  },
  heartIcon: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#EBA494',
    borderRadius: 24,
    padding: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 14,
    color: '#af814c',
    textAlign: 'center',
  },
  section: {
    marginTop: 24,
    marginBottom: 8,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#af814c',
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 6,
    lineHeight: 22,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 18,
  },
  error: {
    flex: 1,
    justifyContent: 'center',
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
  },
});