import React from 'react';
import './../styles/ModalStyle.scss';

const ModalBackground = ({ children }) => {
  return <div className="modal_bg">{children}</div>;
};

export default ModalBackground;
