import { getAuth as RNGetAuth, GoogleAuthProvider as RNGoogleAuthProvider, signInWithCredential as RNSignInWithCredential } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { makeRedirectUri } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { createContext, useContext, useState } from 'react';
import { Platform } from 'react-native';
import { auth as firebaseAuth } from './firebaseConfig';

type User = {
  id: string;
  name: string;
  email: string;
  photoUrl?: string;
  bio?: string;
  provider?: 'google' | 'github';
  username?: string; // Nome de usuário do GitHub
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isSignedIn: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfile: (userData: Partial<User>) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Função de login com Google compatível com web e mobile
  async function signInWithGoogle() {
    setIsLoading(true);
    try {
      if (Platform.OS === 'web') {
        try {
          // Implementação para Web usando Firebase Auth
          const provider = new GoogleAuthProvider();
          const result = await signInWithPopup(firebaseAuth, provider);

          if (result.user) {
          setUser({
            id: result.user.uid,
            name: result.user.displayName || '',
            email: result.user.email || '',
            photoUrl: result.user.photoURL || undefined,
            provider: 'google'
          });
        }
        } catch (error) {
          console.error('Erro específico de autenticação web:', error);
          // Implementar uma alternativa como login anônimo ou mock para demo
          const mockUser: User = {
            id: 'web-mock-' + Date.now(),
            name: 'Usuário Web Demo',
            email: 'usuario.web@exemplo.com',
            photoUrl: 'https://i.pravatar.cc/300?img=12',
            provider: 'google'
          };
          setUser(mockUser);
        }
      } else {
        // Implementação para Mobile usando GoogleSignin
        await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
        const signInResult = await GoogleSignin.signIn();

        let idToken = signInResult.data?.idToken;
        if (!idToken) {
          throw new Error('No ID token found');
        }

        // Create a Google credential with the token
        const googleCredential = RNGoogleAuthProvider.credential(idToken);
        // Sign-in the user with the credential
        const userCredential = await RNSignInWithCredential(RNGetAuth(), googleCredential);

        if (userCredential.user) {
          setUser({
            id: userCredential.user.uid,
            name: userCredential.user.displayName || '',
            email: userCredential.user.email || '',
            photoUrl: userCredential.user.photoURL || undefined,
            provider: 'google'
          });
        }
      }
    } catch (error) {
      console.error('Erro ao fazer login com Google:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  const signInWithGithub = async () => {
    setIsLoading(true);
    try {
      if (Platform.OS === 'web') {
        // Implementação para Web usando Firebase Auth
        const provider = new GithubAuthProvider();
        // Adicionar escopos para obter informações adicionais do usuário
        provider.addScope('user:email');
        provider.addScope('read:user');
        
        const result = await signInWithPopup(firebaseAuth, provider);
        
        if (result.user) {
          // Obter informações adicionais do usuário do GitHub
          const credential = GithubAuthProvider.credentialFromResult(result);
          const token = credential?.accessToken;
          
          let githubUserData = null;
          if (token) {
            try {
              const response = await fetch('https://api.github.com/user', {
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Accept': 'application/vnd.github.v3+json'
                }
              });
              githubUserData = await response.json();
            } catch (error) {
              console.error('Erro ao buscar dados do GitHub:', error);
            }
          }
          
          setUser({
            id: result.user.uid,
            name: githubUserData?.name || result.user.displayName || githubUserData?.login || '',
            email: result.user.email || '',
            photoUrl: result.user.photoURL || githubUserData?.avatar_url || undefined,
            bio: githubUserData?.bio || undefined,
            provider: 'github',
            username: githubUserData?.login || undefined
          });
        }
      } else {
        // Para mobile, vamos usar o expo-web-browser e expo-auth-session
        const redirectUrl = makeRedirectUri({
          scheme: 'your-app-scheme', // Substitua pelo scheme do seu app
          path: 'auth'
        });

        const authUrl = `https://github.com/login/oauth/authorize?` +
          `client_id=${'Iv23liE7sGW6aiZaWdj8'}&` +
          `redirect_uri=${encodeURIComponent(redirectUrl)}&` +
          `scope=user`;

        const result = await WebBrowser.openAuthSessionAsync(
          authUrl,
          redirectUrl
        );

        if (result.type === 'success') {
          // Aqui você implementaria a lógica para trocar o código por um token
          // e criar uma credencial do GitHub para o Firebase
          const mockUser: User = {
            id: 'github-mock-' + Date.now(),
            name: 'Usuário GitHub',
            email: 'usuario.github@github.com',
            photoUrl: 'https://i.pravatar.cc/300?img=5',
            provider: 'github',
            username: 'github-user-demo'
          };
          setUser(mockUser);
        }
      }
    } catch (error) {
      console.error('Erro ao fazer login com GitHub:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Função de logout simplificada para demo frontend
  const signOut = async () => {
    setUser(null);
  };

  // Função de atualização do perfil simplificada para demo frontend
  const updateUserProfile = async (userData: Partial<User>) => {
    if (!user) return;

    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isSignedIn: !!user,
        signInWithGoogle,
        signInWithGithub,
        signOut,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};