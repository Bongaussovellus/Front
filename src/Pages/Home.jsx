import React from 'react';
import { UserAuth } from '../Context/AuthContext';
import '../Styles/App.css'
import { getDatabase, ref, push, set, onValue, child, get } from "firebase/database";
import { useEffect, useState } from "react";





const Home = () => {
  const { user } = UserAuth();
  const db = getDatabase();
  const [items, setItems] = useState([]);
  
  // HAKEE KÄYTTÄJÄN UID PERUSTEELLA TIEDOT BONGAUKSISTA
  const dbRef = ref(getDatabase());
  get(child(dbRef, `users/${user.uid}`)).then((snapshot) => {
    if(snapshot.exists()) {
      const data = snapshot.val();
      const mappedItems = data ? Object.keys(data).map(key => ({key, ...data[key]})) : [];
      setItems(mappedItems); 
      
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
  
  return (
    <div>
      <div class="title">
      <img src={user.photoURL}  class="Img"/>
        <h3 >{user?.displayName} <p></p>Tervetuloa bongailemaan</h3>
      </div>
      {items.map((user) => { 
        return <div>
          <h1>date: {user.date}</h1>
          <h1>reknro: {user.registernumber}</h1>
        </div>})}
    </div>
  );
};

export default Home;