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
    <div className='log'>
      <h1 className='logos'>Bongailusovellus</h1>
      <h2  style={{marginTop:'5%'}} >Kirjaudu sisään</h2>
      <div>
        <h3>Pääset kirjaamaan bongauksiasi kirjautumalla sisään!</h3>
        <GoogleButton style={{marginLeft:"auto", marginRight:"auto", marginTop:"3%"}} className="GoogleButton" onClick={handleGoogleSignIn} />
      </div>
    </div>
  );
};

export default Login;