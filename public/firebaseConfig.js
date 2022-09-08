
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBBg6zHBVr-9qLWavt9utuY8HyRLMA05Gs",
  authDomain: "bongausprojekti.firebaseapp.com",
  projectId: "bongausprojekti",
  storageBucket: "bongausprojekti.appspot.com",
  messagingSenderId: "587839363768",
  appId: "1:587839363768:web:037f19cc04440952c4724d",
  measurementId: "G-09S3L75TXC"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);