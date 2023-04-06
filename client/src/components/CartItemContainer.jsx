import React from 'react';
import CartItem from './CartItem';

const CartItemContainer = ({ cartItems }) => {
  return (
    <div style={{ outline: '1px solid gray', borderRadius: '10px' }}>
      {cartItems.map((cartItem) => (
        <CartItem cartItem={cartItem} key={cartItem._id} />
      ))}
    </div>
  );
};

export default CartItemContainer;
