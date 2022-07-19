import React, { useContext, useEffect, useState } from 'react';
import productContext from './../../contexts/ProductContext';
import AuthContext from '../../contexts/AuthContext';

import { OrderMeals } from '../../js/stripe';
import './../../styles/sideBarStyle.scss';

const RightSidebar = ({ loggedInUser }) => {
  const mealsContext = useContext(productContext);
  const authContxt = useContext(AuthContext);

  const { orders, removeFromOrders } = mealsContext;
  const { pickupLocation } = authContxt;

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
            <lord-icon
              src="https://cdn.lordicon.com/abgtphux.json"
              trigger="hover"
              colors="primary:#e8308c"
              style={{ width: '20px', height: '20px' }}
            ></lord-icon>
            {` ${new Date().getHours()}:${new Date().getMinutes()}${
              new Date().getUTCHours() > 12 ? ' pm' : 'am'
            }`}
          </p>
          <p className="pickup">
            📍 {pickupLocation ? pickupLocation : 'Delivery Pickup not set yet'}
          </p>
          <p>
            <lord-icon
              src="https://cdn.lordicon.com/hcndxtmn.json"
              trigger="hover"
              colors="primary:#e83a30"
              state="hover-phone-ring"
              style={{ width: '20px', height: '20px' }}
            ></lord-icon>{' '}
            Dial me for order specifications
          </p>
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
                <img src={`/img/meals/${el.image}`} alt={el.name} />
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
              <span style={{ fontWeight: 'bold', width: '40px' }}>
                $ {el.price}
              </span>
              <span
                className="remove__btn"
                onClick={onItemRemove(el._id)}
                style={{ cursor: 'pointer' }}
              >
                &#x2715;
              </span>
            </div>
          ))
        )}
      </div>
      <div className="totals">
        <span className="total_label">Total</span>
        <span className="total_value">$ {Math.round(total)}</span>
      </div>
      <button
        className="checkout_btn"
        onClick={() => {
          if (orders.length < 1) return;
          OrderMeals(orders);
        }}
      >
        CHECKOUT
      </button>
    </div>
  );
};

export default RightSidebar;
