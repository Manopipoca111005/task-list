import { TextStyle } from 'react-native';

// Espaçamentos
export const Spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Tamanhos de fonte
export const FontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

// Famílias de fontes
export const Typography = {
  fontFamily: {
    regular: 'System',
    medium: 'System-Medium',
    semiBold: 'System-SemiBold',
    bold: 'System-Bold',
  },
  styles: {
    h1: {
      fontSize: FontSizes.xxxl,
      fontFamily: 'System-Bold',
      lineHeight: FontSizes.xxxl * 1.3,
    } as TextStyle,
    h2: {
      fontSize: FontSizes.xxl,
      fontFamily: 'System-Bold',
      lineHeight: FontSizes.xxl * 1.3,
    } as TextStyle,
    h3: {
      fontSize: FontSizes.xl,
      fontFamily: 'System-SemiBold',
      lineHeight: FontSizes.xl * 1.3,
    } as TextStyle,
    bodyLarge: {
      fontSize: FontSizes.lg,
      fontFamily: 'System',
      lineHeight: FontSizes.lg * 1.5,
    } as TextStyle,
    body: {
      fontSize: FontSizes.md,
      fontFamily: 'System',
      lineHeight: FontSizes.md * 1.5,
    } as TextStyle,
    bodySmall: {
      fontSize: FontSizes.sm,
      fontFamily: 'System',
      lineHeight: FontSizes.sm * 1.5,
    } as TextStyle,
    caption: {
      fontSize: FontSizes.xs,
      fontFamily: 'System',
      lineHeight: FontSizes.xs * 1.5,
    } as TextStyle,
  },
};

// Bordas
export const Border = {
  radius: {
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
    round: 9999,
  },
  width: {
    thin: 1,
    regular: 2,
    thick: 3,
  },
};

// Cores do tema
export const LightThemeColors = {
  primary: '#6200EA',  // Deep Purple
  primaryLight: '#B388FF',
  primaryDark: '#4A148C',
  secondary: '#03DAC6',  // Teal
  secondaryLight: '#84FFFF',
  secondaryDark: '#018786',
  background: '#FFFFFF',
  card: '#FFFFFF',
  text: '#121212',
  textSecondary: '#757575',
  border: '#E0E0E0',
  notification: '#FF4081',
  error: '#CF6679',
  warning: '#FF9800',
  success: '#4CAF50',
  info: '#2196F3',
};

export const DarkThemeColors = {
  primary: '#BB86FC',  // Purple
  primaryLight: '#D7B8FF',
  primaryDark: '#7C4DFF',
  secondary: '#03DAC6',  // Teal
  secondaryLight: '#84FFFF',
  secondaryDark: '#018786',
  background: '#121212',
  card: '#1E1E1E',
  text: '#FFFFFF',
  textSecondary: '#B0B0B0',
  border: '#2C2C2C',
  notification: '#FF4081',
  error: '#CF6679',
  warning: '#FF9800',
  success: '#4CAF50',
  info: '#2196F3',
};

// Sombras
export const Shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
};
