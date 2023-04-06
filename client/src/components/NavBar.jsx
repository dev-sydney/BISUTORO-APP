import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import ProductContext from './../contexts/ProductContext';
import AuthContext from './../contexts/AuthContext';

import {
  UilEstate,
  UilHeartSign,
  UilHistory,
  UilUserCircle,
  UilCreateDashboard,
  UilChart,
} from '@iconscout/react-unicons';
import './../styles/navStyle.scss';

const NavBar = () => {
  const productContxt = useContext(ProductContext);
  const authContxt = useContext(AuthContext);

  const navbarStyle = ({ isActive }) => ({
    color: isActive ? '#000000' : '#C5C5C5',
  });

  return (
    <div>
      {productContxt.cart && <Link to="/cart">View Cart</Link>}
      <div className="nav__bar">
        {authContxt.user &&
          (['user'].includes(authContxt.user.role) ? (
            <NavLink className={'navlink'} to="/meals" style={navbarStyle}>
              <UilEstate size="35" style={{ width: '100%' }} />
              <p>Home</p>
            </NavLink>
          ) : (
            ''
          ))}

        {authContxt.user &&
          (['user'].includes(authContxt.user.role) ? (
            <NavLink className={'navlink'} to="favourites" style={navbarStyle}>
              <UilHeartSign size="35" style={{ width: '100%' }} />
              <p>Favourites</p>
            </NavLink>
          ) : (
            ''
          ))}

        {authContxt.user &&
          (['user'].includes(authContxt.user.role) ? (
            <NavLink
              className={'navlink'}
              to="/order-history"
              style={navbarStyle}
            >
              <UilHistory size="35" style={{ width: '100%' }} />
              <p>Orders</p>
            </NavLink>
          ) : (
            ''
          ))}

        {authContxt.user &&
          (['manager', 'admin'].includes(authContxt.user.role) ? (
            <NavLink
              className={'navlink'}
              to="/manage/add-meal"
              style={navbarStyle}
            >
              <UilCreateDashboard size="35" style={{ width: '100%' }} />
              <p>Manage</p>
            </NavLink>
          ) : (
            ''
          ))}

        {authContxt.user &&
          (['manager', 'admin'].includes(authContxt.user.role) ? (
            <NavLink
              className={'navlink'}
              to="/manage/analytics"
              style={navbarStyle}
            >
              <UilChart size="35" style={{ width: '100%' }} />
              <p>Analytics</p>
            </NavLink>
          ) : (
            ''
          ))}

        <NavLink
          className={'navlink'}
          to="/account/overview"
          style={navbarStyle}
        >
          <UilUserCircle size="35" style={{ width: '100%' }} />
          <p>Me</p>
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;
