// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import { initializeApp } from "firebase/app";
import {collection, addDoc, getFirestore, getDoc, doc, setDoc} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBBg6zHBVr-9qLWavt9utuY8HyRLMA05Gs",
  authDomain: "bongausprojekti.firebaseapp.com",
  projectId: "bongausprojekti",
  storageBucket: "bongausprojekti.appspot.com",
  messagingSenderId: "587839363768",
  appId: "1:587839363768:web:037f19cc04440952c4724d",
  measurementId: "G-09S3L75TXC",
  ndatabaseURL: "https://bongausprojekti.firebaseio.com"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


export const auth = firebase.auth()

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;