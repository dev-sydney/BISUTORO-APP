import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ProductContext from '../contexts/ProductContext';
import AuthContext from '../contexts/AuthContext';

import Product from '../components/Product';
import RightSidebar from '../components/layouts/RightSideBar';
import SkeletonProduct from '../components/SkeletonProduct';

import './../../styles/sideBarStyle.scss';
import './../../styles/homeStyle.scss';

const Home = ({ setIsModal }) => {
  const mealsContext = useContext(ProductContext);
  const authContxt = useContext(AuthContext);

  const { meals, asyncMealActions } = mealsContext;
  const { isAuthenticated, loggedInUser } = authContxt;

  const [isFavouritesPage] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      asyncMealActions.loadAllMeals();
    } else {
      navigate('/login');
    }
    //eslint-disable-next-line
  }, [isAuthenticated]);
  return (
    <div className="home">
      <div className="product_container">
        {meals &&
          (meals.length === 0 ? (
            <h2>No meals available at the moment</h2>
          ) : (
            meals.map((el) => (
              <Product
                meal={el}
                key={el._id}
                setIsModal={setIsModal}
                isFavouritesPage={isFavouritesPage}
              />
            ))
          ))}
        {!meals && [1, 2, 3, 4, 5, 6].map((el) => <SkeletonProduct key={el} />)}
      </div>
      <RightSidebar loggedInUser={loggedInUser} />
    </div>
  );
};
export default Home;
