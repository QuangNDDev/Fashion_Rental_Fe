// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBGpwhUOXldjsaPYQU6Fo3piErtsYFJW4",
  authDomain: "authtutorial-2b252.firebaseapp.com",
  projectId: "authtutorial-2b252",
  storageBucket: "authtutorial-2b252.appspot.com",
  messagingSenderId: "204374474957",
  appId: "1:204374474957:web:0d5d6d3ed7ad37dc5e2984",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
