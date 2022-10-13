import React from 'react';
import { UserAuth } from '../Context/AuthContext';
import '../Styles/App.css'




const Home = () => {
  const { user } = UserAuth();

  return (
    <div>
      <div class="title">
      <img src={user.photoURL}  class="Avatar"/>
        <h3 >{user?.displayName} <p></p>Tervetuloa bongailemaan</h3>
      </div>
    </div>
  );
};

export default Home;