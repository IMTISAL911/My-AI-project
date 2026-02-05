// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB9iHUMnzKd7Z1yo6HpldCsMHje_HgUecE",
  authDomain: "myaiweb-5848d.firebaseapp.com",
  databaseURL: "https://myaiweb-5848d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "myaiweb-5848d",
  storageBucket: "myaiweb-5848d.firebasestorage.app",
  messagingSenderId: "89034324997",
  appId: "1:89034324997:web:bfa2f46f49f9ee7d8a306c",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
