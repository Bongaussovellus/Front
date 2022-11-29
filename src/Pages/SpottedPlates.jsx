import React from 'react';
import { UserAuth } from '../Context/AuthContext';
import '../Styles/App.css'
import { getDatabase, ref, child, get, remove } from "firebase/database";
import { useState } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import {RiDeleteBinLine } from 'react-icons/ri';
import UpdateSpot from '../Components/UpdateSpot';

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
 
//Poistaa valitun bongauksen
  const deleteItem = (id) => {
    remove(
      ref(db, 'users/' + user.uid + "/" + id)
    );
    alert("Bongaus poistettu");
    window.location.reload(false);
  }

//Taulukon väritys
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  

return (
  <div class="home" >
  <h1>BONGAUKSET</h1>
  <ThemeProvider theme={darkTheme}>
  <CssBaseline />
  <TableContainer component={Paper} className="Table">
  <Table className="table" >
    <TableHead className="Tablerow">
      <TableRow>
        <TableCell width="15%" >Rekisterinumero</TableCell>
        <TableCell width="15%">Päivä</TableCell>
        <TableCell width="20%">Osoite</TableCell>
        <TableCell width="1%"></TableCell>
        <TableCell width="1%"></TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {items.map((user) => (
        <TableRow
          key={user.key}
        >
          <TableCell >
            {user.registernumber}
          </TableCell>
          <TableCell>{user.date}</TableCell>
          <TableCell>{user.location}</TableCell>
          <TableCell>
          <UpdateSpot spotKey={user.key}></UpdateSpot>
          </TableCell>
          <TableCell>
          <button className="tableButton" onClick={() => deleteItem(user.key)}><RiDeleteBinLine color={'red'}  size={20}/></button>
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