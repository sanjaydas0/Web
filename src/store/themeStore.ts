import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';
import { navigationLightTheme, navigationDarkTheme } from '@/theme/theme';

interface ThemeState {
  isDarkMode: boolean;
  isSystemTheme: boolean;
  theme: typeof navigationLightTheme;
  
  // Actions
  toggleTheme: () => void;
  setDarkMode: (isDark: boolean) => void;
  setSystemTheme: (useSystem: boolean) => void;
  initializeTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      isDarkMode: false,
      isSystemTheme: true,
      theme: navigationLightTheme,

      toggleTheme: () => {
        const { isDarkMode } = get();
        const newDarkMode = !isDarkMode;
        set({ 
          isDarkMode: newDarkMode,
          isSystemTheme: false,
          theme: newDarkMode ? navigationDarkTheme : navigationLightTheme
        });
      },

      setDarkMode: (isDark: boolean) => {
        set({ 
          isDarkMode: isDark,
          isSystemTheme: false,
          theme: isDark ? navigationDarkTheme : navigationLightTheme
        });
      },

      setSystemTheme: (useSystem: boolean) => {
        if (useSystem) {
          const systemColorScheme = Appearance.getColorScheme();
          const isDark = systemColorScheme === 'dark';
          set({ 
            isSystemTheme: true,
            isDarkMode: isDark,
            theme: isDark ? navigationDarkTheme : navigationLightTheme
          });
        } else {
          set({ isSystemTheme: false });
        }
      },

      initializeTheme: () => {
        const { isSystemTheme } = get();
        if (isSystemTheme) {
          const systemColorScheme = Appearance.getColorScheme();
          const isDark = systemColorScheme === 'dark';
          set({ 
            isDarkMode: isDark,
            theme: isDark ? navigationDarkTheme : navigationLightTheme
          });
        }
      },
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// Listen to system theme changes
Appearance.addChangeListener(({ colorScheme }) => {
  const { isSystemTheme, setDarkMode } = useThemeStore.getState();
  if (isSystemTheme) {
    setDarkMode(colorScheme === 'dark');
  }
});