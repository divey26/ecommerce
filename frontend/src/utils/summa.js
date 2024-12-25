import React, { useContext } from 'react';
import { AuthContext } from '../utils/AuthContext';

const Navbar = () => {
  const { authenticated, userDetails } = useContext(AuthContext);

  return (
    <nav>
      {authenticated ? (
        <p>Welcome, {userDetails.email}</p>
      ) : (
        <p>Please log in</p>
      )}
    </nav>
  );
};

export default Navbar;
