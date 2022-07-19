import React, { Fragment, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
///////////////////////////////////////////////
import AuthContext from '../contexts/AuthContext';

import ProductsContainer from './ProductsContainer';

import './../styles/dashBoardStyle.scss';
import './../styles/containerStyle.scss';
const Dashboard = () => {
  const authContxt = useContext(AuthContext);
  const { loggedInUser, isAuthenticated } = authContxt;

  const navigate = useNavigate();

  const allowedRoles = ['admin', 'manager'];

  useEffect(() => {
    if (!isAuthenticated || !allowedRoles.includes(loggedInUser.role)) {
      navigate('/');
    }
  }, [loggedInUser, isAuthenticated]);
  return (
    <Fragment>
      <h1>DashBoard</h1>
      <div className="admin">
        <ProductsContainer />
      </div>
    </Fragment>
  );
};

export default Dashboard;
