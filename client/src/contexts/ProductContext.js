import { createContext, useReducer } from 'react';
import { config } from '../Utilss';
import axios from 'axios';
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
    isMealsLoading: null,
    favourites: null,
    alertMsg: null,
    alertMsgType: null,
    reviews: null,
    isModalOpen: false,
    reiviewChange: 0,
  };
  const [state, dispatch] = useReducer(ProductReducer, initialState);

  const asyncMealActions = new ProductActions(dispatch);
  const aysncReviewActions = new ReviewActions(dispatch);

  const loadAllMeals = async () => {
    try {
      dispatch({
        type: Type.MEALS_LOADING,
      });
      const res = await axios.get('/api/v1/meals/', config);
      if (res.status === 200) {
        dispatch({
          type: Type.LOAD_ALL_MEALS,
          payload: res.data.data.meals,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const loadSelectedMeal = async (mealId) => {
    try {
      dispatch({
        type: Type.MEALS_LOADING,
      });

      const res = await axios.get(`/api/v1/meals/${mealId}`, config);
      if (res.status === 200) {
        dispatch({
          type: Type.SET_CURRENT,
          payload: res.data.data.meal,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
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
    // console.log(meal);
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
  const removeAlerts = () => {
    dispatch({
      type: Type.REMOVE_ALERT,
    });
  };
  const setModalOpen = () => {
    dispatch({
      type: Type.SET_MODAL,
    });
  };

  return (
    <mealContext.Provider
      value={{
        meals: state.meals,
        currentMeal: state.currentMeal,
        orders: state.orders,
        isMealsLoading: state.isMealsLoading,
        favourites: state.favourites,
        alertMsg: state.alertMsg,
        alertMsgType: state.alertMsgType,
        reviews: state.reviews,
        isModalOpen: state.isModalOpen,
        reiviewChange: state.reiviewChange,
        loadAllMeals,
        setCurrentMeal,
        addToOrder,
        removeAlerts,
        removeFromOrders,
        asyncMealActions,
        aysncReviewActions,
        setModalOpen,
        loadSelectedMeal,
      }}
    >
      {children}
    </mealContext.Provider>
  );
};

export default mealContext;
