import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBhsoVbLn_lIt9gkq3kn_OqLFV7ycxeySY",
  authDomain: "movieapp-64872.firebaseapp.com",
  projectId: "movieapp-64872",
  storageBucket: "movieapp-64872.firebasestorage.app",
  messagingSenderId: "412611627914",
  appId: "1:412611627914:web:cb5308119471e16ee2d673"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();