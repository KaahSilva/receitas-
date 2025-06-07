import { useEffect, useState } from 'react';
import { View, TextInput, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import RecipeCard from '@/app/components/RecipeCard';
import { Header } from '../components/header';

export type Recipe = {
  id: number;
  name: string;
  image: string;
  ingredients: string[];
};

export default function Favorites() {
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [filtered, setFiltered] = useState<Recipe[]>([]);
  const [search, setSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    const loadFavorites = async () => {
      const stored = await AsyncStorage.getItem('favorites');
      const parsed = stored ? JSON.parse(stored) : [];

      // filtra apenas os objetos válidos
      const valid = parsed.filter((item: any) => typeof item === 'object' && item.id && item.name);

      setFavorites(valid);
      setFiltered(valid);
    };
    loadFavorites();
  }, []);

  useEffect(() => {
    const term = search.toLowerCase();
    const result = favorites.filter(r =>
      r.name.toLowerCase().includes(term) ||
      r.ingredients.join(',').toLowerCase().includes(term)
    );
    setFiltered(result);
  }, [search, favorites]);

  return (
    <View style={styles.container}>
      <Header/>
    

      <View style={styles.headerRow}>
        <View style={styles.searchContainer}>
          <Feather name="search" size={22} color="#af814c" style={styles.icon} />
          <TextInput
            placeholder="Buscar favoritos"
            value={search}
            onChangeText={setSearch}
            style={styles.input}
            placeholderTextColor="#af814c"
          />
        </View>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => router.push('/recipes')}
        >
          <FontAwesome name="heart" size={20} color="#EB6D6C" />
        </TouchableOpacity>
      </View>

      {filtered.length === 0 ? (
        <Text style={styles.empty}>Nenhuma receita favorita encontrada.</Text>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <RecipeCard
              recipe={item}
              onPress={() =>
                router.push({
                  pathname: '/recipes/[id]',
                  params: { id: item.id.toString() },
                } as const)
              }
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ebde95',
    marginBottom: -30,
    marginTop: -60,
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
    backgroundColor: '#EBA494',
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    color: '#af814c',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

