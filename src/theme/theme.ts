import { DefaultTheme as NavigationDefaultTheme, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';
import { DefaultTheme as PaperDefaultTheme, MD3DarkTheme as PaperDarkTheme } from 'react-native-paper';

// Color palette
export const colors = {
  primary: '#6366F1',
  primaryLight: '#818CF8',
  primaryDark: '#4F46E5',
  secondary: '#EC4899',
  secondaryLight: '#F472B6',
  secondaryDark: '#DB2777',
  accent: '#10B981',
  accentLight: '#34D399',
  accentDark: '#059669',
  
  // Neutrals
  white: '#FFFFFF',
  black: '#000000',
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
  
  // Status colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  
  // Background
  backgroundLight: '#FFFFFF',
  backgroundDark: '#1F2937',
  surfaceLight: '#F9FAFB',
  surfaceDark: '#374151',
  
  // Text
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  textPrimaryDark: '#F9FAFB',
  textSecondaryDark: '#D1D5DB',
};

// Typography
export const typography = {
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
};

// Spacing
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
};

// Border radius
export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999,
};

// Shadows
export const shadows = {
  sm: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  lg: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 6,
  },
  xl: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.25,
    shadowRadius: 25,
    elevation: 10,
  },
};

// Light theme
export const lightTheme = {
  ...PaperDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: colors.primary,
    primaryContainer: colors.primaryLight,
    secondary: colors.secondary,
    secondaryContainer: colors.secondaryLight,
    tertiary: colors.accent,
    tertiaryContainer: colors.accentLight,
    surface: colors.white,
    surfaceVariant: colors.gray50,
    background: colors.backgroundLight,
    error: colors.error,
    errorContainer: '#FECACA',
    onPrimary: colors.white,
    onSecondary: colors.white,
    onTertiary: colors.white,
    onSurface: colors.textPrimary,
    onSurfaceVariant: colors.textSecondary,
    onBackground: colors.textPrimary,
    onError: colors.white,
    outline: colors.gray300,
    outlineVariant: colors.gray200,
    inverseSurface: colors.gray800,
    inverseOnSurface: colors.white,
    inversePrimary: colors.primaryLight,
    shadow: colors.black,
    scrim: colors.black,
    backdrop: 'rgba(0, 0, 0, 0.5)',
  },
};

export const darkTheme = {
  ...PaperDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    primary: colors.primaryLight,
    primaryContainer: colors.primaryDark,
    secondary: colors.secondaryLight,
    secondaryContainer: colors.secondaryDark,
    tertiary: colors.accentLight,
    tertiaryContainer: colors.accentDark,
    surface: colors.gray800,
    surfaceVariant: colors.gray700,
    background: colors.backgroundDark,
    error: colors.error,
    errorContainer: '#7F1D1D',
    onPrimary: colors.white,
    onSecondary: colors.white,
    onTertiary: colors.white,
    onSurface: colors.textPrimaryDark,
    onSurfaceVariant: colors.textSecondaryDark,
    onBackground: colors.textPrimaryDark,
    onError: colors.white,
    outline: colors.gray600,
    outlineVariant: colors.gray700,
    inverseSurface: colors.gray100,
    inverseOnSurface: colors.gray800,
    inversePrimary: colors.primary,
    shadow: colors.black,
    scrim: colors.black,
    backdrop: 'rgba(0, 0, 0, 0.5)',
  },
};

// Navigation themes
export const navigationLightTheme = {
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    primary: colors.primary,
    background: colors.backgroundLight,
    card: colors.white,
    text: colors.textPrimary,
    border: colors.gray200,
    notification: colors.error,
  },
};

export const navigationDarkTheme = {
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    primary: colors.primaryLight,
    background: colors.backgroundDark,
    card: colors.gray800,
    text: colors.textPrimaryDark,
    border: colors.gray600,
    notification: colors.error,
  },
};

// Common styles
export const commonStyles = {
  container: {
    flex: 1,
    padding: spacing.md,
  },
  row: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  column: {
    flexDirection: 'column' as const,
  },
  centered: {
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  spaceBetween: {
    justifyContent: 'space-between' as const,
  },
  spaceAround: {
    justifyContent: 'space-around' as const,
  },
  fullWidth: {
    width: '100%',
  },
  fullHeight: {
    height: '100%',
  },
  flex1: {
    flex: 1,
  },
  absoluteFill: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
};

export { colors as Colors, typography as Typography, spacing as Spacing, borderRadius as BorderRadius, shadows as Shadows };