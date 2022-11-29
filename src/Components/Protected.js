import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../Context/AuthContext';

const Protected = ({ children }) => {
  const { user } = UserAuth();
  
  //Tarkistaa onko käyttäjä kirjautunut sisään, jos ei niin ohjaa Login-sivulle
  if (!user) {
    return <Navigate to='/' />;
  }
  return children;
};

export default Protected;