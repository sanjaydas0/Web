import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartItem, Product, ProductVariant } from '@/types';

interface CartState {
  items: CartItem[];
  isLoading: boolean;
  
  // Computed values
  itemCount: number;
  subtotal: number;
  
  // Actions
  addItem: (product: Product, quantity?: number, variant?: ProductVariant) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (productId: string, variantId?: string) => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,
      
      get itemCount() {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      get subtotal() {
        return get().items.reduce((total, item) => {
          const price = item.selectedVariant?.price || item.product.price;
          return total + (price * item.quantity);
        }, 0);
      },

      addItem: (product: Product, quantity = 1, variant?: ProductVariant) => {
        const { items } = get();
        const existingItemIndex = items.findIndex(item => 
          item.product.id === product.id && 
          item.selectedVariant?.id === variant?.id
        );

        if (existingItemIndex >= 0) {
          // Update existing item quantity
          const updatedItems = [...items];
          updatedItems[existingItemIndex].quantity += quantity;
          set({ items: updatedItems });
        } else {
          // Add new item
          const newItem: CartItem = {
            id: `${product.id}-${variant?.id || 'default'}-${Date.now()}`,
            product,
            quantity,
            selectedVariant: variant,
          };
          set({ items: [...items, newItem] });
        }
      },

      removeItem: (itemId: string) => {
        const { items } = get();
        set({ items: items.filter(item => item.id !== itemId) });
      },

      updateQuantity: (itemId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }

        const { items } = get();
        const updatedItems = items.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        );
        set({ items: updatedItems });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getItemQuantity: (productId: string, variantId?: string) => {
        const { items } = get();
        const item = items.find(item => 
          item.product.id === productId && 
          item.selectedVariant?.id === variantId
        );
        return item?.quantity || 0;
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);