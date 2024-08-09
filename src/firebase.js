import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAJ2ic8z3J7Wh-WaaqCYLoY-TnDseS6HGc",
  authDomain: "twitter-clone-udemy-6a0af.firebaseapp.com",
  projectId: "twitter-clone-udemy-6a0af",
  storageBucket: "twitter-clone-udemy-6a0af.appspot.com",
  messagingSenderId: "278839848968",
  appId: "1:278839848968:web:98bc9829ef1c0f8aa661bd"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
