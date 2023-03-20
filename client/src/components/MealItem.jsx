import React from 'react';
import { UilHeartSign } from '@iconscout/react-unicons';
import { Link } from 'react-router-dom';
import './../styles/mealStyle.scss';

const MealItem = ({ meal }) => {
  return (
    <div className="meal__item">
      <Link to={`/meals/${meal._id}`}>
        <img role={'presentation'} src={`/img/meals/${meal.image}`} alt="" />
        <h2 className="meal_name">{meal && meal.name}</h2>
        <div className="price__heart">
          <p style={{ color: 'black', fontWeight: '900', fontSize: '1.5em' }}>
            $ {meal && meal.price}
          </p>
          <div className="heart_icon">
            <UilHeartSign size="30" color="black" />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MealItem;
