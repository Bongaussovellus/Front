import { useContext, createContext, useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../service/firebase';
/*import { getDatabase} from "firebase/database";
import firebase from '../service/firebase';
import {doc, setDoc} from "firebase/firestore";
import { db } from '../service/firebase';
*/

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const logOut = () => {
      signOut(auth)
  }
/*
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUser(user);
      addUser(user.uid);
    })
  }, [])

  function addUser(userId) {
    const database = getDatabase();
    setDoc(doc(db, "users", userId), {
      name: userId
    });
  }
*/
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log('User', currentUser)
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ googleSignIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};