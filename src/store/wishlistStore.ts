import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WishlistItem, Product } from '@/types';

interface WishlistState {
  items: WishlistItem[];
  isLoading: boolean;
  
  // Actions
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: string) => boolean;
  toggleItem: (product: Product) => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,

      addItem: (product: Product) => {
        const { items } = get();
        const existingItem = items.find(item => item.product.id === product.id);
        
        if (!existingItem) {
          const newItem: WishlistItem = {
            id: `wishlist-${product.id}-${Date.now()}`,
            product,
            addedAt: new Date(),
          };
          set({ items: [...items, newItem] });
        }
      },

      removeItem: (productId: string) => {
        const { items } = get();
        set({ items: items.filter(item => item.product.id !== productId) });
      },

      clearWishlist: () => {
        set({ items: [] });
      },

      isInWishlist: (productId: string) => {
        const { items } = get();
        return items.some(item => item.product.id === productId);
      },

      toggleItem: (product: Product) => {
        const { isInWishlist, addItem, removeItem } = get();
        if (isInWishlist(product.id)) {
          removeItem(product.id);
        } else {
          addItem(product);
        }
      },
    }),
    {
      name: 'wishlist-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);