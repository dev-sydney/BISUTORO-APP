import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
const Dashboard = () => {
  return (
    <Fragment>
      <div>
        <NavLink to="/dashboard/products">PRODUCTS</NavLink>
      </div>
      <div>
        <NavLink to="/dashboard/categories">CATEGORIES</NavLink>
      </div>
    </Fragment>
  );
};

export default Dashboard;
