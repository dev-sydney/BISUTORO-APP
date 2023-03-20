import React from 'react';
import { UilPlus, UilMinus } from '@iconscout/react-unicons';
import './../styles/cartStyle.scss';

const CartItem = () => {
  return (
    <div className="cart_item">
      <img src="/img/meals/meal-5.png" alt="" />
      <div className="name_price">
        <p>Thai Spaghetti fdgfgdgdf</p>
        <b>$13.99 x2</b>
      </div>
      <div className="qty_btns">
        <button className="qty_btn" style={{ background: '#000000ce' }}>
          <UilPlus size="1.5em" color="white" />
        </button>
        <button className="qty_btn">
          <UilMinus size="1.5em" color="white" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
