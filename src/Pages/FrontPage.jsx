import React, { useState } from 'react'
import '../Styles/App.css'
import './SpottedPlates'
import { getDatabase, ref, query, limitToLast, get } from 'firebase/database';
import { UserAuth } from '../Context/AuthContext';

const FrontPage = () => {
  const db = getDatabase();
  const { user } = UserAuth();
  const [item, setItem] = useState([]);
  const [nextRegNum, setNextRegNum] = useState(null);

  // Haetaan viimeisin bongaus databasesta
  const latestRef = query(ref(db, 'users/' + user.uid), limitToLast(1));
  get(latestRef).then((snapshot) => {
    const data = snapshot.val();
    const mappedItems = data ? Object.keys(data).map(key => ({key, ...data[key]})) : 
    [];
    setItem(mappedItems);
    updateNext(); 
  })

  // Lasketaan seuraavan bongattavan rekisterikilven numero.
 function updateNext() {
    let text = item[0].registernumber;
    const textArray = text.split('-');
    const regnum = parseInt(textArray[1]);
    setNextRegNum(regnum + 1);
  }
 

    return (
      <div class="frontpage">
        <h1>Tervetuloa käyttämään <br></br>SPOT<a className='it'>it</a>-sovellusta!</h1>
        {item.map((item) => (
          <div className='next' key={item.registernumber}>
            <h2>Edellinen bongauksesi: <br></br><br></br> {item.registernumber} </h2>
            <h2>Seuraava bongattava rekisterinumerosi: <br></br><br></br> {nextRegNum}</h2>
          </div>  
        ))}
      </div>
    )
  }
  
  export default FrontPage ;