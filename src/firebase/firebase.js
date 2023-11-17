import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBBGpwhUOXldjsaPYQU6Fo3piErtsYFJW4",
  authDomain: "authtutorial-2b252.firebaseapp.com",
  projectId: "authtutorial-2b252",
  storageBucket: "authtutorial-2b252.appspot.com",
  messagingSenderId: "204374474957",
  appId: "1:204374474957:web:0d5d6d3ed7ad37dc5e2984",
  measurementId: "G-NPD6LGDEGM",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
