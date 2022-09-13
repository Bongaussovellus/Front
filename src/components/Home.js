import React from 'react';

import { auth } from '../service/firebase';

import '../App.css';

const Home = ({ user }) => {
  return (
    <div className="home">
      <img src={user.photoURL} alt="Avatar" />
      <button class="button-38" onClick={() => auth.signOut()}>Sign out</button>
      <h1>Hello, <span></span>{user.displayName}</h1>
    </div>
  )
}

export default Home;