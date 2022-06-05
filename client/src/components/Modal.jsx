import React, { useContext } from 'react';
import './../styles/ModalStyle.scss';

import productContext from './../contexts/ProductContext';

const Modal = ({ setIsModalOpen }) => {
  const mealsContext = useContext(productContext);
  const { currentMeal, addToOrder } = mealsContext;

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
        <div>
          <img src={`/img/meals/${currentMeal.image}`} alt={currentMeal.name} />
          <div>{currentMeal.name}</div>
          <div>{currentMeal.serving} g</div>
          <div>${currentMeal.price}</div>
          <button onClick={onAddOrder}>Add To Order</button>
        </div>
      </div>
    </div>
  );
};
export default Modal;
