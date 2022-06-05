import React, { useContext, useEffect, useState } from 'react';
import ProductContext from '../../contexts/ProductContext';

import Product from '../Product';
import Modal from '../Modal';
import Navbar from './Navbar';
import RightSidebar from './RightSideBar';
import Alert from '../Alert';

import './../../styles/sideBarStyle.scss';
import './../../styles/containerStyle.scss';
const Home = () => {
  const mealsContext = useContext(ProductContext);

  const { meals, currentMeal, loadAllMeals } = mealsContext;

  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    loadAllMeals();
  }, [meals]);
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
      <RightSidebar />
    </div>
  );
};
export default Home;
