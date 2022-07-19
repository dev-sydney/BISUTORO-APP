import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import Alert from '../Alert';

const Signup = () => {
  const authContxt = useContext(AuthContext);
  const navigate = useNavigate();
  const { asyncAuthActions, authMsg } = authContxt;
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const { name, email, password, passwordConfirm } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    asyncAuthActions.loginSignupUser(user, navigate);
  };
  return (
    <div className="login">
      <form
        onSubmit={onSubmit}
        className="login_form"
        style={{ height: 'fit-content' }}
      >
        <h2>SIGN UP FOR FREE!</h2>
        <div className="form_group">
          <label htmlFor="name">NAME:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            className="input"
            required
          />
        </div>
        <div className="form_group">
          <label htmlFor="email">EMAIL:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            className="input"
            required
          />
        </div>
        <div className="form_group">
          <label htmlFor="password">PASSWORD:</label>
          <input
            className="input"
            required
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            placeholder="••••••••"
          />
        </div>
        <div className="form_group">
          <label htmlFor="passwordConfirm">CONFIRM PASSWORD:</label>
          <input
            className="input"
            required
            type="password"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={onChange}
            placeholder="••••••••"
          />
        </div>
        <input type="submit" value=" SIGN UP" className="submit_btn" />
      </form>
    </div>
  );
};

export default Signup;
