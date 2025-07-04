import React, { createContext, useContext, useState } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  photoUrl?: string;
  bio?: string;
  provider?: 'google' | 'github';
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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Função de login com Google simplificada para demo frontend
  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      // Simula um atraso de resposta da API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Usuário demo para navegação frontend
      const mockUser: User = {
        id: '1',
        name: 'Usuário Google',
        email: 'usuario.google@gmail.com',
        photoUrl: 'https://i.pravatar.cc/300?img=3',
        bio: 'Um usuário que fez login pelo Google',
        provider: 'google'
      };

      setUser(mockUser);
    } catch (error) {
      console.error('Erro ao fazer login com Google:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Função de login com GitHub simplificada para demo frontend
  const signInWithGithub = async () => {
    setIsLoading(true);
    try {
      // Simula um atraso de resposta da API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Usuário demo para navegação frontend
      const mockUser: User = {
        id: '2',
        name: 'Usuário GitHub',
        email: 'usuario.github@github.com',
        photoUrl: 'https://i.pravatar.cc/300?img=5',
        bio: 'Um usuário que fez login pelo GitHub',
        provider: 'github'
      };

      setUser(mockUser);
    } catch (error) {
      console.error('Erro ao fazer login com GitHub:', error);
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
