import React from 'react';
import './../styles/skeletonStyling.scss';
const MealSkeletonLoading = () => {
  return (
    <div className="skeleton_meals_container">
      {[12, 3, 45, 6].map((el) => (
        <div className="meal__item" key={el}>
          <div className="img"></div>
          <h2> </h2>
          <div className="price__heart">
            <p> </p>
            <div className="heart_icon"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MealSkeletonLoading;
