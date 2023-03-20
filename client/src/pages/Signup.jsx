import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
// import Alert from '../Alert';
import './../styles/authStyle.scss';

const Signup = () => {
  const authContxt = useContext(AuthContext);
  const navigate = useNavigate();
  const { asyncAuthActions } = authContxt;
  // const [isAlertOpen, setIsAlertOpen] = useState(false);

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
    <div className="signup-container">
      <form onSubmit={onSubmit}>
        <div className="input-block">
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
          <span className="placeholder">Name</span>
        </div>

        <div className="input-block">
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
          <span className="placeholder">Email</span>
        </div>

        <div className="input-block">
          <input
            required
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          />
          <span className="placeholder">Password</span>
        </div>

        <div className="input-block">
          <input
            required
            type="password"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={onChange}
          />
          <span className="placeholder">Confirm password</span>
        </div>

        <button className="submit__btn" onClick={onSubmit}>
          Sign up
        </button>
        <span className={`login__note`}>
          Already have an account? <Link to={'/login'}>Log in</Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;
