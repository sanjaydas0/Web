import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  Card,
  useTheme,
  SearchBar,
  Button,
  Badge,
  Avatar,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Swiper from 'react-native-swiper';

import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';
import { Colors, Spacing, shadows } from '@/theme/theme';
import { Product, Category } from '@/types';
import ProductCard from '@/components/product/ProductCard';
import CategoryCard from '@/components/category/CategoryCard';

const { width } = Dimensions.get('window');

type HomeNavigationProp = StackNavigationProp<any>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeNavigationProp>();
  const theme = useTheme();
  const { user } = useAuthStore();
  const { itemCount } = useCartStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [banners, setBanners] = useState<string[]>([]);

  useEffect(() => {
    loadHomeData();
  }, []);

  const loadHomeData = async () => {
    // Mock data - replace with actual API calls
    setCategories([
      {
        id: '1',
        name: 'Electronics',
        icon: 'laptop-outline',
        image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300',
      },
      {
        id: '2',
        name: 'Fashion',
        icon: 'shirt-outline',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300',
      },
      {
        id: '3',
        name: 'Home & Garden',
        icon: 'home-outline',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300',
      },
      {
        id: '4',
        name: 'Sports',
        icon: 'basketball-outline',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300',
      },
    ]);

    setFeaturedProducts([
      {
        id: '1',
        name: 'Wireless Headphones',
        description: 'Premium noise-cancelling wireless headphones',
        price: 199.99,
        originalPrice: 249.99,
        discount: 20,
        images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'],
        category: categories[0] || {} as Category,
        brand: 'AudioTech',
        rating: 4.8,
        reviewCount: 324,
        stock: 25,
        tags: ['wireless', 'noise-cancelling'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        name: 'Smart Watch',
        description: 'Advanced fitness tracking smart watch',
        price: 299.99,
        images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400'],
        category: categories[0] || {} as Category,
        brand: 'TechWear',
        rating: 4.6,
        reviewCount: 156,
        stock: 15,
        tags: ['smartwatch', 'fitness'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    setBanners([
      'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800',
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800',
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
    ]);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadHomeData();
    setRefreshing(false);
  };

  const navigateToSearch = () => {
    navigation.navigate('Search', { initialQuery: searchQuery });
  };

  const navigateToCart = () => {
    navigation.navigate('Cart');
  };

  const navigateToNotifications = () => {
    navigation.navigate('Notifications');
  };

  const navigateToCategory = (category: Category) => {
    navigation.navigate('ProductList', { category: category.id });
  };

  const navigateToProduct = (product: Product) => {
    navigation.navigate('ProductDetails', { productId: product.id });
  };

  const renderBanner = ({ item }: { item: string }) => (
    <TouchableOpacity activeOpacity={0.9}>
      <Card style={styles.bannerCard}>
        <Card.Cover source={{ uri: item }} style={styles.bannerImage} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.bannerOverlay}
        >
          <Text style={styles.bannerText}>Special Offers</Text>
          <Text style={styles.bannerSubtext}>Up to 50% off</Text>
        </LinearGradient>
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.greeting}>Hello,</Text>
            <Text style={styles.userName}>{user?.name || 'Guest'}</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={navigateToNotifications}
            >
              <Ionicons name="notifications-outline" size={24} color={theme.colors.onSurface} />
              <Badge size={16} style={styles.badge}>3</Badge>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={navigateToCart}
            >
              <Ionicons name="bag-outline" size={24} color={theme.colors.onSurface} />
              {itemCount > 0 && (
                <Badge size={16} style={styles.badge}>{itemCount}</Badge>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <Animatable.View animation="fadeInUp" delay={200}>
          <TouchableOpacity onPress={navigateToSearch}>
            <View style={styles.searchContainer}>
              <Ionicons name="search-outline" size={20} color={Colors.gray500} />
              <Text style={styles.searchPlaceholder}>Search products...</Text>
              <Ionicons name="mic-outline" size={20} color={Colors.gray500} />
            </View>
          </TouchableOpacity>
        </Animatable.View>

        {/* Banner Carousel */}
        <Animatable.View animation="fadeInUp" delay={400}>
          <View style={styles.bannerContainer}>
            <Swiper
              height={180}
              autoplay
              autoplayTimeout={4}
              showsPagination
              paginationStyle={styles.pagination}
              dotStyle={styles.dot}
              activeDotStyle={styles.activeDot}
            >
              {banners.map((banner, index) => (
                <View key={index}>
                  {renderBanner({ item: banner })}
                </View>
              ))}
            </Swiper>
          </View>
        </Animatable.View>

        {/* Categories */}
        <Animatable.View animation="fadeInUp" delay={600}>
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Categories</Text>
              <Button mode="text" compact>View All</Button>
            </View>
            <FlatList
              data={categories}
              renderItem={({ item }) => (
                <CategoryCard
                  category={item}
                  onPress={() => navigateToCategory(item)}
                />
              )}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesList}
            />
          </View>
        </Animatable.View>

        {/* Featured Products */}
        <Animatable.View animation="fadeInUp" delay={800}>
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Featured Products</Text>
              <Button mode="text" compact>View All</Button>
            </View>
            <FlatList
              data={featuredProducts}
              renderItem={({ item }) => (
                <ProductCard
                  product={item}
                  onPress={() => navigateToProduct(item)}
                />
              )}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.productsList}
            />
          </View>
        </Animatable.View>

        {/* Quick Actions */}
        <Animatable.View animation="fadeInUp" delay={1000}>
          <View style={styles.quickActions}>
            <Card style={styles.quickActionCard}>
              <TouchableOpacity style={styles.quickActionButton}>
                <Ionicons name="flash-outline" size={24} color={Colors.warning} />
                <Text style={styles.quickActionText}>Flash Sale</Text>
              </TouchableOpacity>
            </Card>
            <Card style={styles.quickActionCard}>
              <TouchableOpacity style={styles.quickActionButton}>
                <Ionicons name="gift-outline" size={24} color={Colors.secondary} />
                <Text style={styles.quickActionText}>Daily Deals</Text>
              </TouchableOpacity>
            </Card>
            <Card style={styles.quickActionCard}>
              <TouchableOpacity style={styles.quickActionButton}>
                <Ionicons name="star-outline" size={24} color={Colors.primary} />
                <Text style={styles.quickActionText}>Top Rated</Text>
              </TouchableOpacity>
            </Card>
          </View>
        </Animatable.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLight,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    position: 'relative',
    marginLeft: Spacing.md,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: Colors.error,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderRadius: 12,
    ...shadows.sm,
  },
  searchPlaceholder: {
    flex: 1,
    marginLeft: Spacing.sm,
    color: Colors.gray500,
    fontSize: 16,
  },
  bannerContainer: {
    height: 180,
    marginBottom: Spacing.lg,
  },
  bannerCard: {
    marginHorizontal: Spacing.lg,
    borderRadius: 16,
    overflow: 'hidden',
  },
  bannerImage: {
    height: 180,
  },
  bannerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.lg,
  },
  bannerText: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  bannerSubtext: {
    color: Colors.white,
    fontSize: 14,
    opacity: 0.9,
  },
  pagination: {
    bottom: 10,
  },
  dot: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    width: 8,
    height: 8,
  },
  activeDot: {
    backgroundColor: Colors.white,
    width: 8,
    height: 8,
  },
  sectionContainer: {
    marginBottom: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  categoriesList: {
    paddingLeft: Spacing.lg,
  },
  productsList: {
    paddingLeft: Spacing.lg,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  quickActionCard: {
    flex: 1,
    marginHorizontal: Spacing.xs,
    borderRadius: 12,
  },
  quickActionButton: {
    alignItems: 'center',
    padding: Spacing.lg,
  },
  quickActionText: {
    marginTop: Spacing.sm,
    fontSize: 12,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
});

export default HomeScreen;