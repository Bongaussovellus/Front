import { useState, useEffect } from 'react';
import Login from './components/Login';
import Home from './components/Home';
import Map from './components/Map';
import History from './components/History';
import firebase from './service/firebase';
import { Tabs, Tab } from '@mui/material';
import { db } from './service/firebase';
import {collection, addDoc, getFirestore, getDocs, doc, setDoc} from "firebase/firestore";
import { getDatabase, ref, set } from "firebase/database";
import './App.css';
import AddRegistry from './components/AddRegistry';



function App() {
  const [user, setUser] = useState(null);
  const [value, setValue] = useState('one');

  const handleChange = (event, value) => {
    setValue(value);
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUser(user);
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
   /*function writeUserData(userId) {
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
   };*/



  return (
    <div className="app">
      <Tabs centered={true} value={value} onChange={handleChange}>
        <Tab value="one" label="Home" />
        <Tab value="two" label="Map"/>
        <Tab value="three" label="History" />
        <Tab value="four" label="New spot" />
      </Tabs>
      
      {user ? <Home user={user} /> : <Login />}
      {value === 'two' && <div><Map/></div>}
      {value === 'three' && <div><History/></div>}
      {value === 'four' && <div><AddRegistry/></div>}
      
      
    </div>
  );
}

export default App;
