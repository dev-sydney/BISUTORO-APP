import { createContext, useReducer } from 'react';
import axios from 'axios';

import { config } from './AuthContext';
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
    alertMsg: null,
  };
  const [state, dispatch] = useReducer(ProductReducer, initialState);

  /**
   * function that dispatches a newly created meal Obj to the state
   * @param {Object} meal object gotten from the form
   */
  const addMeal = async (mealData) => {
    const numericFields = [
      'price',
      'ratingsAverage',
      'ratingsQuantity',
      'serving',
    ];
    try {
      const form = new FormData();

      Object.keys(mealData).forEach((el) => {
        form.append(
          `${el}`,
          numericFields.includes(el) ? +mealData[el] : mealData[el]
        );
      });
      // for (let key of form.entries()) {
      //   console.log(key);
      // }
      const res = await axios.post('/api/v1/meals/', form, {
        headers: {
          'Content-type': 'application/json',
        },
      });

      if (res.data.status === 'success') {
        dispatch({
          type: Type.ADD_MEAL,
          payload: res.data.successMsg,
        });
      }
    } catch (err) {
      dispatch({
        type: Type.ADD_MEAL_ERROR,
        payload: err.response.data.message,
      });
    }
  };
  /**
   *
   * @param {*} mealID ID property of the meal we want to delete
   */

  const deleteMeal = async (mealID) => {
    try {
      await axios.delete(`/api/v1/meals/${mealID}`, config);
      dispatch({
        type: Type.DELETE_MEAL,
        alertMsg: 'Meal deleted successfully',
      });
    } catch (err) {
      dispatch({
        type: Type.DELETE_MEAL_ERROR,
        alertMsg: 'Trouble deleting meal, please try again!',
      });
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
  const AddMealToFavorites = async (mealID) => {
    try {
      await axios.patch(`/api/v1/meals/favourite-meals/${mealID}`, config);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };
  const ActivateDeactivateMeal = async (meal) => {
    try {
      const res = await axios.patch(
        `/api/v1/meals/${meal._id}`,
        { isActive: !meal.isActive },
        config
      );
      dispatch({
        type: Type.UPDATE_DATA_SUCCESS,
        payload: 'Updated was successful!',
      });
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
        alertMsg: state.alertMsg,
        addMeal,
        deleteMeal,
        setCurrentMeal,
        addToOrder,
        removeFromOrders,
        loadAllMeals,
        loadFavoriteMeals,
        AddMealToFavorites,
        ActivateDeactivateMeal,
      }}
    >
      {children}
    </mealContext.Provider>
  );
};

export default mealContext;
