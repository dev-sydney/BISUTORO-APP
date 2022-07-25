import * as Type from './../contexts/types';

const authReducer = (state, action) => {
  switch (action.type) {
    //@TODO: SUCCESSES
    case Type.LOAD_USER:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: true,
        loggedInUser: action.payload,
      };
    case Type.LOAD_USER_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        authMsg: action.payload,
      };
    case Type.RESET_PASSWORD:
      return {
        ...state,
        isAuthenticated: true,
        loggedInUser: action.payload,
        authMsg: 'Password reset successful!',
        authMsgType: true, //set to TRUE if its a success
      };
    case Type.FORGOT_PASSWORD:
      return {
        ...state,
        authMsg: action.payload,
        authMsgType: true,
      };
    case Type.SET_PICKUP_LOCATION:
      return {
        ...state,
        pickupLocation: action.payload,
      };
    case Type.UPDATE_DATA_SUCCESS:
      return {
        ...state,
        loggedInUser: action.payload,
        authMsg: 'Updated successfully!',
        authMsgType: true, //set to TRUE if its a success
      };
    case Type.UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        authMsg: action.payload,
        authMsgType: true, //set to TRUE if its a successssss
      };
    case Type.SIGN_UP_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        loggedInUser: action.payload.user,
        authMsg: 'Signed up successfully!',
        token: action.payload.token,
      };
    case Type.LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        loggedInUser: action.payload.user,
        authMsg: 'Logged in successfully !',
        token: action.payload.token,
      };
    case Type.LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: null,
        loggedInUser: null,
      };
    //@TODO: FAILS
    case Type.SIGN_UP_FAILED:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: null,
        authMsg: action.payload,
        loggedInUser: null,
        authMsgType: false, //set to FAIL if its an error
      };
    case Type.LOGIN_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: null,
        authMsg: action.payload,
        loggedInUser: null,
      };
    case Type.LOGOUT_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        authMsg: action.payload,
        authMsgType: false, //set to FAALSE if its a success
      };
    case Type.UPDATE_PASSWORD_FAILED:
      return {
        ...state,
        authMsg: action.payload,
        authMsgType: false, //set to FALSE if its an error
      };
    case Type.UPDATE_DATA_FAIL:
      return {
        ...state,
        authMsg: action.payload,
        authMsgType: false, //set to TRUE if its a success
      };
    case Type.FORGOT_PASSWORD_FAIL:
      return {
        ...state,
        authMsg: action.payload,
        authMsgType: false, //set to TRUE if its a success
      };
    case Type.RESET_PASSWORD_FAIL:
      return {
        ...state,
        authMsg: action.payload,
        authMsgType: false,
      };
    //@TODO: CLEARING

    case Type.CLEAR_AUTH_MSG:
      return {
        ...state,
        authMsg: null,
        authMsgType: null,
      };
    default:
      return state;
  }
};
export default authReducer;
