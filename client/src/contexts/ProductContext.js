import { createContext, useReducer } from 'react';

import * as Type from './types';
import ProductReducer from './../reducers/ProductReducer';
import ProductActions from '../actions/productActions';
import ReviewActions from '../actions/reviewActions';

const mealContext = createContext();

export const MealContextProvider = ({ children }) => {
  const initialState = {
    meals: null,
    currentMeal: null,
    orders: [],
    loadingMeals: true,
    favourites: [],
    alertMsg: null,
    reviews: [],
  };
  const [state, dispatch] = useReducer(ProductReducer, initialState);

  const asyncMealActions = new ProductActions(dispatch);
  const aysncReviewActions = new ReviewActions(dispatch);

  /**
   * Sets the selected meal as the currentMeal obj in the state
   * @param {Object} meal The selected meal
   */
  const setCurrentMeal = (meal) => {
    dispatch({
      type: Type.SET_CURRENT,
      payload: meal,
    });
  };
  /**
   * Adds a Meal to orders array
   * @param {Object} meal
   */
  const addToOrder = (meal) => {
    console.log(meal);
    dispatch({
      type: Type.ADD_TO_ORDER,
      payload: meal,
    });
  };
  const removeFromOrders = (mealID) => {
    dispatch({
      type: Type.REMOVE_FROM_ORDERS,
      payload: mealID,
    });
  };

  return (
    <mealContext.Provider
      value={{
        meals: state.meals,
        currentMeal: state.currentMeal,
        orders: state.orders,
        loadingMeals: state.loadingMeals,
        favourites: state.favourites,
        alertMsg: state.alertMsg,
        reviews: state.reviews,
        setCurrentMeal,
        addToOrder,
        removeFromOrders,
        asyncMealActions,
        aysncReviewActions,
      }}
    >
      {children}
    </mealContext.Provider>
  );
};

export default mealContext;
