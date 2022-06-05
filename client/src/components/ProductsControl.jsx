import React, { Fragment, useContext } from 'react';
import { NavLink } from 'react-router-dom';

import ProductContext from './../contexts/ProductContext';

import Product from './Product';
import './../styles/containerStyle.scss';

const ProductsControl = () => {
  const mealsContext = useContext(ProductContext);
  const { meals } = mealsContext;

  return (
    <Fragment>
      <NavLink to="/mealform">
        <button>ADD MEAL</button>
      </NavLink>
      <div className="product_container">
        {meals.map((el) => (
          <Product meal={el} key={el._id} />
        ))}
      </div>
    </Fragment>
  );
};
export default ProductsControl;
