import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {AiOutlineEdit} from 'react-icons/ai';
import { UserAuth } from '../Context/AuthContext';
import { getDatabase, ref, child, get, update } from "firebase/database";

export default function FormDialog(props) {
   const { user } = UserAuth();
   const db = getDatabase();
   const [open, setOpen] = React.useState(false);
   const [data, setData] = React.useState({});
   const spotKey = props.spotKey;
   const dbRef = ref(getDatabase());
   const [newData, setNewData] = React.useState({
      date: '',
      location: ''
   });

   // Haetaan tietyn bongauksen tiedot tietokannasta spotKeyn ja uid:n perusteella
   get(child(dbRef, `users/${user.uid}/${spotKey}`)).then((snapshot) => {
      setData(snapshot.val());
      
   })
  
   const handleClickOpen = () => {
      setOpen(true);
      setNewData({
         date: data.date,
         location: data.location
      })
   };

   const handleClose = () => {
      setOpen(false);
   };
   
   const handleInputChange = (event) => {
      setNewData({...newData, [event.target.name]: event.target.value});
   }

   // Päivitetään data tietokantaan
   const updateData = () => {
      update(ref(db, 'users/' + user.uid + "/" + spotKey),
      {
         location: newData.location,
         date: newData.date
      });
      setOpen(false);
   };



  return (
    <div>
      <Button className ="tableButton"  onClick={handleClickOpen}>
         <AiOutlineEdit size={20} color={'yellow'}/>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Muokkaa Bongausta!</DialogTitle>
        <DialogContent>
         <TextField
            margin="dense"
            name="date"
            value={newData.date}
            onChange={e => handleInputChange(e)}
            label="Päivämäärä"
            fullWidth
            variant="standard"
         />
         <TextField
            margin="dense"
            name="location"
            value={newData.location}
            onChange={e => handleInputChange(e)}
            label="Osoite"
            fullWidth
            variant="standard"
         />
         </DialogContent>
         <DialogActions>
            <Button onClick={handleClose}>Peruuta</Button>
            <Button onClick={updateData}>Tallenna</Button>
         </DialogActions>
      </Dialog>
    </div>
  );
}