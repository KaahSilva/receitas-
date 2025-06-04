import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';

type Recipe = {
  id: number;
  name: string;
  image: string;
  ingredients: string[];
};

type Props = {
  recipe: Recipe;
  onPress: () => void;
};

export default function RecipeCard({ recipe, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: recipe.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{recipe.name}</Text>
        <Text style={styles.ingredients}>
          Ingredientes: {recipe.ingredients.slice(0, 3).join(', ')}...
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#EB996C',
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    width: width * 0.9, 
    alignSelf: 'center',
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  textContainer: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
  },
  ingredients: {
    color: '#fff',
    fontSize: 14,
  },
});
