import React, { Fragment, useContext, useState, useEffect } from 'react';

import ProductContext from '../contexts/ProductContext';

import Product from './Product';
import './../styles/containerStyle.scss';

const ProductsControl = () => {
  const mealsContext = useContext(ProductContext);
  const { meals, loadAllMeals } = mealsContext;

  useEffect(() => {
    loadAllMeals();
    //eslint-disable-next-line
  }, [meals]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavouritesPage, setIsFavouritesPage] = useState(false);

  return (
    <Fragment>
      <div className="product_container">
        {meals.map((el) => (
          <Product
            meal={el}
            key={el._id}
            setIsModalOpen={setIsModalOpen}
            isFavouritesPage={isFavouritesPage}
          />
        ))}
      </div>
    </Fragment>
  );
};
export default ProductsControl;
