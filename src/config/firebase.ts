// Importing the necessary functions from Firebase SDK
import { initializeApp } from 'firebase/app'; // Function to initialize Firebase app
import { getAuth } from 'firebase/auth'; // Function to get Firebase authentication instance
import { getFirestore } from 'firebase/firestore'; // Function to get Firestore database instance

// Firebase configuration object containing the project's specific settings
const firebaseConfig = {
  // Replace with your Firebase config values
  apiKey: "AIzaSyDk1-R0tomUVuTqIJLGT00G9BHB8INj2fE", // API key for authenticating requests
  authDomain: "personal-budget-tracker-b2a58.firebaseapp.com", // Domain for Firebase Authentication
  projectId: "personal-budget-tracker-b2a58", // Unique identifier for the Firebase project
  storageBucket: "personal-budget-tracker-b2a58.firebasestorage.app", // Cloud Storage bucket for storing files
  messagingSenderId: "454968228018", // Unique sender ID for Firebase Cloud Messaging
  appId: "1:454968228018:web:38bb2639e4f456218571ab" // Unique identifier for the Firebase app  
};

// Initializing the Firebase app with the provided configuration
const app = initializeApp(firebaseConfig);

// Exporting the authentication instance for use in other parts of the application
export const auth = getAuth(app);

// Exporting the Firestore database instance for use in other parts of the application
export const db = getFirestore(app);