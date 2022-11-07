import {React} from 'react';
import { UserAuth } from '../Context/AuthContext';
import '../Styles/Navbar.css';


function Navbar() {
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
    <body>
      <header>
          <nav>
          <a className="logo">
          Bongailusovellus
        </a>
            <ul>
              <li className="front"><a href="/FrontPage">Etusivu</a></li>
              <li className="tili"><a href="/Home">Tili</a></li>
              <li className="kartta"><a href="/Map">Kartta</a></li>
            </ul>
            {user?.displayName ? (
          <div>
            <img src={user.photoURL} alt="Avatar" class="Avatar"/>
            <button onClick={handleSignOut} className="logout">Logout</button>
          </div>
            ) : (
          <div>
            <img src={user.photoURL} alt="Avatar" class="Avatar"/>
            <button onClick={handleSignOut} className="logout">Logout</button>
          </div>
           )}
        </nav>
    </header>
    </body>
  );
};

export default Navbar;