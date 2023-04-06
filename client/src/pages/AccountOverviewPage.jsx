import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import { UilEditAlt } from '@iconscout/react-unicons';
import './../styles/profileStyle.scss';

const AccountOverviewPage = () => {
  const authContxt = useContext(AuthContext);
  return (
    <div className="overview__container">
      <div className="row">
        <h3>Account Overview</h3>
      </div>

      <div className="row">
        {
          <img
            role={'presentation'}
            loading="lazy"
            src={`/img/users/${authContxt?.user?.photo}`}
            // src={`/img/users/user-10.jpg`}
            style={{
              maxHeight: '8em',
              minHeight: '8em',
              minWidth: '8em',
              maxWidth: '8em',
              borderRadius: '50%',
            }}
            alt=""
          />
        }
      </div>

      <div className="row">
        <h1 style={{ textAlign: 'center' }}>
          {authContxt.user && authContxt.user.name}
        </h1>
      </div>
      <p className="labels" style={{ marginTop: '2em' }}>
        Your display name
      </p>

      <div className="row displayname">
        <h3>{authContxt.user && authContxt.user.name}</h3>
        <Link to="/account/profile" style={{ marginLeft: 'auto' }}>
          <UilEditAlt color="#000000" size="1.5em" />
        </Link>
      </div>
      <p className="labels">Your email address</p>
      <div className="row displayname">
        <h3>{authContxt.user && authContxt.user.email}</h3>
        <Link to="/account/profile" style={{ marginLeft: 'auto' }}>
          <UilEditAlt color="#000000" size="1.5em" />
        </Link>
      </div>
      <div className="row" style={{ marginTop: '1em' }}>
        <p>
          <Link
            className="password_link overview_btn"
            to="/account/change-password"
          >
            Change Password
          </Link>
        </p>
      </div>
      <div className="row">
        <button
          className="overview_btn logout"
          onClick={() => {
            // authContxt.signUserOut(navigateTo);
          }}
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default AccountOverviewPage;
