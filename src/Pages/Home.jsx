import React from 'react';
import { UserAuth } from '../Context/AuthContext';
import '../Styles/App.css'
import { getDatabase, ref, child, get, remove } from "firebase/database";
import { useState } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';


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
  //console.log(items);

  const deleteItem = (id) => {
    remove(
      ref(db, 'users/' + user.uid + "/" + id)
    );
    alert("Bongaus poistettu");
  }

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
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
  <div class="home" >
  <h1>BONGAUKSET</h1>
  <ThemeProvider theme={darkTheme}>
  <CssBaseline />
  <TableContainer component={Paper} className="Table">
  <Table  >
    <TableHead>
      <TableRow>
        <TableCell>Rekisterinumero</TableCell>
        <TableCell>Päivä</TableCell>
        <TableCell>Osoite</TableCell>
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
          <TableCell>{user.location}</TableCell>
          <TableCell>
          <Button variant='outlined'> Edit </Button>
          <Button variant='outlined' color='error' onClick={() => deleteItem(user.key)}> Delete </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
</ThemeProvider>
</div>
);
}
export default Home