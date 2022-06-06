import { createContext, useReducer } from 'react';
import axios from 'axios';
import authReducer from '../reducers/AuthReducer';
import * as Type from './types';

const AuthContext = createContext();
/**
 *
 * @param {*} param0 Takes in a prop called children
 * Any component wrapped in the context provider will have access to the `value` attribute
 */
export const AuthProvider = ({ children }) => {
  const initialState = {
    token: localStorage.getItem('token'),
    //token: localStorage.getItem('token'),
    loggedInUser: null,
    isAuthenticated: null,
    authMsg: null,
    // loggedInUser: {
    //   name: 'Sydney Otutey',
    //   email: 'sydney@example.com',
    //   role: 'user',
    //   photo: 'user-1.jpg',
    //   password: 'test1234',
    //   passwordConfirm: 'test1234',
    // },
    // loggedInUser: localStorage.getItem('User'),
    isLoggedIn: true,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  //~~~~~~~~ACTIONS~~~~~~~~~~

  //LOGIN USER

  //SIGN UP USER
  /**
   * This function is responsible for the signing up, as well as the logging in functionality
   * @param {Object} formData The input data to be submitted
   * @param {Function} navigate The navigate function from useNavigate in react-router-dom
   */

  //LOGIN USER
  const loginSiginUser = async (formData, navigate) => {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    const url = `/api/v1/users/${
      formData.passwordConfirm ? 'signup' : 'signin'
    }`;

    const successType = formData.passwordConfirm
      ? Type.SIGN_UP_SUCCESS
      : Type.LOGIN_SUCCESS;

    const failType = formData.passwordConfirm
      ? Type.SIGN_UP_FAILED
      : Type.LOGIN_FAIL;

    try {
      const res = await axios.post(url, formData, config);
      if (res.data.status === 'success') {
        console.log(res.data);
        dispatch({
          type: successType,
          payload: res.data.data.user,
        });

        setTimeout(() => {
          navigate('/');
        }, 1500);
      }
    } catch (err) {
      dispatch({
        type: failType,
        payload: err.response.data.message,
      });
    }
  };

  //LOGOUT USER
  const logout = async (navigate) => {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    try {
      console.log('logging out');
      const res = await axios.get('/api/v1/users/signout', config);
      if (res.data.status === 'success') {
        dispatch({
          type: Type.LOGOUT,
        });
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      }
    } catch (err) {
      dispatch({
        type: Type.LOGOUT_FAIL,
        payload: 'Unable to logout, please try again!',
      });
    }
  };

  //CLEARING AUTH MESSAGES
  /**
   * This function clears all auth related messages
   */
  const clearAuthMsg = () => {
    dispatch({
      type: Type.CLEAR_AUTH_MSG,
      payload: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        loggedInUser: state.loggedInUser,
        token: state.token,
        authMsg: state.authMsg,
        loginSiginUser,
        logout,
        clearAuthMsg,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
