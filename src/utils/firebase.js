
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "netflixgpt-acd08.firebaseapp.com",
  projectId: "netflixgpt-acd08",
  storageBucket: "netflixgpt-acd08.firebasestorage.app",
  messagingSenderId: "212831312483",
  appId: "1:212831312483:web:454241625641ea83c4b656",
  measurementId: "G-NNGN3J51ZX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();