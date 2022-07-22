import React, { Fragment, useContext, useState, useEffect } from 'react';

import ProductContext from '../contexts/ProductContext';

import Product from './Product';
import SkeletonProduct from './SkeletonProduct';

import './../styles/containerStyle.scss';

const ProductsControl = () => {
  const mealsContext = useContext(ProductContext);

  const { meals, asyncMealActions } = mealsContext;

  useEffect(() => {
    asyncMealActions.loadAllMeals();

    //eslint-disable-next-line
  }, [meals]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavouritesPage] = useState(false);

  return (
    <Fragment>
      <div className="product_container">
        {meals &&
          (meals.length === 0 ? (
            <h2>No meals available at the moment</h2>
          ) : (
            meals.map((el) => (
              <Product
                meal={el}
                key={el._id}
                setIsModalOpen={setIsModalOpen}
                isModalOpen={isModalOpen}
                isFavouritesPage={isFavouritesPage}
              />
            ))
          ))}
        {!meals &&
          [1, 2, 3, , 4, 5, 6].map((el) => <SkeletonProduct key={el} />)}
      </div>
    </Fragment>
  );
};
export default ProductsControl;
// {meals &&
//   }

// {!meals
//   ? [1, 2, 3, 4, 5, 6].map((el) => <SkeletonProduct key={el} />)
//   : meals.map((el) => (
//       <Product
//         meal={el}
//         key={el._id}
//         setIsModalOpen={setIsModalOpen}
//         isModalOpen={isModalOpen}
//         isFavouritesPage={isFavouritesPage}
//       />
//     ))}
