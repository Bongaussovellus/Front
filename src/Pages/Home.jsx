import React from 'react';
import { UserAuth } from '../Context/AuthContext';
import '../Styles/App.css'
import { getDatabase, ref, push, set, onValue, child, get } from "firebase/database";
import { useState } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


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
  
  /*return (
    <div class="home" content="width=device-width, initial-scale=1.0">
      <div class="title">
      <img src={user.photoURL}  class="Img"/>
        <h3 >{user?.displayName} <p></p>Tervetuloa bongailemaan </h3>
      </div>
      {items.map((user) => { 
        return <div>
          <h1>date: {user.date}</h1>
          <h1>reknro: {user.registernumber}</h1>
        </div>})}
    </div>
  );
};*/

return (
  <TableContainer component={Paper}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Numberplate</TableCell>
        <TableCell>Date</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {items.map((user) => (
        <TableRow
          key={user.registernumber}
        >
          <TableCell >
            {user.registernumber}
          </TableCell>
          <TableCell>{user.date}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
);
}
export default Home