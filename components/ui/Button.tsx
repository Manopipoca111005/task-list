import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { BorderRadius, FontSizes, Spacing, Typography } from '../../constants/Theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'small' | 'medium' | 'large';

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
  leftIcon,
  rightIcon,
}) => {
  const { colors, isDarkMode } = useTheme();

  // Configurações de tamanho
  const sizeStyles = {
    small: {
      paddingVertical: Spacing.xs,
      paddingHorizontal: Spacing.sm,
      fontSize: FontSizes.sm,
    },
    medium: {
      paddingVertical: Spacing.sm,
      paddingHorizontal: Spacing.md,
      fontSize: FontSizes.md,
    },
    large: {
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.lg,
      fontSize: FontSizes.lg,
    },
  };

  // Estilos baseados na variante
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: colors.primary,
          borderColor: colors.primary,
          textColor: '#ffffff',
        };
      case 'secondary':
        return {
          backgroundColor: colors.secondary,
          borderColor: colors.secondary,
          textColor: '#ffffff',
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderColor: colors.primary,
          textColor: colors.primary,
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          textColor: colors.primary,
        };
      case 'danger':
        return {
          backgroundColor: colors.error,
          borderColor: colors.error,
          textColor: '#ffffff',
        };
      default:
        return {
          backgroundColor: colors.primary,
          borderColor: colors.primary,
          textColor: '#ffffff',
        };
    }
  };

  const variantStyles = getVariantStyles();

  const buttonStyle = {
    backgroundColor: disabled
      ? isDarkMode
        ? 'rgba(255, 255, 255, 0.12)'
        : 'rgba(0, 0, 0, 0.12)'
      : variantStyles.backgroundColor,
    borderColor: variantStyles.borderColor,
    paddingVertical: sizeStyles[size].paddingVertical,
    paddingHorizontal: sizeStyles[size].paddingHorizontal,
    opacity: disabled && !loading ? 0.6 : 1,
    width: fullWidth ? '100%' as const : undefined,
  };

  const textStyleValue = {
    color: disabled
      ? isDarkMode
        ? 'rgba(255, 255, 255, 0.5)'
        : 'rgba(0, 0, 0, 0.5)'
      : variantStyles.textColor,
    fontSize: sizeStyles[size].fontSize,
  };

  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={variantStyles.textColor} size="small" />
      ) : (
        <>
          {leftIcon && <Text style={styles.iconLeft}>{leftIcon}</Text>}
          <Text style={[styles.text, textStyleValue, textStyle]}>{title}</Text>
          {rightIcon && <Text style={styles.iconRight}>{rightIcon}</Text>}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.md,
    borderWidth: 1,
  },
  text: {
    ...Typography.styles.button,
    textAlign: 'center',
  },
  iconLeft: {
    marginRight: Spacing.xs,
  },
  iconRight: {
    marginLeft: Spacing.xs,
  },
});
