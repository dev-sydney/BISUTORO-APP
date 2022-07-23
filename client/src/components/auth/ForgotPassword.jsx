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
        <img
          src="/img/lock_person_FILL0_wght400_GRAD0_opsz48.svg"
          className="form_icon"
        />
        <h2>Trouble logging in ?</h2>
        <p className="prompt">
          Enter your email address and we'll send you <br /> a link to get back
          into your account.
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
