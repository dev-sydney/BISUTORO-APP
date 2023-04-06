import React from 'react';
import { UilPlus, UilMinus } from '@iconscout/react-unicons';
import './../styles/cartStyle.scss';

const CartItem = ({ cartItem }) => {
  return (
    <div className="cart_item">
      <img src={`/img/meals/${cartItem.image}`} alt="" />
      <div className="name_price">
        <p>{cartItem?.name}</p>
        <b>
          ${cartItem?.price} x{cartItem?.qty}
        </b>
      </div>
      <div className="qty_btns">
        <button
          className="qty_btn"
          style={{ background: '#000000ce' }}
          onClick={() => {
            cartItem.incrementQty();
          }}
        >
          <UilPlus size="1.5em" color="white" />
        </button>
        <button
          className="qty_btn"
          onClick={() => {
            cartItem.decreaseQty();
          }}
        >
          <UilMinus size="1.5em" color="white" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
