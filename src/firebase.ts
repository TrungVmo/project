import { fbConfig, firebaseCf } from "./env";

import { initializeApp } from 'firebase/app';
import {getFirestore} from '@firebase/firestore';
import {getStorage} from '@firebase/storage';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig: firebaseCf = {
  apiKey: `${fbConfig.apiKey}`,
  authDomain: `${fbConfig.authDomain}`, 
  projectId: `${fbConfig.projectId}`,
  storageBucket: `${fbConfig.storageBucket}`,
  messagingSenderId: `${fbConfig.messagingSenderId}`,
  appId: `${fbConfig.appId}`,
};

const app = initializeApp(firebaseConfig);
const auth: any = getAuth(app);
const db= getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage, createUserWithEmailAndPassword, signInWithEmailAndPassword };

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {{
    signInWithPopup(auth, provider)
        .then((res) => {
            console.log(res);
            
        })
        .catch((err) => {
            console.log(err);
            
        })
}}
