import React, { createContext, useState, useEffect } from 'react';

// Create the AuthContext
export const AuthContext = createContext({
  authenticated: false,
  userDetails: null,
  setAuthenticated: () => {},
  logout: () => {},
});

// AuthProvider component to wrap the app
export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  // Check if the user is authenticated on app load
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

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userAddress');
    localStorage.removeItem('userPhone');

    setAuthenticated(false);
    setUserDetails(null);


  };

  return (
    <AuthContext.Provider value={{ authenticated, userDetails, setAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Function to check if the user is authenticated
export const isAuthenticate = () => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const userEmail = localStorage.getItem('userEmail');
  const address = localStorage.getItem('userAddress');
  const phone = localStorage.getItem('userPhone');

  if (token) {
    return {
      authenticated: true,
      userDetails: {
        userId,
        email: userEmail,
        address,
        phone,
      },
    };
  }

  return { authenticated: false, userDetails: null };
};
