import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './../../styles/headerStyle.scss';
import AuthContext from '../../contexts/AuthContext';
const Header = () => {
  const authContxt = useContext(AuthContext);
  const { loggedInUser } = authContxt;

  return (
    <header>
      {loggedInUser && (
        <div className="user__profile">
          <NavLink to="/">
            <img src="/img/41-home.svg" className="icons" />
          </NavLink>

          <NavLink to="/favourites">
            <img src="/img/48-favorite-heart.svg" className="icons" />
          </NavLink>
          {loggedInUser &&
            (loggedInUser.role === 'admin' ||
            loggedInUser.role === 'manager' ? (
              <NavLink to="/dashboard/new-meal">
                <img src="/img/40-add-card.svg" className="icons" />
              </NavLink>
            ) : (
              ''
            ))}
          {loggedInUser &&
            (loggedInUser.role === 'admin' ||
            loggedInUser.role === 'manager' ? (
              <NavLink to="/dashboard">
                <img src="/img/17-assignment.svg" className="icons" />
              </NavLink>
            ) : (
              ''
            ))}
          <NavLink to="/order-history">
            <img src="/img/141-history.svg" className="icons" />
          </NavLink>

          <NavLink to="/me">
            <img
              className="profile__photo"
              src={`/img/users/${
                loggedInUser ? loggedInUser.photo : 'default.jpg'
              }`}
            />
          </NavLink>
        </div>
      )}
    </header>
  );
};
export default Header;
