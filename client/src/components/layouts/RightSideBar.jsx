import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import productContext from './../../contexts/ProductContext';
import AuthContext from '../../contexts/AuthContext';

import './../../styles/sideBarStyle.scss';

const RightSidebar = () => {
  const mealsContext = useContext(productContext);
  const authContxt = useContext(AuthContext);

  const { orders, removeFromOrders } = mealsContext;
  const { loggedInUser, isLoggedIn } = authContxt;

  const [total, setTotal] = useState(0);

  useEffect(() => {
    orders.length === 0
      ? setTotal(0)
      : setTotal(
          [...orders]
            .map((el) => el.price)
            .reduce((prev, curr) => prev + curr, 0)
        );
  }, [orders]);

  const onItemRemove = (mealID) => () => {
    removeFromOrders(mealID);
  };

  return (
    <div className="right-side">
      {loggedInUser && isLoggedIn ? (
        <NavLink to="/me">{loggedInUser.name.split(' ')[0]}</NavLink>
      ) : (
        ''
      )}

      <h1>My Order</h1>
      <div className="time_location">
        <p>{new Date().toDateString()}</p>
        <p>%location%</p>
        <p>Dial me for order specifications</p>
      </div>
      <div className="order_items">
        {orders.length === 0 ? (
          <p>No orders yet</p>
        ) : (
          orders.map((el) => (
            <div className="order_item" key={el._id}>
              <span>
                <p>{el.name}</p>
                <p>{el.serving} g</p>
              </span>
              <span>
                <button>-</button>
                <button>+</button>
              </span>
              <span>${el.price}</span>
              <button onClick={onItemRemove(el._id)}>❌</button>
            </div>
          ))
        )}
      </div>
      <div className="totals">
        <span>TOTAL</span>
        <span>{total}</span>
      </div>
      <div className="checkout_btn">CHECKOUT</div>
    </div>
  );
};

export default RightSidebar;
