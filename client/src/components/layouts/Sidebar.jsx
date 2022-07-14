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
        <div className={`links`}>
          <NavLink to="/">OVERVIEW</NavLink>
        </div>
        <div className={`links`}>
          <NavLink to="/favourites">FAVORITES</NavLink>
        </div>
        <div className={`links`}>
          <NavLink to="/me">PROFILE</NavLink>
        </div>
        <div className={`links`}>
          <NavLink to="/order-history">ORDERS</NavLink>
        </div>
        <div className={`links`}>
          <NavLink to="/faq">FAQ</NavLink>
        </div>
        {loggedInUser && loggedInUser.role === 'manager' ? (
          <div className={`links`}>
            <NavLink to="/dashboard" className={'links'}>
              DASHBOARD
            </NavLink>
          </div>
        ) : (
          ''
        )}
      </div>
      <button className={`add_meal_btn `}> + NEW MEAL </button>
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
