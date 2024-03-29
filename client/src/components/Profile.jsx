import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthContext from '../contexts/AuthContext';

import Alert from './Alert';

import './../styles/profileStyle.scss';

const Profile = () => {
  const authContxt = useContext(AuthContext);
  const [user, setUser] = useState({
    name: '',
    email: '',
  });
  let fileInput = useRef();
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    passwordConfirm: '',
  });
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const { name, email } = user;
  const { currentPassword, newPassword, passwordConfirm } = passwordData;

  const { asyncAuthActions, isAuthenticated, authMsg, loggedInUser } =
    authContxt;
  const navigate = useNavigate();
  /**
   * Callback funtion that logs out the user from the application and navigates to the login page
   */
  const onlogoutclick = () => {
    asyncAuthActions.logout(navigate);
  };
  const onUserChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onPasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };
  /**
   * This Higher order function is responsible for returning the event handler for both forms
   * @param {Object} formData The Object gotten from the form data
   * @param {String} userID The ._id property of the currently logged in user
   * @returns another function, this function is the actual callback function needed for the eventlistener
   */
  const onFormSubmit =
    (formData, userID = null) =>
    (e) => {
      e.preventDefault();
      if (!userID) {
        asyncAuthActions.updatePassword(formData);
      } else {
        const { files } = fileInput.current;
        formData.photo = files[0];
        asyncAuthActions.updateData(formData, loggedInUser._id);
      }
    };
  useEffect(() => {
    if (!loggedInUser) navigate('/login');
    //eslint-disable-next-line
  }, [isAuthenticated, authMsg, loggedInUser]);
  return (
    <div className="profile">
      {authMsg && <Alert setIsAlertOpen={setIsAlertOpen} />}
      <h1>YOUR ACCOUNT SETTINGS</h1>
      {/* USER DATA UPDATE FORM */}
      <form
        className="user_update update__form"
        encType="multipart/form-data"
        // onSubmit={onSubmit(user, loggedInUser._id)}
        onSubmit={
          // console.log(files[0]);
          loggedInUser && onFormSubmit(user, loggedInUser._id)
        }
      >
        <div className="form__group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            id="name"
            onChange={onUserChange}
          />
        </div>
        <div className="form__group">
          <label htmlFor="email">Email adress:</label>
          <input
            type="email"
            name="email"
            value={email}
            id="email"
            onChange={onUserChange}
          />
        </div>
        <div className="profile__photo">
          <img
            className="form__user-photo"
            src={`/img/users/${
              loggedInUser ? loggedInUser.photo : 'default.jpg'
            }`}
            alt="profile"
          />
          <label htmlFor="photo" className="label__upload">
            Choose new photo.
            <input
              type="file"
              name="photo"
              accept="image/*"
              id="photo"
              ref={fileInput}
              className="form__upload"
            />
          </label>
        </div>
        <input type="submit" value="SAVE SETTINGS" className="save_btn btn" />
      </form>

      <hr />
      {/* PASSWORD UPDATE FORM */}
      <h1>SECURITY SETTINGS</h1>
      <form
        className="password__form update__form"
        onSubmit={onFormSubmit(passwordData)}
      >
        <div className="form__group">
          <label htmlFor="current">Current password:</label>
          <input
            type="password"
            name="currentPassword"
            value={currentPassword}
            id="current"
            onChange={onPasswordChange}
            placeholder="••••••••"
          />
        </div>

        <div className="form__group">
          <label htmlFor="newpassword">New password:</label>
          <input
            type="password"
            name="newPassword"
            value={newPassword}
            id="newpassword"
            onChange={onPasswordChange}
            placeholder="••••••••"
          />
        </div>

        <div className="form__group">
          <label htmlFor="passwordconfirm">Confirm password:</label>
          <input
            type="password"
            name="passwordConfirm"
            vaue={passwordConfirm}
            id="passwordconfirm"
            onChange={onPasswordChange}
            placeholder="••••••••"
          />
        </div>

        <input
          type="submit"
          value="SAVE PASSWORD"
          className="save_password btn"
        />
      </form>
      <button className="logout" onClick={onlogoutclick}>
        LOGOUT
      </button>
    </div>
  );
};

export default Profile;
