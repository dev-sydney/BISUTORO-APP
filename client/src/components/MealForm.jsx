import React, { useContext, useState, useRef } from 'react';
import productContext from './../contexts/ProductContext';
import './../styles/mealFormStyle.scss';

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

  const { name, price, category, serving } = meal;

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
    <div className="form__container">
      <form
        onSubmit={onSubmit}
        encType="multipart/form-data"
        className="meal_form"
        style={{ color: '#ed3367' }}
      >
        <h1>ADD A NEW MEAL !</h1>
        <div className="form__fields">
          <div className="form__group">
            <label>Name of meal: </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              required
            />
          </div>
          <div className="form__group">
            <label>Price: </label>
            <input
              type="number"
              name="price"
              value={+price}
              onChange={onChange}
              required
            />
          </div>
          <div className="form__group">
            <label>Category: </label>
            <input
              type="text"
              name="category"
              value={category}
              onChange={onChange}
              required
            />
          </div>
          <div className="form__group">
            <label>Serving: </label>
            <input
              type="number"
              name="serving"
              value={+serving}
              onChange={onChange}
              required
            />
          </div>
          <label className="upload__label">
            Add meal photo +
            <input
              className="form__upload"
              id="mealPhoto"
              type="file"
              name="image"
              ref={fileInput}
              accept="image/*"
              required
            />
          </label>
        </div>
        <input className="submit_btn" type="submit" value="ENTER" />
      </form>
    </div>
  );
};
export default MealForm;
