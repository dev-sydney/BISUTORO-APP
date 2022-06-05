import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import Alert from '../Alert';

const Signup = () => {
  const authContxt = useContext(AuthContext);
  const navigate = useNavigate();
  const { loginSiginUser, authMsg } = authContxt;
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
    loginSiginUser(user, navigate);
  };
  return (
    <div>
      {authMsg && <Alert setIsAlertOpen={setIsAlertOpen} />}
      <form onSubmit={onSubmit}>
        <h1>SIGN UP FOR FREE!</h1>
        <div>
          <label htmlFor="name">NAME:</label>
          <input type="text" name="name" value={name} onChange={onChange} />
        </div>
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
        <div>
          <label htmlFor="passwordConfirm">CONFIRM PASSWORD:</label>
          <input
            type="password"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={onChange}
          />
        </div>
        <input type="submit" value=" SIGN UP" />
      </form>
    </div>
  );
};

export default Signup;
