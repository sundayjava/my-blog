import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCMN87PNL9_RydKXV1ba8cQxlezmxxAMqQ",
  authDomain: "newstopedia-b9e3a.firebaseapp.com",
  projectId: "newstopedia-b9e3a",
  storageBucket: "newstopedia-b9e3a.appspot.com",
  messagingSenderId: "893512251202",
  appId: "1:893512251202:web:b9f866b77dd6224c9f7adb",
  measurementId: "G-9NGW544J57",
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const db = getFirestore(app)
export const auth = getAuth(app)
