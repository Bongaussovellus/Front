import React from 'react'
import '../Styles/App.css'
import './Home'

const FrontPage = () => {
    return (
      <div class="frontpage">
        <h1>Tervetuloa käyttämään <br></br>SPOT<a className='it'>it</a>-sovellusta!</h1>

        <h2>Viimeisin bongaus: </h2>
        <h2>Seuraava bongaus: </h2>
      </div>
    )
  }
  
  export default FrontPage;