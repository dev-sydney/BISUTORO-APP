import React from 'react';
import MealItem from './MealItem';
import './../styles/mealStyle.scss';

const FavouriteContainer = ({ favouriteMeals }) => {
  return (
    <div className="meals_container">
      {favouriteMeals &&
        (favouriteMeals.length > 0
          ? favouriteMeals.map((meal) => (
              <MealItem key={meal._id} meal={meal} showHeartIcon={false} />
            ))
          : 'No meals yet')}
    </div>
  );
};

export default FavouriteContainer;
