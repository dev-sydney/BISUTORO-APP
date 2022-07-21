import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';

import AuthContext from '../../contexts/AuthContext';

import './../../styles/authStyle.scss';

const ForgotPassword = () => {
  const authContxt = useContext(AuthContext);
  const { asyncAuthActions } = authContxt;

  const [emailInput, setEmailInput] = useState({});

  const onChange = (e) => {
    setEmailInput({ [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    asyncAuthActions.forgotpassword(emailInput);
  };
  return (
    <div className="login">
      <form className="login_form" onSubmit={onSubmit}>
        <span className="material-symbols-rounded">lock_person</span>
        <h2>Trouble logging in ?</h2>
        <p>
          Enter your email address and we'll send you a link to get back into
          your account.
        </p>
        <div className="form_group">
          <input
            type="text"
            placeholder="Email"
            required
            className="input"
            name="email"
            value={emailInput.value}
            onChange={onChange}
          />
        </div>

        <input className="submit_btn" type="submit" value="SEND RESET LINK" />
      </form>
      <div className="signup__tab">
        <NavLink to="/login">Back to login</NavLink>
      </div>
    </div>
  );
};
export default ForgotPassword;
