import { useEffect } from 'react';
import { Text, View, ActivityIndicator, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../contexts/ThemeContext';

export default function Index() {
  const router = useRouter();
  const { colors } = useTheme();

  useEffect(() => {
    // Navegação direta para facilitar o uso do frontend
    setTimeout(() => {
      router.replace('/login');
    }, 1500);
  }, [router]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
      }}
    >
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={{ marginTop: 20, color: colors.text }}>Carregando...</Text>
    </View>
  );
}
