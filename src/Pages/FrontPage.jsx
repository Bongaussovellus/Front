import React, { useState } from 'react'
import '../Styles/App.css'
import './Home'
import { db, auth } from '../service/firebase'
import { getDatabase, ref, query, orderByChild, limitToLast, limitToFirst, get, child, snapshot, orderByKey } from 'firebase/database';
import { UserAuth } from '../Context/AuthContext';

const FrontPage = () => {
  const db = getDatabase();
  const { user } = UserAuth();
  const [item, setItem] = useState([]);

  const latestRef = query(ref(db, 'users/' + user.uid), limitToLast(1));
  get(latestRef).then((snapshot) => {
    const data = snapshot.val();
    const mappedItems = data ? Object.keys(data).map(key => ({key, ...data[key]})) : 
    [];
    setItem(mappedItems);
  })

  

    return (
      <div class="frontpage">
        <h1>Tervetuloa käyttämään <br></br>SPOT<a className='it'>it</a>-sovellusta!</h1>
        {item.map((item) => (
          <div key={item.registernumber}>
            <h2>Viimeisin bongaus: {item.registernumber} </h2>
          </div>  
        ))}
      </div>
    )
  }
  
  export default FrontPage;