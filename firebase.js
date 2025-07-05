// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { GoogleSignin} from '@react-native-google-signin/google-signin';
import { Platform } from 'react-native';

// Função auxiliar para verificar se o Firebase já foi inicializado
const isFirebaseInitialized = () => {
  try {
    return global.firebaseApp !== undefined;
  } catch (e) {
    return false;
  }
};
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC1rsJWvx-hSnqHFEqGQPAeWuGF-QPUBMg",
    authDomain: "task-list-app-313be.firebaseapp.com",
    projectId: "task-list-app-313be",
    storageBucket: "task-list-app-313be.firebasestorage.app",
    messagingSenderId: "127212641212",
    appId: "1:127212641212:web:e936358dade7adef1429b9",
    measurementId: "G-1VMN134WYD"
};

// Configure GoogleSignin apenas para plataformas mobile
if (Platform.OS !== 'web') {
    GoogleSignin.configure({
        webClientId: '127212641212-ac40cc1cd3la23oasr1skkec9n2l0m2f.apps.googleusercontent.com',
    });
}

// Initialize Firebase
let app;
let auth;

try {
  // Inicializa o Firebase apenas uma vez
  if (!global.firebaseApp) {
    app = initializeApp(firebaseConfig);
    global.firebaseApp = app;
  } else {
    app = global.firebaseApp;
  }

  // Obtém a autenticação do Firebase
  auth = getAuth(app);

  // Inicializa o Analytics apenas na web (opcional)
  if (Platform.OS === 'web') {
    try {
      getAnalytics(app);
    } catch (error) {
      console.log('Analytics não disponível:', error);
    }
  }
} catch (error) {
  console.error('Erro ao inicializar Firebase:', error);
}

export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export { app, auth };
