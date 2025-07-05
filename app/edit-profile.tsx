import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Spacing, Typography } from '../constants/Theme';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

export default function EditProfileScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { user, updateUserProfile, isLoading } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [username, setUsername] = useState(user?.username || '');
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || 'https://i.pravatar.cc/300');
  const [errors, setErrors] = useState<{ name?: string; email?: string; bio?: string }>({});

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; bio?: string } = {};
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = 'Nome é obrigatório';
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'E-mail inválido';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSelectImage = () => {
    Alert.alert(
      'Selecionar Imagem',
      'Esta funcionalidade simulada alteraria sua foto de perfil.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'OK', onPress: () => {} },
      ]
    );
  };

  const handleUpdateProfile = async () => {
    if (!validateForm()) return;

    try {
      await updateUserProfile({
        name,
        email,
        bio,
        photoUrl,
        username,
      });
      router.back();
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      setErrors({ name: 'Erro ao atualizar perfil' });
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
            Editar Perfil
          </Text>
        </View>

        <View style={styles.avatarSection}>
          <TouchableOpacity onPress={handleSelectImage}>
            <View style={styles.avatarContainer}>
              <Image source={{ uri: photoUrl }} style={styles.avatar} />
              <View
                style={[
                  styles.avatarEditIcon,
                  { backgroundColor: colors.primary },
                ]}
              >
                <Feather name="camera" size={16} color="white" />
              </View>
            </View>
          </TouchableOpacity>
          <Text
            style={[
              styles.changePhotoText,
              { color: colors.primary },
            ]}
          >
            Alterar foto
          </Text>
        </View>

        <View style={styles.formContainer}>
          <Input
            label="Nome"
            placeholder="Seu nome"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            error={errors.name}
          />

          {user?.provider === 'github' && (
            <Input
              label="Nome de usuário do GitHub"
              placeholder="@username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              editable={false}
            />
          )}

          <Input
            label="E-mail"
            placeholder="seu@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
          />

          <Input
            label="Bio"
            placeholder="Conte um pouco sobre você"
            value={bio}
            onChangeText={setBio}
            multiline
            numberOfLines={4}
            error={errors.bio}
          />

          <Button
            title="Salvar Alterações"
            onPress={handleUpdateProfile}
            loading={isLoading}
            disabled={isLoading}
            style={styles.saveButton}
          />
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
  avatarSection: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  avatarContainer: {
    position: 'relative',
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'visible',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  avatarEditIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  changePhotoText: {
    ...Typography.styles.body,
    marginTop: Spacing.sm,
  },
  formContainer: {
    flex: 1,
  },
  saveButton: {
    marginTop: Spacing.lg,
  },
});
