import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "@/environments";

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);

// import { initializeApp } from "firebase/app";
// import { initializeAuth, browserSessionPersistence } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { firebaseConfig } from "@/environments";

// // Initialize Firebase App
// export const FIREBASE_APP = initializeApp(firebaseConfig);

// // Initialize Firestore
// export const FIREBASE_DB = getFirestore(FIREBASE_APP);

// // Initialize Auth with memory persistence
// export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
//   persistence: browserSessionPersistence,
// });
