import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import AuthContext from '../../contexts/AuthContext';
import './../../styles/authStyle.scss';

const Login = () => {
  const authContxt = useContext(AuthContext);
  const { asyncAuthActions } = authContxt;
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    asyncAuthActions.loginSignupUser(user, navigate);
  };

  return (
    <div className="login">
      <form className="login_form" onSubmit={onSubmit}>
        <h2 className="logo">Bisutoro</h2>
        <div className="form_group">
          <label htmlFor="email">Email address:</label>
          <input
            className="input"
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
            placeholder="you@example.com"
          />
        </div>
        <div className="form_group">
          <label htmlFor="password">Password:</label>
          <input
            className="input"
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            placeholder="••••••••"
          />
        </div>
        <input className="submit_btn" type="submit" value="LOGIN" />
        <NavLink to="/forgot-password">Forgot password</NavLink>
      </form>
      <div className="signup__tab">
        <p>Don't have an account? </p>
        <NavLink to="/signup">Sign up</NavLink>
      </div>
    </div>
  );
};

export default Login;
