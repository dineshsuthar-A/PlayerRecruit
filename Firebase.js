// // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyACue9sxMY41h1qC2UpH8XW_iktS91ytuM",
    authDomain: "recruit-60cc0.firebaseapp.com",
    projectId: "recruit-60cc0",
    storageBucket: "recruit-60cc0.appspot.com",
    messagingSenderId: "153666077433",
    appId: "1:153666077433:web:d57cafbac226147688d828",
    measurementId: "G-GEFHQN51B7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
