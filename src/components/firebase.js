import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD5cfsGpyfUZQbfRotT4b7QVPrSuRpj_m0",
  authDomain: "farm-c2e6b.firebaseapp.com",
  projectId: "farm-c2e6b",
  storageBucket: "farm-c2e6b.appspot.com",
  messagingSenderId: "186476381582",
  appId: "1:186476381582:web:808206fcee3c1a2538d0df",
  measurementId: "G-7N8TN69LNW",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
