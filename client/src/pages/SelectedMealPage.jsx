import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductContext from './../contexts/ProductContext';

import {
  UilPlus,
  UilMinus,
  UilFire,
  UilStar,
  UilClockThree,
  UilShoppingBag,
} from '@iconscout/react-unicons';
import './../styles/mealStyle.scss';
const stat = 1;

const SelectedMealPage = () => {
  let { mealId } = useParams();

  const productContxt = useContext(ProductContext);

  const addItemToCart = (selectedMeal) => () => {
    // console.log(selectedMeal);
    productContxt.addToCart(selectedMeal);
  };

  useEffect(() => {
    if (mealId) {
      productContxt.loadSelectedMeal(mealId);
    }
  }, [mealId]);

  return (
    <div style={{ minHeight: 'inherit' }}>
      {productContxt.isMealsLoading ? (
        'loading'
      ) : (
        <div className="selected_meal_page">
          <img
            role={'presentation'}
            src={`/img/meals/${
              productContxt.currentMeal && productContxt.currentMeal.image
            }`}
            alt=""
          />

          <div className="qty_controls">
            <button className="qty_btn">
              <UilMinus color="white" size="2.5em" />
            </button>
            <p>2</p>
            <button className="qty_btn">
              <UilPlus color="white" size="2.5em" />
            </button>
          </div>
          <h1 style={{ textAlign: 'left', padding: '0' }}>
            {productContxt.currentMeal && productContxt.currentMeal.name}
          </h1>
          <p style={{ textAlign: 'left' }}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero enim
            sit fuga ipsum, vel tempora sunt dolorem nisi dignissimos earum
            cumque ea est illo eligendi odit architecto voluptatem aliquam
            maxime!
          </p>

          <div className="meal_details">
            <div>
              <span>
                <UilStar color="gold" size="1.2em" />
              </span>
              <span>
                {productContxt.currentMeal &&
                  productContxt.currentMeal.ratingsAverage}
              </span>
            </div>
            <div>
              <span>
                <UilFire color="orangered" size="1.2em" />
              </span>
              <span>
                {productContxt.currentMeal && productContxt.currentMeal.serving}{' '}
                Kcal
              </span>
            </div>
            <div>
              <span>
                <UilClockThree color="green" size="1.2em" />
              </span>
              <span>8-10 min</span>
            </div>
          </div>

          <div className="price_cart">
            <div className="total_price">
              <p>Total Price</p>
              <p>
                ${productContxt.currentMeal && productContxt.currentMeal.price}
              </p>
            </div>
            <button onClick={addItemToCart(productContxt?.currentMeal)}>
              <UilShoppingBag color="black" size="1.2em" /> Add to cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectedMealPage;
