import React, { useContext } from 'react';
import { UilTrashAlt, UilArrowRight } from '@iconscout/react-unicons';
import { useNavigate } from 'react-router-dom';
import CartItemContainer from '../components/CartItemContainer';
import ProductContext from './../contexts/ProductContext';
import './../styles/cartStyle.scss';

const CartPage = () => {
  const productContxt = useContext(ProductContext);
  const navigateTo = useNavigate();
  return (
    <div className="cart-container">
      <div style={{ textAlign: 'right' }}>
        <UilTrashAlt
          size="3em"
          color="white"
          style={{
            borderRadius: '20px',
            background: '#000000',
            padding: '.5em',
          }}
          onClick={() => {
            productContxt.clearCart();
          }}
        />
      </div>

      <h1 style={{ textAlign: 'left' }}>
        My
        <br />
        Cart list
      </h1>

      {!productContxt.cart ? (
        <div>
          <h2>Empty cart</h2>
          <p>You don't any items in your cart</p>
        </div>
      ) : (
        <CartItemContainer
          cartItems={productContxt.cart.length > 0 ? productContxt.cart : null}
        />
      )}

      <div className="receipt">
        <div className="subtotal">
          <p style={{ marginRight: 'auto' }}>Subtotal</p>
          <p style={{ marginLeft: 'auto' }}>$ 96.00</p>
        </div>

        <div className="subtotal tax">
          <p style={{ marginRight: 'auto' }}>Est.Tax</p>
          <p style={{ marginLeft: 'auto' }}>$ 00.00</p>
        </div>

        <div className="subtotal tax">
          <p style={{ marginRight: 'auto' }}>Delivery</p>
          <p style={{ marginLeft: 'auto' }}>Free</p>
        </div>

        <div className="total subtotal">
          <h2 style={{ marginRight: 'auto' }}>Total</h2>
          <h2 style={{ marginLeft: 'auto' }}>$ 96.00</h2>
        </div>
        <button
          className="checkout_btn"
          onClick={() => {
            productContxt.checkout(productContxt.cart, navigateTo);
          }}
        >
          Checkout <UilArrowRight size="3em" color="white" />
        </button>
      </div>
    </div>
  );
};

export default CartPage;
