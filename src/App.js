import { useState, useEffect } from 'react';
import Login from './components/Login';
import Home from './components/Home';
import Map from './components/Map';
import History from './components/History';
import firebase from './service/firebase';
import { Tabs, Tab } from '@mui/material';
import { db } from './service/firebase';
import {collection, addDoc, getFirestore, getDocs, doc, setDoc} from "firebase/firestore";

import './App.css';



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

  const [testi, setTesti] = useState([]);
  const testiCollectionRef = collection(db, 'testi');

  useEffect(() => {
    const getTesti = async () => {
      const data = await getDocs(testiCollectionRef);
      setTesti(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }; 

    getTesti()
  }, []);



  return (
    <div className="app">
      <Tabs centered={true} value={value} onChange={handleChange}>
        <Tab value="one" label="Home" />
        <Tab value="two" label="Map"/>
        <Tab value="three" label="History" />
      </Tabs>
      
      {user ? <Home user={user} /> : <Login />}
      {value === 'two' && <div><Map/></div>}
      {value === 'three' && <div><History/></div>}
      
      
    </div>
  );
}

export default App;
