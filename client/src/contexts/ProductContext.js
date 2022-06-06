import { createContext, useReducer } from 'react';
import axios from 'axios';
import * as Type from './types';
import ProductReducer from './../reducers/ProductReducer';

const mealContext = createContext();

export const MealContextProvider = ({ children }) => {
  const initialState = {
    meals: null,
    currentMeal: null,
    orders: [],
    loadingMeals: true,
    favourites: [],
  };
  const [state, dispatch] = useReducer(ProductReducer, initialState);
  /**
   * function that dispatches a newly created meal Obj to the state
   * @param {Object} meal object gotten from the form
   */
  const addMeal = (meal) => {
    dispatch({
      type: Type.ADD_MEAL,
      payload: meal,
    });
    // console.log(state);
  };
  /**
   *
   * @param {*} mealID ID property of the meal we want to delete
   */
  const deleteMeal = (mealID) => {
    dispatch({
      type: Type.DELETE_MEAL,
      payload: mealID,
    });
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
    console.log(meal);
    dispatch({
      type: Type.ADD_TO_ORDER,
      payload: meal,
    });

    console.log(state);
  };
  const removeFromOrders = (mealID) => {
    dispatch({
      type: Type.REMOVE_FROM_ORDERS,
      payload: mealID,
    });
  };

  const loadAllMeals = async () => {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    try {
      const res = await axios.get('/api/v1/meals/', config);

      if (res.data.status === 'success') {
        dispatch({
          type: Type.LOAD_ALL_MEALS,
          payload: res.data.data.meals,
        });
      }
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  const loadFavoriteMeals = async () => {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    try {
      const res = await axios.get('/api/v1/meals/favourite-meals', config);
      if (res.data.status === 'success') {
        dispatch({
          type: Type.LOAD_FAVOURITES,
          payload: res.data.data,
        });
      }
    } catch (err) {
      console.log(err.response.data.message);
    }
  };
  return (
    <mealContext.Provider
      value={{
        meals: state.meals,
        currentMeal: state.currentMeal,
        orders: state.orders,
        loadingMeals: state.loadingMeals,
        favourites: state.favourites,
        addMeal,
        deleteMeal,
        setCurrentMeal,
        addToOrder,
        removeFromOrders,
        loadAllMeals,
        loadFavoriteMeals,
      }}
    >
      {children}
    </mealContext.Provider>
  );
};

export default mealContext;
