import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/Button';
import { FontSizes, Spacing, Typography } from '../../constants/Theme';

export default function LoginScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { signInWithGoogle, signInWithGithub, isLoading } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Erro ao fazer login com Google:', error);
    }
  };

  const handleGithubLogin = async () => {
    try {
      await signInWithGithub();
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Erro ao fazer login com GitHub:', error);
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
        <View style={styles.headerContainer}>
          <Image
            source={require('../../assets/images/logo.jpg')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={[styles.title, { color: colors.primary }]}>
            Lista de Tarefas
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Organize suas tarefas com facilidade e produtividade
          </Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={[styles.loginTitle, { color: colors.text }]}>
            Faça login para continuar
          </Text>

          <View style={styles.socialButtonsWrapper}>
            <Button
              title="Entrar com Google"
              onPress={handleGoogleLogin}
              loading={isLoading}
              disabled={isLoading}
              fullWidth
              style={[styles.socialLoginButton, { backgroundColor: '#DB4437' }]}
              icon={<Feather name="mail" size={20} color="white" />}
            />

            <Button
              title="Entrar com GitHub"
              onPress={handleGithubLogin}
              loading={isLoading}
              disabled={isLoading}
              fullWidth
              style={[styles.socialLoginButton, { backgroundColor: '#333' }]}
              icon={<Feather name="github" size={20} color="white" />}
            />
          </View>

          <Text style={[styles.infoText, { color: colors.textSecondary }]}>
            Ao fazer login, você concorda com nossos Termos de Uso e Política de Privacidade.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
    paddingVertical: Spacing.xl,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: Spacing.lg,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    ...Typography.styles.h1,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    ...Typography.styles.body,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  loginTitle: {
    ...Typography.styles.h3,
    marginBottom: Spacing.lg,
    textAlign: 'center',
  },
  socialButtonsWrapper: {
    width: '100%',
    marginBottom: Spacing.lg,
  },
  socialLoginButton: {
    marginBottom: Spacing.md,
  },
  infoText: {
    ...Typography.styles.bodySmall,
    textAlign: 'center',
    marginTop: Spacing.lg,
  }
});
