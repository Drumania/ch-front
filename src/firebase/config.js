// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyADRDIX7OcUE93XHutGwESNv5lD5IlXKkM",
  authDomain: "checklist-3eda5.firebaseapp.com",
  projectId: "checklist-3eda5",
  storageBucket: "checklist-3eda5.firebasestorage.app",
  messagingSenderId: "200531921761",
  appId: "1:200531921761:web:861856abc6bb1828499320",
};

const app = initializeApp(firebaseConfig);

// 👇 Estas dos líneas son clave
export const auth = getAuth(app);
export const db = getFirestore(app);
