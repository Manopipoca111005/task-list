import { Colors } from './Colors';

export const FontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 30,
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const Shadows = {
  light: {
    small: {
      shadowColor: Colors.light.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 2,
    },
    medium: {
      shadowColor: Colors.light.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 4,
    },
    large: {
      shadowColor: Colors.light.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
  },
  dark: {
    small: {
      shadowColor: Colors.dark.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 2,
    },
    medium: {
      shadowColor: Colors.dark.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 4,
      elevation: 4,
    },
    large: {
      shadowColor: Colors.dark.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 8,
      elevation: 8,
    },
  },
};

export const Typography = {
  fontFamily: {
    regular: 'Inter-Regular',
    medium: 'Inter-Medium',
    semiBold: 'Inter-SemiBold',
    bold: 'Inter-Bold',
  },
  styles: {
    h1: {
      fontSize: FontSizes.xxxl,
      fontFamily: 'Inter-Bold',
      lineHeight: FontSizes.xxxl * 1.2,
    },
    h2: {
      fontSize: FontSizes.xxl,
      fontFamily: 'Inter-Bold',
      lineHeight: FontSizes.xxl * 1.2,
    },
    h3: {
      fontSize: FontSizes.xl,
      fontFamily: 'Inter-SemiBold',
      lineHeight: FontSizes.xl * 1.2,
    },
    body: {
      fontSize: FontSizes.md,
      fontFamily: 'Inter-Regular',
      lineHeight: FontSizes.md * 1.5,
    },
    bodySmall: {
      fontSize: FontSizes.sm,
      fontFamily: 'Inter-Regular',
      lineHeight: FontSizes.sm * 1.5,
    },
    label: {
      fontSize: FontSizes.sm,
      fontFamily: 'Inter-Medium',
      lineHeight: FontSizes.sm * 1.2,
    },
    button: {
      fontSize: FontSizes.md,
      fontFamily: 'Inter-SemiBold',
      lineHeight: FontSizes.md * 1.2,
    },
  },
};
