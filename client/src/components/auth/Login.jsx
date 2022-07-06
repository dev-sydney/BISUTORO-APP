import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Alert from '../Alert';

import AuthContext from '../../contexts/AuthContext';

const Login = () => {
  const authContxt = useContext(AuthContext);
  const { asyncAuthActions, authMsg } = authContxt;
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [sAlertOpen, setIsAlertOpen] = useState(false);
  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    asyncAuthActions.loginSignupUser(user, navigate);
  };

  return (
    <div>
      {<Alert setIsAlertOpen={setIsAlertOpen} />}
      <form onSubmit={onSubmit}>
        <h1>LOGIN INTO YOUR ACCOUNT!</h1>
        <div>
          <label htmlFor="email">EMAIL:</label>
          <input type="email" name="email" value={email} onChange={onChange} />
        </div>
        <div>
          <label htmlFor="password">PASSWORD:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <input type="submit" value="LOGIN" />
      </form>
    </div>
  );
};

export default Login;
