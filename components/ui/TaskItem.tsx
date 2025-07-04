import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Task, useTasks } from '../../contexts/TaskContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Card } from './Card';
import { BorderRadius, FontSizes, Spacing, Typography } from '../../constants/Theme';
import { Feather } from '@expo/vector-icons';

type TaskItemProps = {
  task: Task;
  onPress: () => void;
};

export const TaskItem: React.FC<TaskItemProps> = ({ task, onPress }) => {
  const { toggleTaskCompletion, deleteTask } = useTasks();
  const { colors, isDarkMode } = useTheme();

  const handleToggleComplete = () => {
    toggleTaskCompletion(task.id);
  };

  const handleDelete = () => {
    deleteTask(task.id);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    });
  };

  return (
    <Card
      variant="elevated"
      padding="medium"
      style={styles.card}
    >
      <TouchableOpacity
        style={styles.container}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={handleToggleComplete}
        >
          <View
            style={[
              styles.checkbox,
              {
                borderColor: colors.primary,
                backgroundColor: task.isCompleted
                  ? colors.primary
                  : 'transparent',
              },
            ]}
          >
            {task.isCompleted && (
              <Feather name="check" size={14} color="white" />
            )}
          </View>
        </TouchableOpacity>

        <View style={styles.content}>
          <Text
            style={[
              styles.title,
              {
                color: colors.text,
                textDecorationLine: task.isCompleted ? 'line-through' : 'none',
                opacity: task.isCompleted ? 0.7 : 1,
              },
            ]}
            numberOfLines={1}
          >
            {task.title}
          </Text>

          {task.description && (
            <Text
              style={[
                styles.description,
                {
                  color: colors.textSecondary,
                  opacity: task.isCompleted ? 0.7 : 1,
                },
              ]}
              numberOfLines={2}
            >
              {task.description}
            </Text>
          )}

          <Text
            style={[
              styles.date,
              { color: colors.textSecondary },
            ]}
          >
            {formatDate(task.createdAt)}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDelete}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        >
          <Feather
            name="trash-2"
            size={18}
            color={isDarkMode ? colors.error : colors.error}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: Spacing.sm,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxContainer: {
    marginRight: Spacing.md,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: BorderRadius.xs,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  title: {
    ...Typography.styles.h3,
    fontSize: FontSizes.md,
    marginBottom: 4,
  },
  description: {
    ...Typography.styles.bodySmall,
    marginBottom: 4,
  },
  date: {
    ...Typography.styles.bodySmall,
    fontSize: FontSizes.xs,
  },
  deleteButton: {
    padding: 4,
  },
});
