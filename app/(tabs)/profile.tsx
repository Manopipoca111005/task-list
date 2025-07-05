import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { BorderRadius, FontSizes, Spacing, Typography } from '../../constants/Theme';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { getRandomMotivationalQuote, MotivationalQuote } from '../../services/motivationalApi';

export default function ProfileScreen() {
  const router = useRouter();
  const { colors, toggleTheme, isDarkMode } = useTheme();
  const { user, signOut } = useAuth();

  const [quote, setQuote] = useState<MotivationalQuote | null>(null);
  const [isLoadingQuote, setIsLoadingQuote] = useState(true);

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    setIsLoadingQuote(true);
    try {
      const newQuote = await getRandomMotivationalQuote();
      setQuote(newQuote);
    } catch (error) {
      console.error('Erro ao buscar frase motivacional:', error);
    } finally {
      setIsLoadingQuote(false);
    }
  };

  const handleEditProfile = () => {
    router.push('/edit-profile');
  };

  const handleLogout = async () => {
    try {
      await signOut();
      router.replace('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Perfil</Text>
        <TouchableOpacity
          style={[styles.themeToggle, { backgroundColor: colors.inputBackground }]}
          onPress={toggleTheme}
        >
          <Feather
            name={isDarkMode ? 'sun' : 'moon'}
            size={20}
            color={colors.textSecondary}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: user?.photoUrl || 'https://i.pravatar.cc/300' }}
            style={styles.avatar}
          />
          <TouchableOpacity
            style={[styles.editAvatarButton, { backgroundColor: colors.primary }]}
            onPress={handleEditProfile}
          >
            <Feather name="camera" size={16} color="white" />
          </TouchableOpacity>
        </View>

        <Text style={[styles.userName, { color: colors.text }]}>
          {user?.name || 'Usuário'}
        </Text>
        <Text style={[styles.userEmail, { color: colors.textSecondary }]}>
          {user?.provider === 'github' && user?.username 
            ? `${user.username}` 
            : user?.email || 'email@gmail.com'}
        </Text>

        {user?.bio ? (
          <Text style={[styles.userBio, { color: colors.text }]}>{user.bio}</Text>
        ) : null}

        <Button
          title="Editar Perfil"
          onPress={handleEditProfile}
          variant="outline"
          leftIcon={<Feather name="edit-2" size={16} color={colors.primary} />}
          style={styles.editButton}
        />
      </View>

      <Card style={styles.quoteCard}>
        <View style={styles.quoteHeader}>
          <Text style={[styles.quoteTitle, { color: colors.text }]}>
            Frase Motivacional
          </Text>
          <TouchableOpacity onPress={fetchQuote} disabled={isLoadingQuote}>
            <Feather name="refresh-cw" size={18} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {isLoadingQuote ? (
          <ActivityIndicator color={colors.primary} style={styles.loader} />
        ) : (
          <View style={styles.quoteContent}>
            <Text style={[styles.quoteText, { color: colors.text }]}>
              "{quote?.text || 'Carregando frase motivacional...'}"
            </Text>
          </View>
        )}
      </Card>

      <View style={styles.statsSection}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Estatísticas
        </Text>

        <View style={styles.statsGrid}>
          <View
            style={[
              styles.statCard,
              { backgroundColor: colors.inputBackground },
            ]}
          >
            <Text style={[styles.statValue, { color: colors.primary }]}>12</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Tarefas Concluídas
            </Text>
          </View>

          <View
            style={[
              styles.statCard,
              { backgroundColor: colors.inputBackground },
            ]}
          >
            <Text style={[styles.statValue, { color: colors.warning }]}>5</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Pendentes
            </Text>
          </View>

          <View
            style={[
              styles.statCard,
              { backgroundColor: colors.inputBackground },
            ]}
          >
            <Text style={[styles.statValue, { color: colors.success }]}>75%</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Produtividade
            </Text>
          </View>
        </View>
      </View>

      <Button
        title="Sair"
        onPress={handleLogout}
        variant="outline"
        leftIcon={<Feather name="log-out" size={16} color={colors.error} />}
        style={{ ...styles.logoutButton, borderColor: colors.error }}
        textStyle={{ color: colors.error }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    paddingTop: Spacing.md,
  },
  title: {
    ...Typography.styles.h2,
  },
  themeToggle: {
    padding: Spacing.sm,
    borderRadius: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: Spacing.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    ...Typography.styles.h2,
    marginBottom: Spacing.xs,
  },
  userEmail: {
    ...Typography.styles.body,
    marginBottom: Spacing.md,
  },
  userBio: {
    ...Typography.styles.body,
    textAlign: 'center',
    marginBottom: Spacing.md,
    maxWidth: '80%',
  },
  editButton: {
    marginTop: Spacing.sm,
  },
  quoteCard: {
    marginBottom: Spacing.xl,
  },
  quoteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  quoteTitle: {
    ...Typography.styles.h3,
    fontSize: FontSizes.md,
  },
  quoteContent: {
    paddingVertical: Spacing.sm,
  },
  quoteText: {
    ...Typography.styles.body,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  loader: {
    marginVertical: Spacing.md,
  },
  statsSection: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    ...Typography.styles.h3,
    marginBottom: Spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  statValue: {
    ...Typography.styles.h2,
    marginBottom: 4,
  },
  statLabel: {
    ...Typography.styles.bodySmall,
    textAlign: 'center',
  },
  logoutButton: {
    marginTop: Spacing.md,
  },
});
