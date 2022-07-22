import React, { useContext, useEffect, useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

import MealContext from './../contexts/ProductContext';
import AuthContext from './../contexts/AuthContext';

import Product from './Product';
import Modal from './Modal';
import SkeletonProduct from './SkeletonProduct';
import './../styles/containerStyle.scss';

const Favourites = ({ setIsModal }) => {
  const mealContxt = useContext(MealContext);
  const authcontxt = useContext(AuthContext);

  const navigate = useNavigate();

  const { favourites, asyncMealActions } = mealContxt;
  const { isAuthenticated } = authcontxt;
  useEffect(() => {
    if (isAuthenticated) {
      asyncMealActions.loadFavoriteMeals();
    } else {
      navigate('/login');
    }
    //eslint-disable-next-line
  }, [isAuthenticated]);
  return (
    <Fragment>
      <h1 style={{ height: '3em', paddingTop: '1em', paddingLeft: '7.5em' }}>
        My Favourites
      </h1>

      <hr />
      <div style={{ padding: '0em 10em' }}>
        <div className="product_container">
          {favourites &&
            (favourites.length === 0 ? (
              <h2>No favourites available at the moment</h2>
            ) : (
              favourites.map((el) => (
                <Product
                  meal={el}
                  key={el._id}
                  setIsModal={setIsModal}
                  isFavouritesPage={true}
                />
              ))
            ))}
          {!favourites &&
            [1, 2, 3, , 4, 5, 6].map((el) => <SkeletonProduct key={el} />)}
        </div>
      </div>
    </Fragment>
  );
};
export default Favourites;
