
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
        <input type="checkbox" id="nav-toggle"/>
        <div class="logo">SPOT<a className="it" >it</a></div>
       <ul class="links">
           <li><a href="/FrontPage">Etusivu</a></li>
           <li><a href="/Home">Bongaukset</a></li>
           <li><a href="/Map">Kartta</a></li>
           <a href="/Home" className='LinkAvatar'><img src={user.photoURL}  class="Avatar"/></a>
          <button onClick={handleSignOut} className="logout">Logout</button>
       </ul>
       <label for="nav-toggle" class="icon-burger">
           <div class="line"></div>
           <div class="line"></div>
           <div class="line"></div>
       </label>
    </nav>
    <label for="nav-toggle" class="icon-burger">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
    </label>
    </header>
</body>
  );
};

export default Navbar;