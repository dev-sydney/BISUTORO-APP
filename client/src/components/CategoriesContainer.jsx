import React, { useContext, useEffect } from 'react';
import Category from './Category';

import mealContext from '../contexts/ProductContext';
import './../styles/containerStyle.scss';

const CategoriesContainer = () => {
  const mealContxt = useContext(mealContext);
  const { asyncMealActions, categories } = mealContxt;
  useEffect(() => {
    asyncMealActions.loadCategories();
  }, [categories]);
  return (
    <div>
      {!categories || categories.length === 0 ? (
        <p>No categories yet</p>
      ) : (
        categories.map((el, i) => <Category key={i} category={el} />)
      )}
    </div>
  );
};

export default CategoriesContainer;
