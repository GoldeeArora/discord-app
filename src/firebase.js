import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyD9Qu2yS6ve7KmR2D0vWrkt51l0TFP7Dt4",
  authDomain: "discord-app-59aae.firebaseapp.com",
  projectId: "discord-app-59aae",
  storageBucket: "discord-app-59aae.appspot.com",
  messagingSenderId: "897963852688",
  appId: "1:897963852688:web:be87bbb0bb2b37c641a915",
  measurementId: "G-S1KN3WC2M7",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
export { auth, googleProvider, db }; //difference between default export and non default export.
