import Login from './Pages/Login';
import SpottedPlates from './Pages/SpottedPlates';
import Map from './Pages/Map';
import Navbar from './Components/Navbar';
import Protected from './Components/Protected';
import FrontPage from './Pages/FrontPage';
import { AuthContextProvider } from './Context/AuthContext';
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import './Styles/App.css';

function App() {

  return (
    <div className='app'>
      <AuthContextProvider>
      <Protected>
              <Navbar />
          </Protected>    
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/FrontPage' element={
              <Protected>
                <FrontPage />
              </Protected>
            }
          />  
          <Route path='/SpottedPlates' element={
              <Protected>
                <SpottedPlates />
              </Protected>
            }
          />
              <Route path='/Map' element={
              <Protected>
                <Map />
              </Protected>
            }
          />                           
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
