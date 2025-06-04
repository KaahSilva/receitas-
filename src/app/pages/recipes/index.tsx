import { View, TextInput, FlatList, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import axios from 'axios';
import RecipeCard from '@/app/components/RecipeCard';
import { Feather } from '@expo/vector-icons';

type Recipe = {
  id: number;
  name: string;
  image: string;
  ingredients: string[];
  instructions: string;
};

export default function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filtered, setFiltered] = useState<Recipe[]>([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    axios.get('https://dummyjson.com/recipes')
      .then(res => {
        setRecipes(res.data.recipes);
        setFiltered(res.data.recipes);
      })
      .catch(() => setError('Erro ao carregar receitas'));
  }, []);

  useEffect(() => {
    const term = search.toLowerCase();
    const result = recipes.filter(r =>
      r.name.toLowerCase().includes(term) ||
      r.ingredients.join(',').toLowerCase().includes(term)
    );
    setFiltered(result);
  }, [search, recipes]);

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/images/hat.png')} style={styles.image} />

      <View style={styles.headerRow}>
        <View style={styles.searchContainer}>
          <Feather name="search" size={22} color="#af814c" style={styles.icon} />
          <TextInput
            placeholder="Buscar por nome ou ingrediente"
            value={search}
            onChangeText={setSearch}
            style={styles.input}
            placeholderTextColor="#af814c"
          />
        </View>

        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => router.push('/pages/recipes/favorites')}
        >
          <Feather name="heart" size={20} color="#1f1e1e" />
        </TouchableOpacity>
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <FlatList
        data={filtered}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <RecipeCard
            recipe={item}
            onPress={() =>
              router.push({
                pathname: '/pages/recipes/[id]',
                params: { id: item.id.toString() },
              } as const)
            }
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ebde95',
  },
  image: {
    alignSelf: 'center',
    width: 50,
    height: 50,
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 52,
    marginRight: 10,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: '#af814c',
    fontSize: 16,
  },
  favoriteButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#AF814C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
});
