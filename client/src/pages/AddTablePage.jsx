import React, { useState, useRef, useContext } from 'react';
import ProductContext from './../contexts/ProductContext';

const AddTablePage = () => {
  const productContxt = useContext(ProductContext);
  const fileInput = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    seating: 0,
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    const multiFormData = new FormData();

    Object.keys(formData).forEach((el) => {
      multiFormData.append(`${el}`, formData[el]);
    });

    multiFormData.append('photo', fileInput.current.files[0]);
    productContxt.addNewTable(multiFormData);
  };

  return (
    <div>
      <h1 style={{ textAlign: 'left' }}>
        Add a<br />
        Table
      </h1>
      <form encType={'mmultipart/form-data'}>
        <div className="input-block">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onChange}
            required
          />
          <span className="placeholder">Name:</span>
        </div>
        <div className="input-block">
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={onChange}
            required
          />
          <span className="placeholder">Price:</span>
        </div>
        <div className="input-block">
          <input
            type="number"
            name="seating"
            value={formData.seating}
            onChange={onChange}
            required
            max={'10'}
            maxLength={'10'}
          />
          <span className="placeholder">Seating:</span>
        </div>
        <div className="input-block">
          <label>
            Add Table Photo
            <input
              //   className="form__upload"
              // id="mealPhoto"
              type="file"
              name="photo"
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
          onClick={onSubmit}
        />
      </form>
    </div>
  );
};

export default AddTablePage;
