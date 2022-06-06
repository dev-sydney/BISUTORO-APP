import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import AuthContext from '../../contexts/AuthContext';
import './../../styles/sideBarStyle.scss';

const Sidebar = () => {
  const authContxt = useContext(AuthContext);
  const { loggedInUser } = authContxt;

  return (
    <div className="left_side">
      <div>
        <NavLink to="/" className="links">
          OVERVIEW
        </NavLink>
      </div>
      <div>
        <NavLink to="/favourites" className="links">
          FAVORITES
        </NavLink>
      </div>
      <div>
        <NavLink to="/me" className="links">
          PROFILE
        </NavLink>
      </div>
      <div>
        <NavLink to="/faq" className="links">
          FAQ
        </NavLink>
      </div>
      {loggedInUser && loggedInUser.role === 'manager' ? (
        <div>
          <NavLink to="/dashboard" className={'links'}>
            DASHBOARD
          </NavLink>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Sidebar;
