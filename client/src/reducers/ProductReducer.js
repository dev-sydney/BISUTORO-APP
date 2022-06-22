import * as Type from './../contexts/types';

const mealReducer = (state, action) => {
  switch (action.type) {
    case Type.UPDATE_DATA_SUCCESS:
      return {
        ...state,
        alertMsg: action.payload,
      };
    case Type.LOAD_ALL_MEALS:
      return {
        ...state,
        meals: action.payload,
        loadingMeals: false,
      };
    case Type.ADD_MEAL:
      return {
        ...state,
        alertMsg: action.payload,
      };
    case Type.DELETE_MEAL:
      return {
        ...state,
        meals: [...state.meals].filter((el) => el._id !== action.payload),
        alertMsg: action.payload,
      };
    case Type.SET_CURRENT:
      return {
        ...state,
        currentMeal: { ...action.payload },
      };
    case Type.ADD_TO_ORDER:
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };
    case Type.ADD_TO_FAVOURITES:
      return {
        ...state,
        alertMsg: action.payload,
      };
    case Type.REMOVE_FROM_ORDERS:
      return {
        ...state,
        orders: [...state.orders].filter((el) => el._id !== action.payload),
      };
    case Type.LOAD_FAVOURITES:
      return {
        ...state,
        favourites: action.payload,
      };
    //TODO: ALERTS
    case Type.UPDATE_DATA_FAIL:
      return {
        ...state,
        alertMsg: action.payload,
      };
    case Type.ADD_MEAL_ERROR:
      return {
        ...state,
        alertMsg: action.payload,
      };
    case Type.LOAD_ALL_MEALS_ERROR:
      return {
        ...state,
        alertMsg: action.payload,
      };
    case Type.LOAD_FAVOURITES_ERROR:
      return {
        ...state,
        alertMsg: action.payload,
      };
    case Type.ADD_TO_FAVOURITES_ERROR:
      return {
        ...state,
        alertMsg: action.payload,
      };
    case Type.DELETE_MEAL_ERROR:
      return {
        ...state,
        alertMsg: action.payload,
      };
    default:
      return state;
  }
};

export default mealReducer;
