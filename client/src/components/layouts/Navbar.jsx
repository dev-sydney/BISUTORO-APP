import React, { useContext } from 'react';

import AuthContext from '../../contexts/AuthContext';

import { NavLink } from 'react-router-dom';
const Navbar = () => {
  const authContxt = useContext(AuthContext);
  const { isAuthenticated, logout } = authContxt;

  return (
    <div>
      {!isAuthenticated ? (
        <div>
          <NavLink to="/signup">
            <button>SIGN UP</button>
          </NavLink>
          <NavLink to="/login">
            <button
              onClick={() => {
                logout();
              }}
            >
              LOGIN
            </button>
          </NavLink>
        </div>
      ) : (
        <button>LOG OUT</button>
      )}
    </div>
  );
};
export default Navbar;
