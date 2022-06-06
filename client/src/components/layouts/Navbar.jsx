import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthContext from '../../contexts/AuthContext';

import { NavLink } from 'react-router-dom';
const Navbar = () => {
  const authContxt = useContext(AuthContext);
  const { isAuthenticated, logout } = authContxt;
  const navigate = useNavigate();

  return (
    <div>
      {!isAuthenticated ? (
        <div>
          <NavLink to="/signup">
            <button>SIGN UP</button>
          </NavLink>

          <button>LOGIN</button>
        </div>
      ) : (
        <button
          onClick={() => {
            logout(navigate);
          }}
        >
          LOG OUT
        </button>
      )}
    </div>
  );
};
export default Navbar;
