import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import AuthContext from '../../contexts/AuthContext';
import './../../styles/sideBarStyle.scss';

const Sidebar = () => {
  const authContxt = useContext(AuthContext);
  const { loggedInUser } = authContxt;

  const navigate = useNavigate();

  const { isAuthenticated, asyncAuthActions } = authContxt;

  return (
    <div className="left_side">
      <img className="logo" src="/img/bisutoro-removebg.png" />
      <div className="menu_items">
        <NavLink className={`links`} to="/">
          OVERVIEW
        </NavLink>

        <NavLink className={`links`} to="/favourites">
          FAVOURITES
        </NavLink>

        <NavLink className={`links`} to="/me">
          PROFILE
        </NavLink>

        <NavLink className={`links`} to="/order-history">
          ORDERS
        </NavLink>

        <NavLink className={`links`} to="/faq">
          FAQ
        </NavLink>

        {loggedInUser && loggedInUser.role === 'manager' ? (
          <NavLink className={`links`} to="/dashboard">
            DASHBOARD
          </NavLink>
        ) : (
          ''
        )}
      </div>
      <NavLink to="/new-meal" className={`add_meal_btn `}>
        + New Meal
      </NavLink>
      <div className="auth_btns">
        {!isAuthenticated ? (
          <div>
            <NavLink to="/signup">
              <button>SIGN UP</button>
            </NavLink>
          </div>
        ) : (
          <button
            onClick={() => {
              asyncAuthActions.logout(navigate);
            }}
          >
            LOG OUT
          </button>
        )}
      </div>
      <div style={{ marginBottom: '20px' }}>⚙️ Settings</div>
      <div style={{ marginBottom: '30px' }}>🎯Help</div>
    </div>
  );
};

export default Sidebar;
