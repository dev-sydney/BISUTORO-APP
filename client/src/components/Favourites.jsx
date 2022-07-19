import React, { useContext, useEffect, useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

import MealContext from './../contexts/ProductContext';
import AuthContext from './../contexts/AuthContext';

import Product from './Product';
import Modal from './Modal';

import './../styles/containerStyle.scss';

const Favourites = () => {
  const mealContxt = useContext(MealContext);
  const authcontxt = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const { favourites, currentMeal, asyncMealActions } = mealContxt;
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
      <h1 style={{ height: '3em', paddingTop: '1em' }}>My Favourites</h1>

      <hr />
      <div style={{ padding: '0 10em', height: '100%' }}>
        {isModalOpen && (
          <Modal setIsModalOpen={setIsModalOpen} currentMeal={currentMeal} />
        )}
        {favourites.length > 0 ? (
          <div className="product_container" style={{ padding: '0 10em' }}>
            {favourites.map((el) => (
              <Product
                key={el._id}
                meal={el}
                setIsModalOpen={setIsModalOpen}
                isFavouritesPage={true}
              />
            ))}
          </div>
        ) : (
          <h1>No Favourites yet</h1>
        )}
      </div>
    </Fragment>
  );
};
export default Favourites;
