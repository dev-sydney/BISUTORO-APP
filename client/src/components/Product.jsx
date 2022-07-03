import React, { useContext, useEffect, useState } from 'react';
import './../styles/sideBarStyle.scss';
import './../styles/productStyle.scss';

import ProductContext from './../contexts/ProductContext';

const Product = ({ meal, setIsModalOpen, isFavouritesPage }) => {
  const [isActivitated, setIsActivitated] = useState(meal.isOnSale);
  useEffect(() => {
    setIsActivitated(meal.isOnSale);
    //eslint-disable-next-line
  }, [meal]);

  const mealsContext = useContext(ProductContext);
  const { setCurrentMeal, asyncMealActions, aysncReviewActions } = mealsContext;

  const setCurrent = () => {
    setCurrentMeal(meal);
    aysncReviewActions.loadReviewsOnMeal(meal._id);
    setIsModalOpen(true);
  };
  const onActivateClick = () => {
    asyncMealActions.ActivateDeactivateMeal(meal);
    setIsActivitated(!isActivitated);
  };
  const onDeleteClick = () => {
    asyncMealActions.deleteMeal(meal._id);
  };
  return (
    <div className="links product">
      <div>
        <span>⭐{meal.ratingsAverage}</span>
        <span>
          {!isFavouritesPage ? (
            <div>
              <button onClick={onDeleteClick}>🗑️</button>
              <button onClick={onActivateClick}>
                {isActivitated ? 'Deactivate' : 'Activate'}
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                asyncMealActions.AddMealToFavorites(meal._id);
              }}
            >
              💗
            </button>
          )}
        </span>
      </div>
      <div>
        <img
          src={`/img/meals/${meal.image ? meal.image : 'meal-1.png'}`}
          alt="Meal"
          onClick={setCurrent}
        />
      </div>
      <div>
        <span>{meal.name}</span>
        <span>{meal.serving} g</span>
        <p>${meal.price}</p>
      </div>
    </div>
  );
};

export default Product;
