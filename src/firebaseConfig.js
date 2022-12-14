import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "bongausprojekti.firebaseapp.com",
  projectId: "bongausprojekti",
  storageBucket: "bongausprojekti.appspot.com",
  messagingSenderId: "587839363768",
  appId: "1:587839363768:web:037f19cc04440952c4724d",
  measurementId: "G-09S3L75TXC",
  databaseURL:
    "https://bongausprojekti-default-rtdb.europe-west1.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
