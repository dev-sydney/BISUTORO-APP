import { createContext, useReducer } from 'react';
import authReducer from '../reducers/AuthReducer';
import { AppAlert, config } from '../Utilss';
import axios from 'axios';
import * as Type from './types';
import AuthActions from '../actions/authActions';

const AuthContext = createContext();
/**
 *
 * @param {*} param0 Takes in a prop called children
 * Any component wrapped in the context provider will have access to the `value` attribute
 */
export const AuthProvider = ({ children }) => {
  const initialState = {
    user: JSON.parse(localStorage.getItem('BisutoroUser')),
    //token: localStorage.getItem('token'),
    loggedInUser: null,
    isAuthenticated: null,
    authMsg: null,
    authMsgType: null,
    // loggedInUser: localStorage.getItem('User'),
    isLoggedIn: true,
    pickupLocation: null,
    isLoading: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);
  const asyncAuthActions = new AuthActions(dispatch);

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
  const clearContextAlerts = (secs = 3000) => {
    setTimeout(() => {
      dispatch({
        type: Type.CLEAR_AUTH_MSG,
      });
    }, secs);
  };

  const setNavBarVisibilty = (NavBarHiddenValue) => {
    dispatch({
      type: Type.SET_NAVBAR_VISIBIITY,
      payload: NavBarHiddenValue,
    });
  };

  const loginUser = async (formData, navigateTo) => {
    try {
      const url = `/api/v1/users/${
        formData.passwordConfirm ? 'signup' : 'signin'
      }`;

      dispatch({
        type: Type.AUTH_LOADING,
      });
      // const res = await axios.post('/api/v1/users/sigin', formData, config);
      const res = await axios.post(url, formData, config);

      // console.log(res);
      if (res.status === 200) {
        dispatch({
          type: Type.LOGIN_SUCCESS,
          payload: res.data.data.user,
          alert: new AppAlert('Logged in successfully', 'success'),
        });
        clearContextAlerts(1000);

        setTimeout(() => {
          navigateTo('/meals');
        }, 2000);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        loggedInUser: state.loggedInUser,
        authMsg: state.authMsg,
        authMsgType: state.authMsgType,
        pickupLocation: state.pickupLocation,
        user: state.user,
        isLoading: state.isLoading,
        asyncAuthActions,
        clearAuthMsg,
        loginUser,
        clearContextAlerts,
        setNavBarVisibilty,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
