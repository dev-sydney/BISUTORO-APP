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

  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };
  //SIGN UP USER
  /**
   * This function is responsible for the signing up, as well as the logging in functionality
   * @param {Object} formData The input data to be submitted
   * @param {Function} navigate The navigate function from useNavigate in react-router-dom
   */

  //LOGIN USER
  const loginSiginUser = async (formData, navigate) => {
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

  //UPDATING USER PASSWORD
  const updatePassword = async (formData) => {
    try {
      const res = await axios.patch(
        '/api/v1/users/checkoutRoute',
        formData,
        config
      );
      if (res.data.status === 'success') {
        dispatch({
          type: Type.UPDATE_PASSWORD_SUCCESS,
          payload: 'Password update was successful',
        });
      }
    } catch (err) {
      dispatch({
        type: Type.UPDATE_PASSWORD_FAILED,
        payload: err.response.data.message,
      });
    }
  };

  /**
   * Used to update the users data
   * @param {*} formData The Object gotten from the data
   * @param {*} userID  The Logged in user's _id property
   */
  const updateData = async (formData, userID) => {
    try {
      let form = new FormData();
      let obj = { ...formData }; //An object which will be filtered later, below

      Object.keys(formData).forEach((el) => {
        if (obj[el] === '' || !obj[el]) delete obj[el]; //This right here deletes fields that have empty values
        //because the object got directly from the form(ie the 1st arg )
        ///has values which have not been set manually by the user, initially set to ''by default
        //And we dont want that, because it might some data in the DB to '',
      });

      Object.keys(obj).forEach((el) => {
        form.append(`${el}`, obj[el]);
      }); //setting the key-values pairs of the form

      // for (let key of form.entries()) {
      //   console.log(key);
      // }

      const res = await axios.patch(`/api/v1/users/update-me`, form, config);
      if (res.data.status === 'success') {
        dispatch({
          type: Type.UPDATE_DATA_SUCCESS,
          payload: res.data.data.user,
        });
      }
    } catch (err) {
      dispatch({
        type: Type.UPDATE_DATA_FAIL,
        payload: err.response.data.message,
      });
      console.log(err);
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
        updatePassword,
        updateData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
