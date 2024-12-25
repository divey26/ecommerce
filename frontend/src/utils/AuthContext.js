import React, { createContext, useState, useEffect } from 'react';

// Create the AuthContext
export const AuthContext = createContext({
  authenticated: false,
  userDetails: null,
  setAuthenticated: () => {},
});

// AuthProvider component to wrap the app
export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

useEffect(() => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const userEmail = localStorage.getItem('userEmail');
  const address = localStorage.getItem('userAddress'); 
  const phone = localStorage.getItem('userPhone');



  if (token) {
    setAuthenticated(true);
    setUserDetails({ userId, email: userEmail, address, phone });
  } else {
    setAuthenticated(false);
    setUserDetails(null);
  }
}, []);

  return (
    <AuthContext.Provider value={{ authenticated, userDetails, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
