import React, { useEffect, useState } from 'react';
import {GoogleButton} from 'react-google-button'
import { UserAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../Styles/App.css'

const Login = () => {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();
  const [addUser, setAddUser] = useState(null);

  //Google-tilille kirjautuminen 
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      setAddUser(user);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  

  useEffect(() => {
    if (user != null) {
      navigate('/Home');
    }
    
  }, [user]);

  return (
    <div>
      <h1 style={{marginTop:'50px'}}>SPOT<a className='it'>it</a></h1>
     
      <div>  
        
        <h2>Mikä on SPOT<a className='it'>it</a> sovellus?</h2>
        <h3>SPOT<a className='it'>it</a> on selainpohjainen ilmainen applikaatio, joka auttaa hauskassa rekisterikilpibongaus-harrastuksessa!</h3>
        <h3>Tarkoituksena on bongailla reksiterikilpiä järjestyksessä. Kirjaudu sisään Google-tunnuksillasi ja olet valmiina aloittamaan bongailun.</h3> 
        <h3>Voit aloittaa pelin löytämällä rekisterikilven numero 1. Jos olet jo aloittanut pelin, voit jatkaa merkkaamalla seuraavan bongaamasi rekisterikilven</h3>

        <h3>Kartta-osiosta voit merkata sijainnin, jossa bongaat rekisterikilven. Bongaukset tallentuu omalle välilehdelleen.</h3>
        <GoogleButton class="button" onClick={handleGoogleSignIn}/>
      </div>
      <div>
        <h2></h2>
      </div>
    </div>
    
  );
};

export default Login;