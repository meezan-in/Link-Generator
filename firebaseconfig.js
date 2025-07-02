// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC791_5SsrDRfn5Xh1-cxzlXreKYBU1e0A",
  authDomain: "regal-airway-426618-d0.firebaseapp.com",
  projectId: "regal-airway-426618-d0",
  storageBucket: "regal-airway-426618-d0.appspot.com",
  messagingSenderId: "998791037081",
  appId: "1:998791037081:web:e80e0aecf77ce1938e7808",
  measurementId: "G-BZ1WSSVTR7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let analytics;
if (typeof window !== "undefined") {
  // Check if analytics is supported in the current environment
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, analytics };
