// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMjgFjve2FPZLpzT7lTKn_zEoR0lUp08Q",
  authDomain: "emshop-bd626.firebaseapp.com",
  databaseURL: "https://emshop-bd626-default-rtdb.firebaseio.com",
  projectId: "emshop-bd626",
  storageBucket: "emshop-bd626.appspot.com",
  messagingSenderId: "1079472059989",
  appId: "1:1079472059989:web:d8887c7d2199be92b146dc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);

export { database, storage };
