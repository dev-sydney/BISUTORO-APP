import * as Type from './../contexts/types';

const authReducer = (state, action) => {
  switch (action.type) {
    //@TODO: SUCCESSES
    case Type.SIGN_UP_SUCCESS:
      localStorage.setItem('token', action.payload);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };
    case Type.LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };
    case Type.LOGOUT:
      localStorage.removeItem('token', action.payload);
      return {
        ...state,
        isAuthenticated: false,
      };
    //@TODO: FAILS
    case Type.SIGN_UP_FAILED:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: null,
        authMsg: action.payload,
      };
    case Type.LOGIN_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: null,
        authMsg: action.payload,
      };
    case Type.LOGOUT_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        authMsg: action.payload,
      };
    //@TODO: CLEARING

    case Type.CLEAR_AUTH_MSG:
      return {
        ...state,
        authMsg: action.payload,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
export default authReducer;
