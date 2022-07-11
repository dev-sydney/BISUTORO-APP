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
      <img
        className="profile"
        src="/img/users/user-629d35ebaee820196aa455b3-1655325780778.jpeg"
      />
      <h2>Hello Sydney</h2>
      <div className={`add_meal_btn `}>CREATE NEW MEAL +</div>
      <p>Menu</p>
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
        <NavLink to="/order-history">ORDER HISTORY</NavLink>
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
            asyncAuthActions.logout(navigate);
          }}
        >
          LOG OUT
        </button>
      )}
    </div>
  );
};

export default Sidebar;
