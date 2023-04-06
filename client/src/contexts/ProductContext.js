import { createContext, useReducer } from 'react';
import { config, CartItem, AppAlert } from '../Utilss';
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
    cart: null,
    topFiveMeals: null,
  };
  const [state, dispatch] = useReducer(ProductReducer, initialState);

  const asyncMealActions = new ProductActions(dispatch);
  const aysncReviewActions = new ReviewActions(dispatch);

  const clearContextAlerts = (secs = 3000) => {
    setTimeout(() => {
      dispatch({
        type: Type.REMOVE_ALERT,
      });
    }, secs);
  };
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

  const addToCart = (selectedMeal) => {
    dispatch({
      type: Type.ADD_TO_CART,
      payload: new CartItem(selectedMeal),
      alert: new AppAlert('Added to cart', 'success'),
    });
    clearContextAlerts();
  };

  const clearCart = () => {
    dispatch({
      type: Type.CLEAR_CART,
    });
  };

  const loadFavorites = async () => {
    try {
      dispatch({
        type: Type.MEALS_LOADING,
      });
      const res = await axios.get(`/api/v1/meals/favourite-meals`, config);
      // console.log(res);
      if (res.status === 200) {
        dispatch({
          type: Type.LOAD_FAVOURITES,
          payload: res.data.data,
        });
      }
    } catch (err) {}
  };

  const checkout = async (cartItems, navigateTo) => {
    try {
      let url = `/api/v1/orders/checkout-session`;
      const res = await axios.post(url, { cartItems }, config);

      // navigateTo(.url);
      window.location = res.data.session.url;
      // console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const addNewMeal = async (formData) => {
    try {
      const res = await axios.post('/api/v1/meals/', formData, config);

      if (res.status === 200) {
        dispatch({
          type: Type.ADD_MEAL,
          payload: new AppAlert(res.data.successMsg, 'success'),
        });
      }

      clearContextAlerts();
    } catch (err) {
      dispatch({
        type: Type.ADD_MEAL_ERROR,
        payload: new AppAlert(err.response.data.message, 'success'),
      });
      clearContextAlerts();
    }
  };

  const getTopFiveMeals = async () => {
    try {
      dispatch({
        type: Type.MEALS_LOADING,
      });
      const res = await axios.get(`/api/v1/meals/top-5-meals`, config);

      if (res.status === 200) {
        dispatch({
          type: Type.SET_TOP_FIVE,
          payload: res.data.data.meals,
        });
      }
    } catch (err) {
      console.log(err);
    }
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
        cart: state.cart,
        topFiveMeals: state.topFiveMeals,
        loadAllMeals,
        removeAlerts,
        removeFromOrders,
        asyncMealActions,
        aysncReviewActions,
        setModalOpen,
        loadSelectedMeal,
        addToCart,
        clearCart,
        loadFavorites,
        checkout,
        addNewMeal,
        getTopFiveMeals,
      }}
    >
      {children}
    </mealContext.Provider>
  );
};

export default mealContext;
