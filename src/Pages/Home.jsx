import React from 'react';
import { UserAuth } from '../Context/AuthContext';
import '../Styles/App.css'
import { getDatabase, ref, push, set, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import App from "../App";





const Home = () => {
  const { user } = UserAuth();
  const db = getDatabase();
  const [items, setItems] = useState([]);


  useEffect(() => {
    const itemsRef = ref(db, 'users/');
    onValue(itemsRef, snapshot => {
      const data = snapshot.val();
      const mappedItems = data ? Object.keys(data).map(key => ({key, ...data[key]})) : [];
      setItems(mappedItems); 
      console.log(mappedItems);   
    });
  }, []);

  return (
    <div>
      <div class="title">
      <img src={user.photoURL}  class="Avatar"/>
        <h3 >{user?.displayName} <p></p>Tervetuloa bongailemaan</h3>
      </div>
      {items.map((user) => { 
        return <div>
          <h1>date: {user.spottings.spot.date}</h1>
          <h1>reknro: {user.spottings.spot.registernumber}</h1>
        </div>})}
    </div>
  );
};

export default Home;