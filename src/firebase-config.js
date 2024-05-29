// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2LfWGsIxwIq8nWYwR-RW3zR6-_eRcLlg",
  authDomain: "phonebook-179a6.firebaseapp.com",
  projectId: "phonebook-179a6",
  storageBucket: "phonebook-179a6.appspot.com",
  messagingSenderId: "420346644082",
  appId: "1:420346644082:web:bdde265726f2dbdd18a4eb",
  measurementId: "G-EXE5XDWW85"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const functions = getFunctions(app);

export { db, auth, analytics, app, functions };