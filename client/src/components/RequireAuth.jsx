import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from './../contexts/AuthContext';

const RequireAuth = ({ children }) => {
  const authContxt = useContext(AuthContext);
  if (!authContxt?.user) return <Navigate to="/login" />;

  return children;
};

export default RequireAuth;
