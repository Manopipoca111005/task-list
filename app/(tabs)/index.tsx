import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { EmptyState } from '../../components/ui/EmptyState';
import { TaskFilter } from '../../components/ui/TaskFilter';
import { TaskItem } from '../../components/ui/TaskItem';
import { Spacing, Typography } from '../../constants/Theme';
import { useAuth } from '../../contexts/AuthContext';
import { useTasks } from '../../contexts/TaskContext';
import { useTheme } from '../../contexts/ThemeContext';

export default function TasksScreen() {
  const router = useRouter();
  const { filteredTasks} = useTasks();
  const { colors, isDarkMode, toggleTheme } = useTheme();
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    // Simulando uma atualização
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  }, []);

  const renderEmptyComponent = () => (
    <EmptyState
      title="Sem tarefas"
      message="Você não possui tarefas no momento. Toque no botão + para adicionar uma nova tarefa."
      icon="clipboard"
      style={{ marginTop: 50 }}
    />
  );

  const handleTaskPress = (taskId: string) => {
    router.push(`/task/${taskId}`);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, { color: colors.textSecondary }]}>
            Olá,
          </Text>
          <Text style={[styles.userName, { color: colors.text }]}>
            {user?.name || 'Usuário'}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.themeToggle, { backgroundColor: colors.inputBackground }]}
          onPress={toggleTheme}
        >
          <Feather name={isDarkMode ? "sun" : "moon"} size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Suas Tarefas
      </Text>

      <TaskFilter />

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem task={item} onPress={() => handleTaskPress(item.id)} />
        )}
        ListEmptyComponent={renderEmptyComponent}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
      />

      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.primary }, colors.shadow && { shadowColor: colors.shadow }]}
        onPress={() => router.push('/add')}
      >
        <Feather name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    paddingTop: Spacing.md,
  },
  greeting: {
    ...Typography.styles.body,
  },
  userName: {
    ...Typography.styles.h2,
  },
  themeToggle: {
    padding: Spacing.sm,
    borderRadius: 20,
  },
  sectionTitle: {
    ...Typography.styles.h3,
    marginBottom: Spacing.md,
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: Spacing.xxl,
  },
  fab: {
    position: 'absolute',
    right: Spacing.lg,
    bottom: Spacing.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});
