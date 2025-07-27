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
  IconButton,
  Chip,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import * as Animatable from 'react-native-animatable';

import { Product } from '@/types';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCartStore } from '@/store/cartStore';
import { Colors, Spacing, shadows } from '@/theme/theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.7;

interface ProductCardProps {
  product: Product;
  onPress: () => void;
  style?: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress, style }) => {
  const theme = useTheme();
  const { isInWishlist, toggleItem } = useWishlistStore();
  const { addItem } = useCartStore();

  const isWishlisted = isInWishlist(product.id);

  const handleWishlistToggle = () => {
    toggleItem(product);
  };

  const handleAddToCart = () => {
    addItem(product, 1);
  };

  const renderRating = () => {
    const stars = [];
    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Ionicons key={i} name="star" size={12} color={Colors.warning} />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Ionicons key="half" name="star-half" size={12} color={Colors.warning} />
      );
    }

    const emptyStars = 5 - Math.ceil(product.rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Ionicons key={`empty-${i}`} name="star-outline" size={12} color={Colors.gray300} />
      );
    }

    return stars;
  };

  return (
    <Animatable.View animation="fadeInUp" duration={600}>
      <Card style={[styles.card, shadows.md, style]}>
        <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
          {/* Product Image */}
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: product.images[0] }}
              style={styles.image}
              contentFit="cover"
              transition={300}
            />
            
            {/* Discount Badge */}
            {product.discount && (
              <Chip style={styles.discountBadge} textStyle={styles.discountText}>
                -{product.discount}%
              </Chip>
            )}

            {/* Wishlist Button */}
            <IconButton
              icon={isWishlisted ? "heart" : "heart-outline"}
              iconColor={isWishlisted ? Colors.error : Colors.white}
              size={20}
              style={styles.wishlistButton}
              onPress={handleWishlistToggle}
            />

            {/* Stock Status */}
            {product.stock < 5 && product.stock > 0 && (
              <Chip style={styles.stockBadge} textStyle={styles.stockText}>
                Only {product.stock} left
              </Chip>
            )}
            {product.stock === 0 && (
              <Chip style={styles.outOfStockBadge} textStyle={styles.outOfStockText}>
                Out of Stock
              </Chip>
            )}
          </View>

          {/* Product Info */}
          <Card.Content style={styles.content}>
            <View style={styles.brandContainer}>
              <Text style={styles.brand}>{product.brand}</Text>
            </View>
            
            <Text style={styles.name} numberOfLines={2}>
              {product.name}
            </Text>

            {/* Rating */}
            <View style={styles.ratingContainer}>
              <View style={styles.stars}>
                {renderRating()}
              </View>
              <Text style={styles.ratingText}>
                {product.rating} ({product.reviewCount})
              </Text>
            </View>

            {/* Price */}
            <View style={styles.priceContainer}>
              <Text style={styles.price}>${product.price}</Text>
              {product.originalPrice && (
                <Text style={styles.originalPrice}>
                  ${product.originalPrice}
                </Text>
              )}
            </View>

            {/* Add to Cart Button */}
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={handleAddToCart}
              disabled={product.stock === 0}
            >
              <Ionicons 
                name="bag-add-outline" 
                size={16} 
                color={product.stock === 0 ? Colors.gray400 : Colors.white} 
              />
              <Text style={[
                styles.addToCartText,
                product.stock === 0 && styles.disabledText
              ]}>
                Add to Cart
              </Text>
            </TouchableOpacity>
          </Card.Content>
        </TouchableOpacity>
      </Card>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    marginRight: Spacing.md,
    borderRadius: 16,
    backgroundColor: Colors.white,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: Spacing.sm,
    left: Spacing.sm,
    backgroundColor: Colors.error,
  },
  discountText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  wishlistButton: {
    position: 'absolute',
    top: Spacing.xs,
    right: Spacing.xs,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  stockBadge: {
    position: 'absolute',
    bottom: Spacing.sm,
    left: Spacing.sm,
    backgroundColor: Colors.warning,
  },
  stockText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  outOfStockBadge: {
    position: 'absolute',
    bottom: Spacing.sm,
    left: Spacing.sm,
    backgroundColor: Colors.gray600,
  },
  outOfStockText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  content: {
    padding: Spacing.md,
  },
  brandContainer: {
    marginBottom: Spacing.xs,
  },
  brand: {
    fontSize: 12,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
    lineHeight: 22,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  stars: {
    flexDirection: 'row',
    marginRight: Spacing.xs,
  },
  ratingText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    marginRight: Spacing.sm,
  },
  originalPrice: {
    fontSize: 14,
    color: Colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: 8,
  },
  addToCartText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: Spacing.xs,
  },
  disabledText: {
    color: Colors.gray400,
  },
});

export default ProductCard;