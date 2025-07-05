import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { BorderRadius, Spacing } from '../../constants/Theme';

type CardProps = {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'elevated' | 'outline' | 'filled';
  padding?: 'none' | 'small' | 'medium' | 'large';
  elevation?: number;
  radius?: number;
};

export const Card: React.FC<CardProps> = ({
  children,
  style,
  variant = 'elevated',
  padding = 'medium',
  elevation = 2,
  radius = 16,
}) => {
  const { colors, shadows } = useTheme();

  const paddingMap = {
    none: 0,
    small: Spacing.sm,
    medium: Spacing.md,
    large: Spacing.lg,
  };

  const variantStyle = {
    elevated: {
      backgroundColor: colors.card,
      borderWidth: 0,
      ...shadows.medium,
      shadowOpacity: elevation * 0.05,
      elevation,
      borderRadius: radius,
    },
    outline: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radius,
    },
    filled: {
      backgroundColor: colors.inputBackground,
      borderWidth: 0,
      borderRadius: radius,
    },
  };

  return (
    <View
        style={[
          styles.card,
          variantStyle[variant],
          { padding: typeof padding === 'string' ? paddingMap[padding] : padding },
          style,
        ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    width: '100%',
  },
});