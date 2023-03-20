import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  UilEstate,
  UilHeartSign,
  UilHistory,
  UilUserCircle,
} from '@iconscout/react-unicons';
import './../styles/navStyle.scss';

const NavBar = () => {
  const navbarStyle = ({ isActive }) => ({
    color: isActive ? '#000000' : '#C5C5C5',
  });

  return (
    <div className="nav__bar">
      <NavLink className={'navlink'} to="/meals" style={navbarStyle}>
        <UilEstate size="35" style={{ width: '100%' }} />
        <p>Home</p>
      </NavLink>

      <NavLink className={'navlink'} to="/favourites" style={navbarStyle}>
        <UilHeartSign size="35" style={{ width: '100%' }} />
        <p>Favourites</p>
      </NavLink>

      <NavLink className={'navlink'} to="/order-history" style={navbarStyle}>
        <UilHistory size="35" style={{ width: '100%' }} />
        <p>Orders</p>
      </NavLink>

      <NavLink className={'navlink'} to="/account/overview" style={navbarStyle}>
        <UilUserCircle size="35" style={{ width: '100%' }} />
        <p>Me</p>
      </NavLink>
    </div>
  );
};

export default NavBar;
