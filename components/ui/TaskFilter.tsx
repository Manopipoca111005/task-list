import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTasks } from '../../contexts/TaskContext';
import { useTheme } from '../../contexts/ThemeContext';
import { BorderRadius, FontSizes, Spacing, Typography } from '../../constants/Theme';

type FilterOption = 'all' | 'completed' | 'incomplete';

type FilterButtonProps = {
  title: string;
  value: FilterOption;
  isActive: boolean;
  onPress: (value: FilterOption) => void;
};

const FilterButton: React.FC<FilterButtonProps> = ({
  title,
  value,
  isActive,
  onPress,
}) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.filterButton,
        {
          backgroundColor: isActive ? colors.primary : colors.inputBackground,
          borderColor: isActive ? colors.primary : colors.border,
        },
      ]}
      onPress={() => onPress(value)}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.filterButtonText,
          { color: isActive ? 'white' : colors.textSecondary },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export const TaskFilter: React.FC = () => {
  const { filter, setFilter, tasks } = useTasks();

  const completedCount = tasks.filter((task) => task.isCompleted).length;
  const incompleteCount = tasks.filter((task) => !task.isCompleted).length;

  return (
    <View style={styles.container}>
      <FilterButton
        title={`Todas (${tasks.length})`}
        value="all"
        isActive={filter === 'all'}
        onPress={setFilter}
      />
      <FilterButton
        title={`Completas (${completedCount})`}
        value="completed"
        isActive={filter === 'completed'}
        onPress={setFilter}
      />
      <FilterButton
        title={`Pendentes (${incompleteCount})`}
        value="incomplete"
        isActive={filter === 'incomplete'}
        onPress={setFilter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  filterButton: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  filterButtonText: {
    ...Typography.styles.bodySmall,
    fontSize: FontSizes.xs,
  },
});
