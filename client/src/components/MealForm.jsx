import React, { useContext, useState, useRef } from 'react';
import productContext from './../contexts/ProductContext';

const MealForm = () => {
  const mealContext = useContext(productContext);
  const { asyncMealActions } = mealContext;
  const fileInput = useRef(null);

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
    const numericFields = [
      'price',
      'ratingsAverage',
      'ratingsQuantity',
      'serving',
    ];

    if (numericFields.includes(e.target.name)) {
      setMeal({
        ...meal,
        [e.target.name]: +e.target.value,
      });
    } else {
      setMeal({
        ...meal,
        [e.target.name]: e.target.value,
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(meal);
    setMeal({
      ...meal,
      image: fileInput.current.files[0],
    });
    asyncMealActions.addMeal(meal);
  };
  return (
    <div>
      <form onSubmit={onSubmit} encType="multipart/form-data">
        <label>NAME: </label>
        <input type="text" name="name" value={name} onChange={onChange} />
        <label>PRICE: </label>
        <input type="number" name="price" value={+price} onChange={onChange} />
        <label>AVERAGE: </label>
        <input
          type="number"
          name="ratingsAverage"
          value={+ratingsAverage}
          onChange={onChange}
        />
        <label>RATING QTY: </label>
        <input
          type="number"
          name="ratingsQuantity"
          value={+ratingsQuantity}
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
        <input
          type="number"
          name="serving"
          value={+serving}
          onChange={onChange}
        />
        <input type="file" name="image" ref={fileInput} accept="image/*" />
        <input type="submit" value="ENTER" />
      </form>
    </div>
  );
};
export default MealForm;
