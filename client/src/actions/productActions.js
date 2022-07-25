import axios from 'axios';
import * as Type from './../contexts/types';
import { asyncActions } from '../Utilss';
import { config } from '../Utilss';
import { instance } from '../Utilss';
class ProductActions {
  constructor(dispatch) {
    this.dispatch = dispatch;
  }
  successDispatcher = (res, type, payload) => {
    if (res.data.status === 'success') {
      this.dispatch({
        type,
        payload,
      });
    }
  };
  /**
   * Makes a request to the API to create a new meal
   * @param {*} mealData The data gotten from the input form (MealForm.jsx)
   */
  addMeal = async (mealData) => {
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
      const res = await axios.post('/api/v1/meals/', form, config);

      this.successDispatcher(res, Type.ADD_MEAL, 'Meal added!');
    } catch (err) {
      this.dispatch({
        type: Type.ADD_MEAL_ERROR,
        payload: err.response.data.message,
      });
    }
  };
  /**
   * Makes a request to the API to add a meal(using the meal's ._id) to the users favourites
   * @param {*} mealID The ._id property of the meal
   */
  AddMealToFavorites = async (mealID) => {
    try {
      const res = await axios.patch(
        `/api/v1/users/favourite-meals/${mealID}`,
        config
      );
      this.successDispatcher(
        res,
        Type.ADD_TO_FAVOURITES,
        'Meal Added To favourites.'
      );
    } catch (err) {
      this.dispatch({
        type: Type.ADD_TO_FAVOURITES_ERROR,
        payload: err.response.data.message,
      });
    }
  };
  /**
   * Updates the meal's isActive status to either true or false
   * @param {*} meal
   */
  ActivateDeactivateMeal = async (meal) => {
    // console.log(meal);
    try {
      const res = await axios.patch(
        `/api/v1/meals/${meal._id}`,
        { isOnSale: !meal.isOnSale },
        config
      );
      this.successDispatcher(
        res,
        Type.UPDATE_DATA_SUCCESS,
        'Update successful!'
      );
    } catch (err) {
      console.log(err);
      this.dispatch({
        type: Type.UPDATE_DATA_FAIL,
        payload: err.response.data.message,
      });
    }
  };
  loadFavoriteMeals = asyncActions(
    async () => {
      const res = await axios.get('/api/v1/meals/favourite-meals', config);
      this.successDispatcher(res, Type.LOAD_FAVOURITES, res.data.data);
    },
    Type.LOAD_FAVOURITES_ERROR,
    this.dispatch
  );

  /*  loadAllMeals = asyncActions(
    async () => {
      // const res = await axios.get('/api/v1/meals/', config);
      const res = await instance.get('/api/v1/meals');
      this.successDispatcher(res, Type.LOAD_ALL_MEALS, res.data.data.meals);
    },
    Type.LOAD_ALL_MEALS_ERROR,
    this.dispatch
    ); */
  loadAllMeals = async (navigate) => {
    try {
      const res = await instance.get('/api/v1/meals');
      if (res.status === 200) {
        this.dispatch({
          type: Type.LOAD_ALL_MEALS,
          payload: res.data.data.meals,
        });
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 403) {
        this.dispatch({
          type: Type.NOT_AUTHENTICATED,
          payload: err.response.data.message,
        });
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      }
    }
  };

  deleteMeal = async (mealID) => {
    try {
      const res = await axios.delete(`/api/v1/meals/${mealID}`, config);
      this.successDispatcher(
        res,
        Type.DELETE_MEAL,
        'Meal deleted successfully'
      );
    } catch (err) {
      this.dispatch({
        type: Type.DELETE_MEAL_ERROR,
        payload: 'Trouble deleting meal, please try again!',
      });
    }
  };
}

export default ProductActions;
