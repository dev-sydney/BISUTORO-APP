import React, { useEffect, useContext } from 'react';
import MealContainer from '../components/MealContainer';
import ProductContext from './../contexts/ProductContext';
import MealSkeletonLoading from '../components/MealSkeletonLoading';
import { UilShoppingCart, UilBookmark } from '@iconscout/react-unicons';
import { Link } from 'react-router-dom';
import './../styles/homepageStyle.scss';

const HomePage = () => {
  const productContext = useContext(ProductContext);

  useEffect(() => {
    productContext.loadAllMeals();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="home-container">
      <div style={{ textAlign: 'right' }}>
        <Link to="/cart">
          <UilShoppingCart
            size="3em"
            color="white"
            style={{
              borderRadius: '20px',
              background: '#000000',
              padding: '.5em',
            }}
          />
        </Link>
        <Link to="/table-reservations">
          <UilBookmark
            size="3em"
            color="white"
            style={{
              borderRadius: '20px',
              background: '#000000',
              padding: '.5em',
            }}
          />
        </Link>
      </div>
      <h1 style={{ textAlign: 'left', fontSize: '2.5em', padding: '0' }}>
        Delicious food
      </h1>
      <p
        style={{
          textAlign: 'left',
          fontWeight: '900',
          fontSize: '1.4em',
          margin: '0.5em 0',
          overflow: 'hidden',
          maxWidth: '99%',
          // outline: 1px solid red,
          color: 'gray',
          whitespace: 'nowrap',
        }}
      >
        We made fresh and healthly food.
      </p>

      <div className="categories">
        <p>Desserts</p>
        <p>main</p>
        <p>Appetizer</p>
        <p>Desserts</p>
      </div>
      {productContext.isMealsLoading ? (
        <MealSkeletonLoading />
      ) : (
        <MealContainer meals={productContext.meals} />
      )}
    </div>
  );
};

export default HomePage;
