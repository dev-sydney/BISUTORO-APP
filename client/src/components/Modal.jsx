import React, { useContext, useState, useEffect } from 'react';

import ReviewContainer from './ReviewContainer';
import './../styles/ModalStyle.scss';

import productContext from './../contexts/ProductContext';
import AuthContext from '../contexts/AuthContext';

const Modal = ({ isModal, setIsModal }) => {
  const authContxt = useContext(AuthContext);
  const mealsContext = useContext(productContext);

  const { asyncAuthActions } = authContxt;
  const { currentMeal, addToOrder, setModalOpen } = mealsContext;
  const [reviewBlock, setReviewBlock] = useState(false);

  const onClick = () => {
    setIsModal(!isModal);
  };
  const onAddOrder = () => {
    asyncAuthActions.getPickLocation();
    addToOrder(currentMeal);
  };
  return (
    <div className={`modal_bg ${isModal ? 'mod__show' : 'mod__hidden'}`}>
      {/* <button className="close_btn" >
        ❌
      </button> */}
      <div className="close__bar" onClick={onClick}></div>
      <div className={`md_window ${isModal ? 'win_show' : 'win_hidden'}`}>
        {!reviewBlock ? (
          <div className="meal_info">
            <div className="img_wrapper">
              <img
                src={`/img/meals/${
                  currentMeal ? currentMeal.image : 'meal-1.png'
                }`}
              />
            </div>
            <h1>{currentMeal ? currentMeal.name : ''}</h1>
            <p className="serving">
              {currentMeal ? currentMeal.serving : ''} g
            </p>
            <div className="price">${currentMeal ? currentMeal.price : ''}</div>

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
              Add To Order{'     '}
              <lord-icon
                src="https://cdn.lordicon.com/aoggitwj.json"
                trigger="hover"
                colors="primary:#ffffff"
                style={{ width: '30px', height: '30px' }}
              ></lord-icon>
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
