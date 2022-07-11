import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ProductContext from '../../contexts/ProductContext';
import AuthContext from '../../contexts/AuthContext';

import Product from '../Product';
import Modal from '../Modal';
import Navbar from './Navbar';
import RightSidebar from './RightSideBar';
import Alert from '../Alert';

import './../../styles/sideBarStyle.scss';
import './../../styles/containerStyle.scss';

const Home = () => {
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
    <div className="flex_container">
      <Alert />
      {isModalOpen && (
        <Modal setIsModalOpen={setIsModalOpen} currentMeal={currentMeal} />
      )}

      <div>
        <Navbar />
        <div className="product_container">
          {meals &&
            meals.map((el) => (
              <Product
                meal={el}
                key={el._id}
                setIsModalOpen={setIsModalOpen}
                isFavouritesPage={isFavouritesPage}
              />
            ))}
        </div>
      </div>
      <RightSidebar loggedInUser={loggedInUser} />
    </div>
  );
};
export default Home;
