import { useState, useEffect } from 'react';
import Login from './components/Login';
import Home from './components/Home';
import Map from './components/Map';
import History from './components/History';
import firebase from './service/firebase';
import { Tabs, Tab } from '@mui/material';

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

  console.log(user);

  return (
    <div className="app">
      <Tabs value={value} onChange={handleChange}>
        <Tab value="one" label="Home" />
        <Tab value="two" label="Map"/>
        <Tab value="three" label="History" />
      </Tabs>
      
      {value === 'two' && <div><Map/></div>}
      {value === 'three' && <div><History/></div>}
      {user ? <Home user={user} /> : <Login />}
    </div>
  );
}

export default App;
