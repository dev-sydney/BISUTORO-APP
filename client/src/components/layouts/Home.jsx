import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ProductContext from '../../contexts/ProductContext';
import AuthContext from '../../contexts/AuthContext';

import Product from '../Product';
import Modal from '../Modal';
import RightSidebar from './RightSideBar';

import './../../styles/sideBarStyle.scss';
import './../../styles/containerStyle.scss';
import './../../styles/homeStyle.scss';

const Home = ({ setIsModal }) => {
  const mealsContext = useContext(ProductContext);
  const authContxt = useContext(AuthContext);

  const { meals, currentMeal, asyncMealActions } = mealsContext;
  const { isAuthenticated, loggedInUser } = authContxt;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavouritesPage] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      asyncMealActions.loadAllMeals();
    } else {
      navigate('/login');
    }
    //eslint-disable-next-line
  }, [isAuthenticated, meals]);
  return (
    <div className="home">
      <div className="product_container">
        {meals &&
          meals.map((el) => (
            <Product
              meal={el}
              key={el._id}
              setIsModal={setIsModal}
              isFavouritesPage={isFavouritesPage}
            />
          ))}
      </div>
      <RightSidebar loggedInUser={loggedInUser} />
    </div>
  );
};
export default Home;
