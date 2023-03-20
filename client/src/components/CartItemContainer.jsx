import React from 'react';
import CartItem from './CartItem';

const CartItemContainer = () => {
  return (
    <div style={{ outline: '1px solid gray', borderRadius: '10px' }}>
      <CartItem />
      <CartItem />
      <CartItem />
    </div>
  );
};

export default CartItemContainer;
