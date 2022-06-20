import React, { useEffect, useState } from 'react';

import ProductsContainer from './ProductsContainer';
import CategoriesContainer from './CategoriesContainer';

import './../styles/dashBoardStyle.scss';

const Dashboard = () => {
  const [isProductTab, setIsProductTab] = useState(true);
  const onClick = () => {
    setIsProductTab(!isProductTab);
  };

  return (
    <div className="admin">
      <h1>DashBoard</h1>
      <div className="controls">
        <span onClick={onClick}>Products</span>
        <span onClick={onClick}>Categories</span>
      </div>
      <div>
        {isProductTab ? <ProductsContainer /> : <CategoriesContainer />}
      </div>
    </div>
  );
};

export default Dashboard;
