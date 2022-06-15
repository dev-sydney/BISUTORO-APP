import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthContext from '../contexts/AuthContext';

import Alert from './Alert';

import './../styles/profileStyle.scss';

const Profile = () => {
  const authContxt = useContext(AuthContext);
  const [user, setUser] = useState({
    name: '',
    email: '',
    photo: '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    passwordConfirm: '',
  });
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const { name, email, photo } = user;
  const { currentPassword, newPassword, passwordConfirm } = passwordData;

  const { updatePassword, isAuthenticated, authMsg } = authContxt;
  const navigate = useNavigate();

  const onUserChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onPasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    updatePassword(passwordData);
  };
  useEffect(() => {
    if (!isAuthenticated && !authMsg) navigate('/login');
  }, [isAuthenticated, authMsg]);
  return (
    <div>
      {authMsg && <Alert setIsAlertOpen={setIsAlertOpen} />}
      <h1>YOUR ACCOUNT SETTINGS</h1>
      <form className="user_update">
        <div>
          <label htmlFor="name">NAME:</label>
          <input
            type="text"
            name="name"
            value={name}
            id="name"
            onChange={onUserChange}
          />
        </div>
        <div>
          <label htmlFor="email">EMAIL:</label>
          <input
            type="email"
            name="email"
            value={email}
            id="email"
            onChange={onUserChange}
          />
        </div>
        <div className="profile_photo">
          <img
            className="form__user-photo"
            src="/img/meals/meal-1.png"
            alt="profile"
          />
          <input
            type="file"
            name="photo"
            accept="image/*"
            id="photo"
            value={photo}
            onChange={onUserChange}
          />
          <label htmlFor="photo">CHOOSE A PHOTO</label>
        </div>
        <input type="submit" value="SAVE SETTINGS" />
      </form>

      <div>&nbsp;</div>
      <form className="password_form" onSubmit={onSubmit}>
        <div>
          <label htmlFor="current">Current Password</label>
          <input
            type="password"
            name="currentPassword"
            value={currentPassword}
            id="current"
            onChange={onPasswordChange}
          />
        </div>

        <div>
          <label htmlFor="newpassword">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={newPassword}
            id="newpassword"
            onChange={onPasswordChange}
          />
        </div>

        <div>
          <label htmlFor="passwordconfirm">Confirm Password</label>
          <input
            type="password"
            name="passwordConfirm"
            vaue={passwordConfirm}
            id="passwordconfirm"
            onChange={onPasswordChange}
          />
        </div>

        <input type="submit" value="SAVE PASSWORD" />
      </form>
    </div>
  );
};

export default Profile;
