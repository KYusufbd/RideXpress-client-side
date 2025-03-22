import "dotenv";
import { getAuth } from "firebase/auth";

const fbConfig = import.meta.env;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: fbConfig.VITE_apiKey,
  authDomain: fbConfig.VITE_authDomain,
  projectId: fbConfig.VITE_projectId,
  storageBucket: fbConfig.VITE_storageBucket,
  messagingSenderId: fbConfig.VITE_messagingSenderId,
  appId: fbConfig.VITE_appId,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
