import React, { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import productContext from './../contexts/ProductContext';
import { UilExclamationCircle, UilCheckCircle } from '@iconscout/react-unicons';

import './../styles/alertStyle.scss';

const Alert = () => {
  const authContxt = useContext(AuthContext);
  const productContxt = useContext(productContext);

  // let { authMsg, clearAuthMsg } = authContxt;
  // let { alertMsg, removeAlerts } = productContxt;

  // useEffect(() => {
  //   let m = authMsg;
  //   //eslint-disable-next-line
  // }, [authMsg, alertMsg]);
  return (
    <div
      className={`alert__container ${
        authContxt.authMsg || productContxt.alertMsg
          ? 'show_alert'
          : 'hide_alert'
      }`}
    >
      {/* NOTE: CONDITIONAL RENDERING FOR THE ALERT ICON OF THE COMPONENT (authContext) */}
      {authContxt.authMsg &&
        (authContxt.authMsg.type === 'success' ? (
          <UilCheckCircle size="50" color="#000000" />
        ) : (
          <UilExclamationCircle size="50" color="#000000" />
        ))}

      {/* NOTE: CONDITIONAL RENDERING FOR THE ALERT ICON OF THE COMPONENT (productContext) */}
      {productContxt.alertMsg &&
        (productContxt.alertMsg.type === 'success' ? (
          <UilCheckCircle size="50" color="#000000" />
        ) : (
          <UilExclamationCircle size="50" color="#000000" />
        ))}

      {/* NOTE: CONDITIONAL RENDERING FOR THE ALERT DETAILS(authContext) */}
      {authContxt.authMsg && (
        <div className="alert__details">
          <h2
            style={{
              color: `${
                authContxt.authMsg.type === 'success' ? 'black' : 'black'
              }`,
            }}
          >
            {authContxt.authMsg.heading}
          </h2>
          <p>{authContxt.authMsg.detail}</p>
        </div>
      )}
      {/* NOTE: CONDITIONAL RENDERING FOR THE ALERT DETAILS(productContext) */}
      {productContxt.alertMsg && (
        <div className="alert__details">
          <h2
            style={{
              color: `${
                productContxt.alertMsg.type === 'success' ? 'black' : 'black'
              }`,
            }}
          >
            {productContxt.alertMsg.heading}
          </h2>
          <p>{productContxt.alertMsg.detail}</p>
        </div>
      )}
    </div>
  );
};

export default Alert;
