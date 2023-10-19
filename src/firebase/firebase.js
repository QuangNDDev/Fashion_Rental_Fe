import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBgUoMtTT2uOkXu7lgKnMof_985ut-2DhQ",
  authDomain: "oldcarshowroom-a25ea.firebaseapp.com",
  projectId: "oldcarshowroom-a25ea",
  storageBucket: "oldcarshowroom-a25ea.appspot.com",
  messagingSenderId: "850712331993",
  appId: "1:850712331993:web:e90e28537f744ecc0fa0c8",
  measurementId: "G-4ES3F5N82J",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
