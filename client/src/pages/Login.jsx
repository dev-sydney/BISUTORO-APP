import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import AuthContext from '../contexts/AuthContext';
import './../styles/authStyle.scss';

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
    <div className="login-container">
      <form onSubmit={onSubmit} style={{ padding: '0 1%' }}>
        <div className="input-block">
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
          <span className="placeholder">Email: </span>
        </div>

        <div className="input-block">
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
          <span className="placeholder">Password:</span>
        </div>

        <button className="submit__btn">login</button>

        <div style={{ textAlign: 'center', marginTop: '1em' }}>
          <Link to="/forgot-password">
            <p> Forgot password?</p>
          </Link>
        </div>
      </form>
      <span className="signup__note">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </span>
    </div>
  );
};

export default Login;
