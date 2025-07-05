import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { Platform } from 'react-native';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1rsJWvx-hSnqHFEqGQPAeWuGF-QPUBMg",
  authDomain: "task-list-app-313be.firebaseapp.com",
  projectId: "task-list-app-313be",
  storageBucket: "task-list-app-313be.firebasestorage.app",
  messagingSenderId: "127212641212",
  appId: "1:127212641212:web:e936358dade7adef1429b9",
  measurementId: "G-1VMN134WYD"
};

// Inicializa o Firebase
let firebaseApp;

if (Platform.OS === 'web') {
  // Na web, verifica se já existe uma instância inicializada
  if (getApps().length === 0) {
    firebaseApp = initializeApp(firebaseConfig);
  } else {
    firebaseApp = getApp();
  }
} else {
  // No mobile, inicializa diretamente
  firebaseApp = initializeApp(firebaseConfig);
}

// Obtém a instância de autenticação
const auth = getAuth(firebaseApp);

export { firebaseApp, auth };
