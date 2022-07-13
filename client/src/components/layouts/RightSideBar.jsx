import React, { useContext, useEffect, useState } from 'react';

import productContext from './../../contexts/ProductContext';
import AuthContext from '../../contexts/AuthContext';

import { OrderMeals } from '../../js/stripe';
import './../../styles/sideBarStyle.scss';

const RightSidebar = ({ loggedInUser }) => {
  const mealsContext = useContext(productContext);
  const authContxt = useContext(AuthContext);

  const { orders, removeFromOrders } = mealsContext;
  const { isAuthenticated, pickupLocation } = authContxt;

  const [total, setTotal] = useState(0);

  useEffect(() => {
    orders.length === 0
      ? setTotal(0)
      : setTotal(
          [...orders]
            .map((el) => el.price)
            .reduce((prev, curr) => prev + curr, 0)
        );
    //eslint-disable-next-line
  }, [orders, pickupLocation]);

  const onItemRemove = (mealID) => () => {
    removeFromOrders(mealID);
  };

  return (
    <div className="right-side">
      <div className="order_specs">
        <h1>My Order</h1>
        <div className="time_location">
          <p>
            ⌚
            {`${new Date().getHours()}:${new Date().getMinutes()}${
              new Date().getUTCHours() > 12 ? ' pm' : 'am'
            }`}
          </p>
          <p className="pickup">
            📍{pickupLocation ? pickupLocation : 'Delivery Pickup not set yet'}
          </p>
          <p>📞Dial me for order specifications</p>
        </div>
      </div>
      <hr />
      <div className="order_items">
        {orders.length === 0 ? (
          <p>No orders yet</p>
        ) : (
          orders.map((el) => (
            <div className="order_item" key={el._id}>
              <span className="image_wrapper">
                <img src={`/img/meals/${el.image}`} />
              </span>
              <span className="name_serving">
                <p
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {el.name}
                </p>
                <p style={{ color: 'darkgray' }}>{el.serving} g</p>
              </span>
              <span className="qty_controls">
                <span>-</span>
                <span>1</span>
                <span>+</span>
              </span>
              <span style={{ width: '50px', fontWeight: 'bold' }}>
                $ {el.price}
              </span>
              <span onClick={onItemRemove(el._id)}>❌</span>
            </div>
          ))
        )}
      </div>
      <div className="totals">
        <span className="total_label">TOTAL</span>
        <span className="total_value">$ {Math.round(total)}</span>
      </div>
      <button
        className="checkout_btn"
        onClick={() => {
          OrderMeals(orders);
        }}
      >
        CHECKOUT
      </button>
    </div>
  );
};

export default RightSidebar;
