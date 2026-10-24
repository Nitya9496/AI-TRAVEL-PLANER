import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup as fbSignInWithPopup,
  signInWithEmailAndPassword as fbSignInWithEmailAndPassword,
  createUserWithEmailAndPassword as fbCreateUserWithEmailAndPassword,
  RecaptchaVerifier as fbRecaptchaVerifier,
  signInWithPhoneNumber as fbSignInWithPhoneNumber,
  signInAnonymously as fbSignInAnonymously,
  updateProfile as fbUpdateProfile,
  signOut as fbSignOut,
  onAuthStateChanged as fbOnAuthStateChanged,
} from 'firebase/auth';

// Firebase Client Web Config (with fallback for Vercel/Production deployment)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDbY4SYAQ7iuCrVaOL0QhGX6Sh4ZkbOpOQ",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "namma-yatra-5c417.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "namma-yatra-5c417",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "namma-yatra-5c417.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "405415168793",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:405415168793:web:f3642e246f5313cdcb5388",
};

let app = null;
let auth = null;
let googleProvider = null;

try {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: 'select_account',
  });
} catch (err) {
  console.warn('Firebase initialization notice:', err);
}

// Resilient wrapper functions that never throw uncaught bundle crashes
export const signInWithPopup = async (a, p) => {
  if (!auth) throw new Error('Firebase Auth is not initialized');
  return fbSignInWithPopup(auth, p || googleProvider);
};

export const signInWithEmailAndPassword = async (a, email, password) => {
  if (!auth) throw new Error('Firebase Auth is not initialized');
  return fbSignInWithEmailAndPassword(auth, email, password);
};

export const createUserWithEmailAndPassword = async (a, email, password) => {
  if (!auth) throw new Error('Firebase Auth is not initialized');
  return fbCreateUserWithEmailAndPassword(auth, email, password);
};

export const signInWithPhoneNumber = async (a, phone, verifier) => {
  if (!auth) throw new Error('Firebase Auth is not initialized');
  return fbSignInWithPhoneNumber(auth, phone, verifier);
};

export const signInAnonymously = async (a) => {
  if (!auth) throw new Error('Firebase Auth is not initialized');
  return fbSignInAnonymously(auth);
};

export const updateProfile = async (user, profile) => {
  return fbUpdateProfile(user, profile);
};

export const signOut = async (a) => {
  if (!auth) return;
  return fbSignOut(auth);
};

export const onAuthStateChanged = (a, callback) => {
  if (!auth) {
    callback(null);
    return () => {};
  }
  return fbOnAuthStateChanged(auth, callback);
};

export const RecaptchaVerifier = fbRecaptchaVerifier;

export { app, auth, googleProvider };
