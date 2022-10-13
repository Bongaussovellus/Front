import React from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '../Context/AuthContext';
import '../Styles/Navbar.css'


const Navbar = () => {
  const { user, logOut } = UserAuth();

  //Tililtä uloskirjautuminen
  const handleSignOut = async () => {
    try {
      await logOut()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <header>
      <h2>
        Bongailusovellus
      </h2>
      <nav>
      </nav>
      <ul class="nav_links">
        <li class="front"><a href="/FrontPage">Etusivu</a></li>
        <li class="tili"><a href="/Home">Tili</a></li>
        <li class="kartta"><a href="/Map">Kartta</a></li>
      </ul>
      <img src={user.photoURL} alt="Avatar" class="Avatar"/>
      {user?.displayName ? (
        <button class="cta" onClick={handleSignOut}>Logout</button>
      ) : (
        <Link to='/Login' class="j">Sign in</Link>
      )}
    </header>
      <body></body>
    </div>
  );
};

export default Navbar;