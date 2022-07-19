import React, { Fragment } from 'react';
import ProductsContainer from './ProductsContainer';
import './../styles/dashBoardStyle.scss';
import './../styles/containerStyle.scss';
const Dashboard = () => {
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
