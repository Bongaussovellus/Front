import React, { useEffect, useState } from 'react';
import {GoogleButton} from 'react-google-button'
import { UserAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../Styles/App.css'

const Login = () => {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();
  const [addUser, setAddUser] = useState(null);

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
<<<<<<< HEAD
    <div>
      <h1 style={{marginTop:'50px'}}>Tervetuloa Bongailusovellukseen</h1>
     
      <div>  
        
        <h2> Bongaussovellus on ilmainen sovellus, jonka avulla voit pitää kirjaa rekisterikilpibongailuistasi!</h2>
        <h3>Kirjaudu ilmaiseksi sisään Google-tunnuksellasi ja ala bongailemaan !</h3>
        <GoogleButton class="button" onClick={handleGoogleSignIn} />
=======
    <div className='log'>
      <h1 className='logos'>Bongailusovellus</h1>
      <h2  style={{marginTop:'5%'}} >Kirjaudu sisään</h2>
      <div>
        <h3>Pääset kirjaamaan bongauksiasi kirjautumalla sisään!</h3>
        <GoogleButton style={{marginLeft:"auto", marginRight:"auto", marginTop:"3%"}} className="GoogleButton" onClick={handleGoogleSignIn} />
>>>>>>> 553923393edb950d629b08c2eaec1b2666d99efb
      </div>
    </div>
  );
};

export default Login;