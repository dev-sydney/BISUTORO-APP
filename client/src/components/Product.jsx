import React, { useContext, useEffect, useState } from 'react';
import './../styles/sideBarStyle.scss';
import './../styles/productStyle.scss';

import ProductContext from './../contexts/ProductContext';

const Product = ({ meal, setIsModalOpen, isFavouritesPage }) => {
  const [isActivitated, setIsActivitated] = useState(meal.isActive);
  useEffect(() => {
    setIsActivitated(meal.isActive);
    //eslint-disable-next-line
  }, [isActivitated]);

  const mealsContext = useContext(ProductContext);
  const {
    setCurrentMeal,
    AddMealToFavorites,
    ActivateDeactivateMeal,
    currentMeal,
    deleteMeal,
  } = mealsContext;

  const setCurrent = () => {
    setCurrentMeal(meal);
    setIsModalOpen(true);
  };
  const onActivateClick = () => {
    ActivateDeactivateMeal(currentMeal);
    setIsActivitated(!isActivitated);
  };
  const onDeleteClick = () => {
    deleteMeal(meal._id);
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
                AddMealToFavorites(meal._id);
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
