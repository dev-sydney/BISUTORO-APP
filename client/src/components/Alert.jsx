import React, { useContext, useEffect } from 'react';
import AuthContext from '../contexts/AuthContext';
import productContext from './../contexts/ProductContext';

import './../styles/alertStyle.scss';

const Alert = ({ setIsAlertOpen }) => {
  const authContxt = useContext(AuthContext);
  const productContxt = useContext(productContext);

  let { authMsg, clearAuthMsg } = authContxt;
  let { alertMsg, removeAlerts } = productContxt;

  useEffect(() => {
    let m = authMsg;
    //eslint-disable-next-line
  }, [authMsg, alertMsg]);
  return (
    <div className={`alert ${authMsg || alertMsg ? 'show' : 'hidden'}`}>
      <div className={`alert__content`}>
        {authMsg && authMsg}
        {alertMsg && alertMsg}
        <lord-icon
          src="https://cdn.lordicon.com/vfzqittk.json"
          trigger="hover"
          style={{ width: '30px', height: '30px' }}
          colors="primary:#ffffff"
          onClick={() => {
            clearAuthMsg();
            removeAlerts();
          }}
        ></lord-icon>
      </div>
    </div>
  );
};

export default Alert;
