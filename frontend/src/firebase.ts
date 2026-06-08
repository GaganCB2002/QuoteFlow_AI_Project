// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjPmnl3y4WtlzXI8v2B5wn7s50FxDEAcw",
  authDomain: "quoteflow-4ff97.firebaseapp.com",
  projectId: "quoteflow-4ff97",
  storageBucket: "quoteflow-4ff97.firebasestorage.app",
  messagingSenderId: "349780675865",
  appId: "1:349780675865:web:d7bbf50c6c48256f188988",
  measurementId: "G-WYWBDJCM4F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export default app;
