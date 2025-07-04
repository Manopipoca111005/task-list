import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { Spacing, Typography } from '../../constants/Theme';

interface EmptyStateProps {
  title: string;
  description?: string;
  message?: string;
  icon?: React.ReactNode | keyof typeof Feather.glyphMap;
  image?: any;
  actionLabel?: string;
  onAction?: () => void;
  style?: ViewStyle;
}

export const EmptyState = ({
  title,
  description,
  message,
  icon = 'inbox',
  image,
  actionLabel,
  onAction,
  style,
}: EmptyStateProps) => {
  const { colors } = useTheme();

  // Use message como fallback para description
  const displayDescription = description || message;

  return (
    <View style={[styles.container, style]}>
      {image && (
        <Image source={image} style={styles.image} resizeMode="contain" />
      )}

      {typeof icon === 'string' ? (
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: colors.border },
          ]}
        >
          <Feather name={icon as keyof typeof Feather.glyphMap} size={32} color={colors.primary} />
        </View>
      ) : icon}

      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>

      {displayDescription && (
        <Text style={[styles.description, { color: colors.textSecondary }]}>
          {displayDescription}
        </Text>
      )}

      {actionLabel && onAction && (
        <TouchableOpacity
          onPress={onAction}
          style={[styles.button, { backgroundColor: colors.primary }]}
        >
          <Text style={[styles.buttonText, { color: 'white' }]}>
            {actionLabel}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: Spacing.lg,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  title: {
    ...Typography.styles.h2,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  description: {
    ...Typography.styles.body,
    textAlign: 'center',
    marginBottom: Spacing.lg,
    maxWidth: 280,
  },
  button: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: 8,
  },
  buttonText: {
    ...Typography.styles.body,
    fontFamily: Typography.fontFamily.medium,
  },
  message: {
    ...Typography.styles.body,
    textAlign: 'center',
    maxWidth: 280,
  },
});
