import React from 'react';

import { auth } from '../service/firebase';

import '../App.css';

const Home = ({ user }) => {
  return (
    <div className="home">
      <h1 class="h1">Hello, <span></span>{user.displayName}</h1>
      <img src={user.photoURL} alt="Avatar" />
      <button className="button signout" onClick={() => auth.signOut()}>Sign out</button>
    </div>
  )
}

export default Home;