import React, { useContext } from 'react';
import './../styles/sideBarStyle.scss';
import './../styles/productStyle.scss';

import ProductContext from './../contexts/ProductContext';

const Product = ({ meal, setIsModalOpen, isFavouritesPage }) => {
  const mealsContext = useContext(ProductContext);
  const { setCurrentMeal, AddMealToFavorites } = mealsContext;

  const setCurrent = () => {
    setCurrentMeal(meal);
    setIsModalOpen(true);
  };

  return (
    <div className="links product" onClick={setCurrent}>
      <div>
        <span>⭐{meal.ratingsAverage}</span>
        <span>
          {isFavouritesPage ? (
            '🗑️'
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
