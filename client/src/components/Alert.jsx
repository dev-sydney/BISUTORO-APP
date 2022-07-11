import React, { useContext, useEffect } from 'react';
import AuthContext from '../contexts/AuthContext';
import productContext from './../contexts/ProductContext';

import './../styles/alertStyle.scss';

const Alert = ({ setIsAlertOpen }) => {
  const authContxt = useContext(AuthContext);
  const productContxt = useContext(productContext);

  let { authMsg, clearAuthMsg, authMsgType } = authContxt;
  let { alertMsg, alertMsgType, removeAlerts } = productContxt;

  useEffect(() => {
    authMsg && setIsAlertOpen(true);
    //eslint-disable-next-line
  }, [authMsg, alertMsg]);
  return (
    <div
      className={`alert ${authMsg || alertMsg ? 'show' : 'hidden'} ${
        authMsgType || alertMsgType ? 'success' : 'error'
      }`}
    >
      {authMsg && authMsg}
      {alertMsg && alertMsg}
      <button
        onClick={() => {
          clearAuthMsg();
          removeAlerts();
        }}
      >
        ❌
      </button>
    </div>
  );
};

export default Alert;
