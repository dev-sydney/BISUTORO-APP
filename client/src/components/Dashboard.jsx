import React from 'react';

import ProductsContainer from './ProductsContainer';
import './../styles/dashBoardStyle.scss';
const Dashboard = () => {
  return (
    <div className="admin">
      <h1>DashBoard</h1>
      <div className="controls">
        <span className="tabs">Products</span>
      </div>
      <div>
        <ProductsContainer />
      </div>
    </div>
  );
};

export default Dashboard;
