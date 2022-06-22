import axios from 'axios';
import * as Type from './../contexts/types';
import { config } from '../Utilss';

class AuthActions {
  constructor(dispatch) {
    this.dispatch = dispatch;
  }
  successDispatcher = (res, type, payload) => {
    if (res.data.status === 'success') {
      this.dispatch({
        type,
        payload,
      });
    }
  };
  loginSignupUser = async (formData, navigate) => {
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
        this.dispatch({
          type: successType,
          payload: res.data.data.user,
        });

        setTimeout(() => {
          navigate('/');
        }, 1500);
      }
    } catch (err) {
      this.dispatch({
        type: failType,
        payload: err.response.data.message,
      });
    }
  };
  logout = async (navigate) => {
    try {
      const res = await axios.get('/api/v1/users/signout', config);
      if (res.data.status === 'success') {
        this.dispatch({
          type: Type.LOGOUT,
        });
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      }
    } catch (err) {
      this.dispatch({
        type: Type.LOGOUT_FAIL,
        payload: 'Unable to logout, please try again!',
      });
    }
  };

  updatePassword = async (formData) => {
    try {
      const res = await axios.patch(
        '/api/v1/users/checkoutRoute',
        formData,
        config
      );
      this.successDispatcher(
        res,
        Type.UPDATE_PASSWORD_SUCCESS,
        'Password update was successful'
      );
    } catch (err) {
      this.dispatch({
        type: Type.UPDATE_PASSWORD_FAILED,
        payload: err.response.data.message,
      });
    }
  };

  updateData = async (formData) => {
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
      this.successDispatcher(res, Type.UPDATE_DATA_SUCCESS, res.data.data.user);
    } catch (err) {
      this.dispatch({
        type: Type.UPDATE_DATA_FAIL,
        payload: err.response.data.message,
      });
    }
  };
}

export default AuthActions;
