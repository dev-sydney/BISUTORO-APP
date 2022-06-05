import React, { useContext, useState } from 'react';
import productContext from './../contexts/ProductContext';

const MealForm = () => {
  const mealContext = useContext(productContext);
  const { addMeal } = mealContext;
  const [meal, setMeal] = useState({
    name: '',
    price: 0,
    ratingsAverage: 0,
    ratingsQuantity: 0,
    category: '',
    serving: 0,
  });

  const { name, price, ratingsAverage, ratingsQuantity, category, serving } =
    meal;

  const onChange = (e) => {
    setMeal({
      ...meal,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    addMeal(meal);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>NAME: </label>
        <input type="text" name="name" value={name} onChange={onChange} />
        <label>PRICE: </label>
        <input type="text" name="price" value={price} onChange={onChange} />
        <label>AVERAGE: </label>
        <input
          type="text"
          name="ratingsAverage"
          value={ratingsAverage}
          onChange={onChange}
        />
        <label>RATING QTY: </label>
        <input
          type="text"
          name="ratingsQuantity"
          value={ratingsQuantity}
          onChange={onChange}
        />
        <label>CATEGORY: </label>
        <input
          type="text"
          name="category"
          value={category}
          onChange={onChange}
        />
        <label>SERVING: </label>
        <input type="text" name="serving" value={serving} onChange={onChange} />
        <input type="submit" value="ENTER" />
      </form>
    </div>
  );
};
export default MealForm;
