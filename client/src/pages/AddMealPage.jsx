import React, { useContext, useState, useRef } from 'react';
import ProductContext from './../contexts/ProductContext';
import './../styles/mealFormStyle.scss';

const AddMealPage = () => {
  const productContxt = useContext(ProductContext);

  const fileInput = useRef(null);

  const [meal, setMeal] = useState({
    name: '',
    price: 0,
    ratingsAverage: 0,
    ratingsQuantity: 0,
    category: '',
    serving: 0,
  });
  const onChange = (e) => {
    setMeal({ ...meal, [e.target.name]: e.target.value });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(meal).forEach((el) => {
      formData.append(`${el}`, meal[el]);
    });

    formData.append('image', fileInput.current.files[0]);
    productContxt.addNewMeal(formData);
  };

  return (
    <div className="meal_form_container">
      <h1 style={{ textAlign: 'left' }}>
        Add A<br />
        Meal
      </h1>
      <form onSubmit={onFormSubmit} encType="multipart/form-data">
        <div className="input-block">
          <input
            type="text"
            name="name"
            value={meal.name}
            onChange={onChange}
            required
          />
          <span className="placeholder">Name:</span>
        </div>

        <div className="input-block">
          <input
            type="number"
            name="price"
            value={meal.price}
            onChange={onChange}
            required
          />
          <span className="placeholder">Price:</span>
        </div>

        <div className="input-block">
          <input
            type="number"
            name="serving"
            value={meal.serving}
            onChange={onChange}
            required
          />
          <span className="placeholder">Serving:</span>
        </div>

        <div className="input-block">
          <select
            name="category"
            required
            onChange={onChange}
            value={meal.category}
          >
            <option>Categogry</option>
            <option value="dessert">Dessert</option>
            <option value="main">Main</option>
            <option value="appetizer">Appetizer</option>
          </select>
        </div>
        <div className="input-block">
          <label>
            Add Meal Photo
            <input
              //   className="form__upload"
              id="mealPhoto"
              type="file"
              name="image"
              ref={fileInput}
              accept="image/*"
              required
            />
          </label>
        </div>
        <input
          className="submit_btn"
          type="submit"
          value="Done"
          onClick={onFormSubmit}
        />
      </form>
    </div>
  );
};

export default AddMealPage;
