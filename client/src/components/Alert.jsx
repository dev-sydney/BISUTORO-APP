import React, { useContext, useEffect } from 'react';
import AuthContext from '../contexts/AuthContext';

import './../styles/alertStyle.scss';

const Alert = ({ setIsAlertOpen }) => {
  const authContxt = useContext(AuthContext);
  let { authMsg, clearAuthMsg } = authContxt;
  useEffect(() => {
    authMsg && setIsAlertOpen(true);
    //eslint-disable-next-line
  }, [authMsg]);
  return (
    <div className="alert">
      {authMsg ? authMsg : ''}
      <button
        onClick={() => {
          clearAuthMsg();
        }}
      >
        ❌
      </button>
    </div>
  );
};

export default Alert;
