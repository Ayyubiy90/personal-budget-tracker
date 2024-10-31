// Importing the necessary functions from Firebase SDK
import { initializeApp } from 'firebase/app'; // Function to initialize Firebase app
import { getAuth } from 'firebase/auth'; // Function to get Firebase authentication instance
import { getFirestore } from 'firebase/firestore'; // Function to get Firestore database instance

// Firebase configuration object containing the project's specific settings
const firebaseConfig = {
  // Replace with your Firebase config values
  apiKey: "YOUR_API_KEY", // API key for authenticating requests
  authDomain: "YOUR_AUTH_DOMAIN", // Domain for Firebase Authentication
  projectId: "YOUR_PROJECT_ID", // Unique identifier for the Firebase project
  storageBucket: "YOUR_STORAGE_BUCKET", // Cloud Storage bucket for storing files
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID", // Unique sender ID for Firebase Cloud Messaging
  appId: "YOUR_APP_ID" // Unique identifier for the Firebase app
};

// Initializing the Firebase app with the provided configuration
const app = initializeApp(firebaseConfig);

// Exporting the authentication instance for use in other parts of the application
export const auth = getAuth(app);

// Exporting the Firestore database instance for use in other parts of the application
export const db = getFirestore(app);