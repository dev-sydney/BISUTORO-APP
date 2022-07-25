import axios from 'axios';
export const instance = axios.create({
  // headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  withCredentials: true,
});
export const config = {
  headers: {
    'Content-type': 'application/json',
  },
};

export const asyncActions = (fn, type, dispatch) => () => {
  fn().catch((err) => {
    console.log(err);
    dispatch({
      type,
      payload: err.response.data.message,
    });
  });
};
