import React, { useContext, useEffect, useState } from 'react';
import './../styles/sideBarStyle.scss';
import './../styles/productStyle.scss';

import ProductContext from './../contexts/ProductContext';

const Product = ({ meal, setIsModal, isFavouritesPage, isModal }) => {
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
    setIsModal(!isModal);
  };
  const onActivateClick = () => {
    asyncMealActions.ActivateDeactivateMeal(meal);
    setIsActivitated(!isActivitated);
  };
  const onDeleteClick = () => {
    asyncMealActions.deleteMeal(meal._id);
  };
  return (
    <div className="product">
      <div className="rating_favorite">
        <span className="ratings">⭐{meal.ratingsAverage}</span>
        <span>
          {!isFavouritesPage ? (
            <div>
              <lord-icon
                src="https://cdn.lordicon.com/dovoajyj.json"
                trigger="hover"
                style={{ width: '20px', height: '20px' }}
                onClick={onDeleteClick}
              ></lord-icon>
              <button onClick={onActivateClick}>
                {isActivitated ? 'Deactivate' : 'Activate'}
              </button>
            </div>
          ) : (
            <lord-icon
              src="https://cdn.lordicon.com/kkcllwsu.json"
              trigger="click"
              colors="primary:#000000"
              state="morph"
              style={{ width: '32px', height: '32px', cursor: 'pointer' }}
              onClick={() => {
                asyncMealActions.AddMealToFavorites(meal._id);
              }}
            ></lord-icon>
          )}
        </span>
      </div>
      <div className="photo_wrapper">
        <img
          src={`/img/meals/${meal.image ? meal.image : 'meal-1.png'}`}
          alt="Meal"
          onClick={setCurrent}
        />
      </div>

      <h3>{meal.name}</h3>
      <div className="name_price_serving">
        <span className="serving">{meal.serving} g</span>
        <span style={{ fontWeight: 'bolder' }}>$ {meal.price}</span>
      </div>
    </div>
  );
};

export default Product;
