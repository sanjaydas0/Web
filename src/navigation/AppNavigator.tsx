import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuthStore } from '@/store/authStore';
import { RootStackParamList } from '@/types';

// Screens
import AuthNavigator from './AuthNavigator';
import MainTabNavigator from './MainTabNavigator';
import ProductDetailsScreen from '@/screens/product/ProductDetailsScreen';
import ProductListScreen from '@/screens/product/ProductListScreen';
import CartScreen from '@/screens/cart/CartScreen';
import CheckoutScreen from '@/screens/checkout/CheckoutScreen';
import OrderSuccessScreen from '@/screens/checkout/OrderSuccessScreen';
import SearchScreen from '@/screens/search/SearchScreen';
import NotificationsScreen from '@/screens/notifications/NotificationsScreen';
import SettingsScreen from '@/screens/settings/SettingsScreen';
import EditProfileScreen from '@/screens/profile/EditProfileScreen';
import AddressBookScreen from '@/screens/profile/AddressBookScreen';
import AddAddressScreen from '@/screens/profile/AddAddressScreen';
import OrderHistoryScreen from '@/screens/profile/OrderHistoryScreen';
import OrderDetailsScreen from '@/screens/profile/OrderDetailsScreen';
import WishlistScreen from '@/screens/wishlist/WishlistScreen';

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    // You can show a loading screen here
    return null;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: ({ current, layouts }) => {
          return {
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                  }),
                },
              ],
            },
          };
        },
      }}
    >
      {!isAuthenticated ? (
        // Auth Stack
        <>
          <Stack.Screen name="Login" component={AuthNavigator} />
          <Stack.Screen name="Register" component={AuthNavigator} />
          <Stack.Screen name="ForgotPassword" component={AuthNavigator} />
        </>
      ) : (
        // Main App Stack
        <>
          <Stack.Screen name="MainTabs" component={MainTabNavigator} />
          <Stack.Screen 
            name="ProductDetails" 
            component={ProductDetailsScreen}
            options={{
              headerShown: true,
              title: 'Product Details',
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen 
            name="ProductList" 
            component={ProductListScreen}
            options={{
              headerShown: true,
              title: 'Products',
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen 
            name="Cart" 
            component={CartScreen}
            options={{
              headerShown: true,
              title: 'Shopping Cart',
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen 
            name="Checkout" 
            component={CheckoutScreen}
            options={{
              headerShown: true,
              title: 'Checkout',
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen 
            name="OrderSuccess" 
            component={OrderSuccessScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen 
            name="Search" 
            component={SearchScreen}
            options={{
              headerShown: true,
              title: 'Search',
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen 
            name="Notifications" 
            component={NotificationsScreen}
            options={{
              headerShown: true,
              title: 'Notifications',
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen 
            name="Settings" 
            component={SettingsScreen}
            options={{
              headerShown: true,
              title: 'Settings',
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen 
            name="EditProfile" 
            component={EditProfileScreen}
            options={{
              headerShown: true,
              title: 'Edit Profile',
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen 
            name="AddressBook" 
            component={AddressBookScreen}
            options={{
              headerShown: true,
              title: 'Address Book',
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen 
            name="AddAddress" 
            component={AddAddressScreen}
            options={{
              headerShown: true,
              title: 'Add Address',
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen 
            name="OrderHistory" 
            component={OrderHistoryScreen}
            options={{
              headerShown: true,
              title: 'Order History',
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen 
            name="OrderDetails" 
            component={OrderDetailsScreen}
            options={{
              headerShown: true,
              title: 'Order Details',
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen 
            name="Wishlist" 
            component={WishlistScreen}
            options={{
              headerShown: true,
              title: 'Wishlist',
              headerBackTitleVisible: false,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};