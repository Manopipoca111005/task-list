import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useTasks, Task } from '../../contexts/TaskContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { FontSizes, Spacing, Typography } from '../../constants/Theme';

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { tasks, updateTask, deleteTask, toggleTaskCompletion } = useTasks();
  const { colors } = useTheme();

  const [task, setTask] = useState<Task | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; description?: string }>(
    {}
  );

  useEffect(() => {
    if (id) {
      const foundTask = tasks.find((t) => t.id === id);
      if (foundTask) {
        setTask(foundTask);
        setTitle(foundTask.title);
        setDescription(foundTask.description || '');
      } else {
        // Tarefa não encontrada, voltar para a lista
        router.back();
      }
    }
  }, [id, tasks]);

  const validateForm = () => {
    const newErrors: { title?: string; description?: string } = {};
    let isValid = true;

    if (!title.trim()) {
      newErrors.title = 'Título é obrigatório';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleUpdateTask = async () => {
    if (!validateForm() || !task) return;

    setIsSubmitting(true);
    try {
      await updateTask(task.id, { title, description });
      router.back();
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
      setErrors({ title: 'Erro ao atualizar tarefa' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleComplete = async () => {
    if (!task) return;
    await toggleTaskCompletion(task.id);
  };

  const handleDeleteTask = () => {
    if (!task) return;

    Alert.alert(
      'Excluir Tarefa',
      'Tem certeza que deseja excluir esta tarefa? Esta ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            await deleteTask(task.id);
            router.back();
          },
        },
      ]
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!task) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: colors.background },
        ]}
      >
        <Text style={{ color: colors.text }}>Carregando...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: colors.background },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Feather name="arrow-left" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: colors.text }]}>
            Detalhes da Tarefa
          </Text>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDeleteTask}
          >
            <Feather name="trash-2" size={24} color={colors.error} />
          </TouchableOpacity>
        </View>

        <View style={styles.statusContainer}>
          <Text style={[styles.statusLabel, { color: colors.textSecondary }]}>
            Status:
          </Text>
          <TouchableOpacity
            style={[
              styles.statusBadge,
              {
                backgroundColor: task.isCompleted
                  ? colors.success
                  : colors.warning,
              },
            ]}
            onPress={handleToggleComplete}
          >
            <Text style={styles.statusText}>
              {task.isCompleted ? 'Concluída' : 'Pendente'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dates}>
          <Text style={[styles.dateLabel, { color: colors.textSecondary }]}>
            Criada em: {formatDate(task.createdAt)}
          </Text>
          <Text style={[styles.dateLabel, { color: colors.textSecondary }]}>
            Atualizada em: {formatDate(task.updatedAt)}
          </Text>
        </View>

        <View style={styles.formContainer}>
          <Input
            label="Título"
            placeholder="Digite o título da tarefa"
            value={title}
            onChangeText={setTitle}
            error={errors.title}
          />

          <Input
            label="Descrição (opcional)"
            placeholder="Digite uma descrição para a tarefa"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            error={errors.description}
          />

          <Button
            title="Salvar Alterações"
            onPress={handleUpdateTask}
            loading={isSubmitting}
            disabled={isSubmitting}
            style={styles.saveButton}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexGrow: 1,
    padding: Spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
    paddingTop: Spacing.md,
  },
  backButton: {
    padding: Spacing.xs,
  },
  title: {
    ...Typography.styles.h2,
    flex: 1,
    textAlign: 'center',
  },
  deleteButton: {
    padding: Spacing.xs,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  statusLabel: {
    ...Typography.styles.body,
    marginRight: Spacing.sm,
  },
  statusBadge: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    borderRadius: 4,
  },
  statusText: {
    color: 'white',
    fontFamily: Typography.fontFamily.medium,
    fontSize: FontSizes.sm,
  },
  dates: {
    marginBottom: Spacing.lg,
  },
  dateLabel: {
    ...Typography.styles.bodySmall,
    marginBottom: Spacing.xs,
  },
  formContainer: {
    flex: 1,
  },
  saveButton: {
    marginTop: Spacing.lg,
  },
});
