import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  Card,
  Text,
  useTheme,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

import { Category } from '@/types';
import { Colors, Spacing, shadows } from '@/theme/theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.4;

interface CategoryCardProps {
  category: Category;
  onPress: () => void;
  style?: any;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onPress, style }) => {
  const theme = useTheme();

  return (
    <Animatable.View animation="fadeInUp" duration={600}>
      <Card style={[styles.card, shadows.md, style]}>
        <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
          <View style={styles.imageContainer}>
            {category.image ? (
              <>
                <Image
                  source={{ uri: category.image }}
                  style={styles.image}
                  contentFit="cover"
                  transition={300}
                />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.6)']}
                  style={styles.overlay}
                />
              </>
            ) : (
              <View style={styles.iconContainer}>
                <Ionicons 
                  name={category.icon as any} 
                  size={40} 
                  color={Colors.primary} 
                />
              </View>
            )}
            
            <View style={styles.textContainer}>
              <Text style={styles.categoryName} numberOfLines={2}>
                {category.name}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Card>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: 120,
    marginRight: Spacing.md,
    borderRadius: 16,
    backgroundColor: Colors.white,
    overflow: 'hidden',
  },
  imageContainer: {
    flex: 1,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.gray50,
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.md,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});

export default CategoryCard;