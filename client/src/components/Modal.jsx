import React, { useContext, useState } from 'react';

import ReviewContainer from './ReviewContainer';
import './../styles/ModalStyle.scss';

import productContext from './../contexts/ProductContext';

const Modal = ({ setIsModalOpen }) => {
  const mealsContext = useContext(productContext);
  const { currentMeal, addToOrder } = mealsContext;
  const [reviewBlock, setReviewBlock] = useState(false);

  const onClick = () => {
    setIsModalOpen(false);
  };
  const onAddOrder = () => {
    addToOrder(currentMeal);
  };
  return (
    <div className="modal_bg">
      <button onClick={onClick}>❌</button>
      <div className="md_window">
        {!reviewBlock ? (
          <div>
            <img
              src={`/img/meals/${currentMeal.image}`}
              alt={currentMeal.name}
            />
            <div>{currentMeal.name}</div>
            <div>{currentMeal.serving} g</div>
            <div>${currentMeal.price}</div>

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

            <button onClick={onAddOrder}>Add To Order</button>
          </div>
        ) : (
          <ReviewContainer setReviewBlock={setReviewBlock} />
        )}
      </div>
    </div>
  );
};
export default Modal;
