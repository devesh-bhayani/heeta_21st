import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD4Us95HLLwGQlkEYeKdNSiQ_R-Rx8Xq0M",
  authDomain: "heeta21birthday.firebaseapp.com",
  projectId: "heeta21birthday",
  storageBucket: "heeta21birthday.firebasestorage.app",
  messagingSenderId: "746926032419",
  appId: "1:746926032419:web:872f386c8194eadb831396",
  measurementId: "G-4B1L4HKZBJ"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export { db };
