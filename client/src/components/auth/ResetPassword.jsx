import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import AuthContext from '../../contexts/AuthContext';

import './../../styles/authStyle.scss';

const ResetPassword = () => {
  const authContxt = useContext(AuthContext);
  const { asyncAuthActions } = authContxt;

  let params = useParams();
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: '',
    passwordConfirm: '',
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    asyncAuthActions.resetpassword(formData, params.resetToken, navigate);
  };
  return (
    <div className="login">
      <form className="login_form" onSubmit={onSubmit}>
        <img
          src="/img/lock_reset_FILL0_wght400_GRAD0_opsz48.svg"
          className="form_icon"
        />
        <h2>Reset your password !</h2>
        <p className="prompt">
          Enter your new password and confirm it
          <br /> to be logged in
        </p>
        <div className="form_group">
          <input
            type="password"
            placeholder="••••••••"
            required
            className="input"
            name="password"
            value={formData.password}
            onChange={onChange}
          />
        </div>
        <div className="form_group">
          <input
            type="password"
            placeholder="••••••••"
            required
            className="input"
            name="passwordConfirm"
            value={formData.passwordConfirm}
            onChange={onChange}
          />
        </div>

        <input className="submit_btn" type="submit" value="RESET PASSWORD" />
      </form>
    </div>
  );
};
export default ResetPassword;
