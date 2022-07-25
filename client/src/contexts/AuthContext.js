import { createContext, useReducer } from 'react';
import authReducer from '../reducers/AuthReducer';

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
    token: localStorage.getItem('token'),
    //token: localStorage.getItem('token'),
    loggedInUser: null,
    isAuthenticated: null,
    authMsg: null,
    authMsgType: null,
    // loggedInUser: localStorage.getItem('User'),
    isLoggedIn: true,
    pickupLocation: null,
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
        pickupLocation: state.pickupLocation,
        asyncAuthActions,
        clearAuthMsg,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
