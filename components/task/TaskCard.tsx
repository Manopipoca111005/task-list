import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Card } from '../ui/Card';
import { useTheme } from '../../contexts/ThemeContext';
import { Spacing, Typography, FontSizes } from '../../constants/Theme';

interface TaskCardProps {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority?: 'low' | 'medium' | 'high';
  completed?: boolean;
  onPress?: () => void;
  onToggleComplete?: () => void;
}

export const TaskCard = ({
  title,
  description,
  dueDate,
  priority = 'medium',
  completed = false,
  onPress,
  onToggleComplete,
}: TaskCardProps) => {
  const { colors } = useTheme();

  const priorityColors = {
    low: colors.success,
    medium: colors.warning,
    high: colors.error,
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.touchable}
    >
      <Card
        style={{ ...styles.container, ...(completed ? { opacity: 0.7 } : {}) }}
        elevation={2}
      >
        <View style={styles.contentContainer}>
          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              onPress={onToggleComplete}
              style={[
                styles.checkbox,
                {
                  borderColor: colors.primary,
                  backgroundColor: completed ? colors.primary : 'transparent',
                },
              ]}
            >
              {completed && <Feather name="check" size={14} color="white" />}
            </TouchableOpacity>
          </View>

          <View style={styles.textContainer}>
            <Text
              style={[
                styles.title,
                { color: colors.text },
                completed && styles.completedText,
              ]}
              numberOfLines={1}
            >
              {title}
            </Text>
            {description && (
              <Text
                style={[
                  styles.description,
                  { color: colors.textSecondary },
                  completed && styles.completedText,
                ]}
                numberOfLines={2}
              >
                {description}
              </Text>
            )}

            <View style={styles.footerContainer}>
              {dueDate && (
                <View style={styles.dueDateContainer}>
                  <Feather name="calendar" size={12} color={colors.textSecondary} />
                  <Text style={[styles.dueDate, { color: colors.textSecondary }]}>
                    {dueDate}
                  </Text>
                </View>
              )}

              <View
                style={[
                  styles.priorityBadge,
                  { backgroundColor: priorityColors[priority] },
                ]}
              >
                <Text style={styles.priorityText}>
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    marginBottom: Spacing.md,
    width: '100%',
  },
  container: {
    padding: Spacing.md,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkboxContainer: {
    marginRight: Spacing.md,
    paddingTop: 2,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...Typography.styles.body,
    fontSize: FontSizes.lg,
    fontFamily: Typography.fontFamily.medium,
    marginBottom: Spacing.xs,
  },
  description: {
    ...Typography.styles.body,
    marginBottom: Spacing.sm,
  },
  completedText: {
    textDecorationLine: 'line-through',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dueDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dueDate: {
    ...Typography.styles.bodySmall,
    marginLeft: Spacing.xs,
  },
  priorityBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.sm,
    borderRadius: 12,
  },
  priorityText: {
    ...Typography.styles.bodySmall,
    color: 'white',
    fontFamily: Typography.fontFamily.medium,
    fontSize: 10,
  },
});
