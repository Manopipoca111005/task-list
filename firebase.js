// Import the functions you need from the SDKs you need
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { Platform } from 'react-native';

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

  // Inicializa o Analytics apenas na web (opcional)
  if (Platform.OS === 'web') {
    try {
      getAnalytics(app);
    } catch (error) {
      console.log('Analytics não disponível:', error);
    }
  }

  // Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export { app, db };

