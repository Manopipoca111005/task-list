import { Stack } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { View, Text, ActivityIndicator } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

export default function AuthLayout() {
  const { isSignedIn, isLoading } = useAuth();
  const { colors } = useTheme();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (!isLoading && isSignedIn) {
      router.replace('/(tabs)');
    }
  }, [isSignedIn, isLoading, router]);

  if (isLoading) {
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

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    />
  );
}
