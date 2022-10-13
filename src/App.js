import { useState, useEffect } from 'react';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Map from './Pages/Map';
import History from './Pages/History';
import Navbar from './Components/Navbar';
import Protected from './Components/Protected';
import FrontPage from './Pages/FrontPage';
import firebase from './service/firebase';
import { AuthContextProvider } from './Context/AuthContext';
import { db } from './service/firebase';
import {collection, addDoc, getFirestore, getDocs, doc, setDoc} from "firebase/firestore";
import { getDatabase, ref, set } from "firebase/database";
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import './Styles/App.css';

function App() {
 /* 
   function writeUserData(userId) {
    const database = getDatabase();
    set(ref(database, 'users/' + userId), {
      username: 'testi',
      email: 'email',
      bongaukset: {
        place: 'Mannerheimintie 50',
        reg: '10',
        date: '27.09.2022',
        time: '20:00'
      }
    });
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUser(user);
      addUser(user.uid);
    })
  }, [])

  //Testikoodia databasen toimintaan
  const [testi, setTesti] = useState([]);
  const testiCollectionRef = collection(db, 'testi');

  //Lisätään käyttäjä GoogleUID:n perusteella Firebasen users collectioniin.
  function addUser(userId) {
    const database = getDatabase();
    setDoc(doc(db, "users", userId), {
      name: userId
    });
  }

  //Renderöi datan collectionista ruudulle
  /*useEffect(() => {
    const getTesti = async () => {
      const data = await getDocs(testiCollectionRef);
      setTesti(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }; 
    getTesti()
  }, []);*/
  
  //Lisätään käyttäjä GoogleUID:n perusteella Realtime Databasen users collectioniin.
  function writeUserData(userId) {
    const database = getDatabase();
    set(ref(database, 'users/' + userId), {
      bongaukset: {
        place: 'Mannerheimintie 50',
        reg: '10',
        date: '27.09.2022',
        time: '20:00'
      }
    });
  };

  const [user, setUser] = useState(null);
  const [value, setValue] = useState('one');



  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUser(user);
    })
  }, [])
   function addUser(userId) {
    const database = getDatabase();
    setDoc(doc(db, "users", userId), {
      name: userId
    });
  }
  return (
    <div className='app'>
      <AuthContextProvider>
      <Protected>
              <Navbar />
          </Protected>    
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/FrontPage' element={
              <Protected>
                <FrontPage />
              </Protected>
            }
          />  
          <Route path='/home' element={
              <Protected>
                <Home />
              </Protected>
            }
          />
              <Route path='/Map' element={
              <Protected>
                <Map />
              </Protected>
            }
          />
              <Route path='/History' element={
              <Protected>
                <History />
              </Protected>
            }
          />                             
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
