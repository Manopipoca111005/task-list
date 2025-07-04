// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth};
