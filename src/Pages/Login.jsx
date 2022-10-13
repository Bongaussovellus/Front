import React, { useEffect } from 'react';
import {GoogleButton} from 'react-google-button'
import { UserAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../Styles/App.css'

const Login = () => {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
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
      <h1 style={{marginTop:'50px'}}>Bongailusovellus</h1>
      <h2 >Kirjaudu sisään</h2>
      <div>
        <h3>Pääset kirjaamaan bongauksiasi kirjautumalla sisään!</h3>
        <GoogleButton class="button" onClick={handleGoogleSignIn} />
      </div>
    </div>
  );
};

export default Login;