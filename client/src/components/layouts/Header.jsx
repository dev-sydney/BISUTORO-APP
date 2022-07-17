import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './../../styles/headerStyle.scss';
import AuthContext from '../../contexts/AuthContext';
const Header = () => {
  return (
    <header>
      <NavLink to="/">
        <img src="/img/41-home.svg" className="icons" />
      </NavLink>

      <NavLink to="/favourites">
        <img src="/img/48-favorite-heart.svg" className="icons" />
      </NavLink>

      <NavLink to="/order-history">
        <img src="/img/141-history.svg" className="icons" />
      </NavLink>

      <NavLink to="/me">
        <img
          className="profile__photo"
          src="/img/users/user-629d35ebaee820196aa455b3-1657126613463.jpeg"
        />
      </NavLink>
    </header>
  );
};
export default Header;
