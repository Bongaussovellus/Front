import {useRef, React} from 'react';
import {FaBars, FaTimes} from "react-icons/fa";
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
        <label className="logo">
          Bongailusovellus
        </label>
          <nav>
            <ul>
              <li className="front"><a href="/FrontPage">Etusivu</a></li>
              <li className="tili"><a href="/Home">Tili</a></li>
              <li className="kartta"><a href="/Map">Kartta</a></li>
            </ul>
        </nav>
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
    </header>
    </body>
  );
};

export default Navbar;