import { createContext, useReducer } from 'react';
import axios from 'axios';
import authReducer from '../reducers/AuthReducer';

import * as Type from './types';
import { config } from '../Utilss';
import AuthActions from '../actions/authActions';

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
    // loggedInUser: localStorage.getItem('User'),
    isLoggedIn: true,
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

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        loggedInUser: state.loggedInUser,
        token: state.token,
        authMsg: state.authMsg,
        asyncAuthActions,
        clearAuthMsg,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
