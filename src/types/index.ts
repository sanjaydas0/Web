// User types
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  addresses: Address[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

// Product types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: string[];
  category: Category;
  brand: string;
  rating: number;
  reviewCount: number;
  stock: number;
  tags: string[];
  specifications?: Record<string, string>;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image?: string;
  parentId?: string;
  subcategories?: Category[];
}

// Cart types
export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  stock: number;
  attributes: Record<string, string>; // color, size, etc.
}

// Order types
export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: PaymentMethod;
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  status: OrderStatus;
  trackingNumber?: string;
  estimatedDelivery?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  product: Product;
  quantity: number;
  price: number;
  variant?: ProductVariant;
}

export type OrderStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'processing' 
  | 'shipped' 
  | 'delivered' 
  | 'cancelled' 
  | 'refunded';

// Payment types
export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'stripe' | 'bkash' | 'nagad' | 'sslcommerz';
  name: string;
  details: Record<string, any>;
}

// Wishlist types
export interface WishlistItem {
  id: string;
  product: Product;
  addedAt: Date;
}

// Review types
export interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  comment: string;
  images?: string[];
  helpful: number;
  createdAt: Date;
  user: {
    name: string;
    avatar?: string;
  };
}

// Search & Filter types
export interface SearchFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  brand?: string;
  rating?: number;
  inStock?: boolean;
  sortBy?: 'price' | 'rating' | 'newest' | 'popular';
  sortOrder?: 'asc' | 'desc';
}

// Notification types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'order' | 'promotion' | 'general';
  read: boolean;
  data?: Record<string, any>;
  createdAt: Date;
}

// Navigation types
export type RootStackParamList = {
  // Auth
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  
  // Main App
  MainTabs: undefined;
  
  // Product
  ProductDetails: { productId: string };
  ProductList: { category?: string; search?: string };
  
  // Cart & Checkout
  Cart: undefined;
  Checkout: undefined;
  OrderSuccess: { orderId: string };
  
  // Profile
  Profile: undefined;
  EditProfile: undefined;
  AddressBook: undefined;
  AddAddress: { addressId?: string };
  OrderHistory: undefined;
  OrderDetails: { orderId: string };
  
  // Other
  Search: { initialQuery?: string };
  Notifications: undefined;
  Settings: undefined;
  Wishlist: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Categories: undefined;
  Search: undefined;
  Wishlist: undefined;
  Profile: undefined;
};

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  hasNext: boolean;
  hasPrev: boolean;
}