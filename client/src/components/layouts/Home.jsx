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

  const { meals, currentMeal, loadAllMeals } = mealsContext;
  const { isAuthenticated, loggedInUser } = authContxt;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      loadAllMeals();
    } else {
      navigate('/login');
    }
  }, [isAuthenticated, meals]);
  return (
    <div className="flex_container">
      {isModalOpen && (
        <Modal setIsModalOpen={setIsModalOpen} currentMeal={currentMeal} />
      )}

      <div>
        <Navbar />
        <div className="product_container">
          {meals &&
            meals.map((el) => (
              <Product meal={el} key={el._id} setIsModalOpen={setIsModalOpen} />
            ))}
        </div>
      </div>
      <RightSidebar loggedInUser={loggedInUser} />
    </div>
  );
};
export default Home;
