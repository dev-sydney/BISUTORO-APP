import React from 'react';
import MealItem from './MealItem';
// import ProductContext from './../contexts/ProductContext';
import './../styles/mealStyle.scss';

const MealConatiner = ({ meals }) => {
  return (
    <div className="meals_container">
      {meals &&
        (meals.length > 0
          ? meals.map((meal) => <MealItem key={meal._id} meal={meal} />)
          : 'No meals yet')}
    </div>
  );
};

export default MealConatiner;
