import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './../../styles/headerStyle.scss';
import AuthContext from '../../contexts/AuthContext';
const Header = () => {
  const authContxt = useContext(AuthContext);
  const { loggedInUser, asyncAuthActions, isAuthenticated } = authContxt;
  useEffect(() => {
    asyncAuthActions.getMeForHeader();
  }, []);
  return (
    <header>
      <h2>Bisutoro</h2>
      {isAuthenticated && (
        <div className="user__profile">
          <NavLink to="/">
            <lord-icon
              className="icons"
              src="https://cdn.lordicon.com/igpbsrza.json"
              trigger="hover"
              colors="primary:#000000"
              style={{ width: '30px', height: '30px' }}
            ></lord-icon>
          </NavLink>

          <NavLink to="/favourites">
            <lord-icon
              src="https://cdn.lordicon.com/kkcllwsu.json"
              trigger="morph"
              colors="primary:#121331"
              state="morph"
              style={{ width: '30px', height: '30px' }}
            ></lord-icon>
          </NavLink>
          {loggedInUser &&
            (loggedInUser.role === 'admin' ||
            loggedInUser.role === 'manager' ? (
              <NavLink to="/dashboard/new-meal">
                <lord-icon
                  src="https://cdn.lordicon.com/auvicynv.json"
                  trigger="hover"
                  colors="primary:#121331"
                  state="hover"
                  style={{ width: '30px', height: '30px' }}
                ></lord-icon>
              </NavLink>
            ) : (
              ''
            ))}
          {loggedInUser &&
            (loggedInUser.role === 'admin' ||
            loggedInUser.role === 'manager' ? (
              <NavLink to="/dashboard">
                <lord-icon
                  src="https://cdn.lordicon.com/aslgozpd.json"
                  trigger="hover"
                  colors="primary:#121331"
                  style={{ width: '30px', height: '30px' }}
                ></lord-icon>
              </NavLink>
            ) : (
              ''
            ))}
          <NavLink to="/order-history">
            <lord-icon
              src="https://cdn.lordicon.com/lefmybnc.json"
              trigger="hover"
              colors="primary:#121331"
              style={{ width: '30px', height: '30px' }}
            ></lord-icon>
          </NavLink>

          <NavLink to="/me" className="pp">
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
