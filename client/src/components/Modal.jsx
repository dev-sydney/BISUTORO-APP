import React, { useContext, useState } from 'react';

import ReviewContainer from './ReviewContainer';
import './../styles/ModalStyle.scss';

import productContext from './../contexts/ProductContext';
import AuthContext from '../contexts/AuthContext';

const Modal = ({ setIsModalOpen }) => {
  const authContxt = useContext(AuthContext);
  const mealsContext = useContext(productContext);

  const { asyncAuthActions } = authContxt;
  const { currentMeal, addToOrder } = mealsContext;
  const [reviewBlock, setReviewBlock] = useState(false);

  const onClick = () => {
    setIsModalOpen(false);
  };
  const onAddOrder = () => {
    asyncAuthActions.getPickLocation();
    addToOrder(currentMeal);
  };
  return (
    <div className="modal_bg">
      <button className="close_btn" onClick={onClick}>
        ❌
      </button>
      <div className="md_window">
        {!reviewBlock ? (
          <div className="meal_info">
            <div className="img_wrapper">
              <img
                src={`/img/meals/${currentMeal.image}`}
                alt={currentMeal.name}
              />
            </div>
            <h1>{currentMeal.name}</h1>
            <p className="serving">{currentMeal.serving} g</p>
            <div className="price">${currentMeal.price}</div>

            <div
              onClick={() => {
                setReviewBlock(!reviewBlock);
              }}
            >
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
              <span>How about a review ?</span>
            </div>

            <button className="add_order_btn" onClick={onAddOrder}>
              Add To Order
            </button>
          </div>
        ) : (
          <ReviewContainer setReviewBlock={setReviewBlock} />
        )}
      </div>
    </div>
  );
};
export default Modal;
