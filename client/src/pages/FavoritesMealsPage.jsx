import React, { useContext, useEffect } from 'react';
import ProductContext from './../contexts/ProductContext';
import FavouriteContainer from '../components/FavouriteContainer';
import MealSkeletonLoading from '../components/MealSkeletonLoading';
import { UilShoppingCart } from '@iconscout/react-unicons';
import { Link } from 'react-router-dom';
import './../styles/homepageStyle.scss';

const FavoritesMealsPage = () => {
  const productContxt = useContext(ProductContext);
  useEffect(() => {
    productContxt.loadFavorites();
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
      </div>
      <h1 style={{ padding: '0', margin: '0.5em 0' }}>
        Your
        <br />
        Favourites Meals
      </h1>
      {productContxt.isMealsLoading ? (
        <MealSkeletonLoading />
      ) : (
        <FavouriteContainer favouriteMeals={productContxt.favourites} />
      )}
    </div>
  );
};

export default FavoritesMealsPage;
