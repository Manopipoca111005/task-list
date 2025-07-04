import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTasks } from '../../contexts/TaskContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { FontSizes, Spacing, Typography } from '../../constants/Theme';
import { Feather } from '@expo/vector-icons';

export default function AddTaskScreen() {
  const router = useRouter();
  const { addTask } = useTasks();
  const { colors } = useTheme();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; description?: string }>(
    {}
  );

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

  const handleAddTask = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await addTask(title, description);
      router.back();
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
      setErrors({ title: 'Erro ao adicionar tarefa' });
    } finally {
      setIsSubmitting(false);
    }
  };

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
            Nova Tarefa
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

          <View style={styles.buttonContainer}>
            <Button
              title="Cancelar"
              onPress={() => router.back()}
              variant="outline"
              style={styles.cancelButton}
            />
            <Button
              title="Adicionar"
              onPress={handleAddTask}
              loading={isSubmitting}
              disabled={isSubmitting}
              style={styles.addButton}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: Spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xl,
    paddingTop: Spacing.md,
  },
  backButton: {
    padding: Spacing.xs,
    marginRight: Spacing.md,
  },
  title: {
    ...Typography.styles.h2,
  },
  formContainer: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.lg,
  },
  cancelButton: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  addButton: {
    flex: 1,
    marginLeft: Spacing.sm,
  },
});
