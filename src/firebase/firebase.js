import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {
  getAuth,
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD9gJH6SimizV5KWjR0-ICrlSZOLLjEczc",
  authDomain: "pass-2384b.firebaseapp.com",
  projectId: "pass-2384b",
  storageBucket: "pass-2384b.appspot.com",
  messagingSenderId: "1062952416923",
  appId: "1:1062952416923:web:9cf22628d579096e4bb83e",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export function setUpRecaptha(number) {
  const recaptchaVerifier = new RecaptchaVerifier(
    auth,
    "recaptcha-container",
    {}
  );
  recaptchaVerifier.render();
  return signInWithPhoneNumber(auth, number, recaptchaVerifier);
}
