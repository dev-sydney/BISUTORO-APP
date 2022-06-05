import React, { useContext, useEffect } from 'react';
import AuthContext from '../contexts/AuthContext';

import './../styles/alertStyle.scss';

const Alert = ({ setIsAlertOpen }) => {
  const authContxt = useContext(AuthContext);
  let { authMsg, clearAuthMsg } = authContxt;
  useEffect(() => {
    authMsg && setIsAlertOpen(true);
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
