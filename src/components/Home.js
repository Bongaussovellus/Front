import React from 'react';

import { auth } from '../service/firebase';

import '../App.css';

const Home = ({ user }) => {
  return (
    <div className="home">
<<<<<<< HEAD
=======
      <h1 class="h1">Hello, <span></span>{user.displayName}</h1>
>>>>>>> dfd07ccf59e2e0f1adc217a1aa1151215d3eb533
      <img src={user.photoURL} alt="Avatar" />
      <button class="button-38" onClick={() => auth.signOut()}>Sign out</button>
      <h1>Hello, <span></span>{user.displayName}</h1>
    </div>
  )
}

export default Home;