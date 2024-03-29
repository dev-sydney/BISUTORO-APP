import * as Type from './../contexts/types';

const mealReducer = (state, action) => {
  switch (action.type) {
    case Type.LOAD_TABLES:
      return {
        ...state,
        tables: action.payload,
        isTablesLoading: null,
      };
    case Type.ADD_TABLE:
      return {
        ...state,
        alertMsg: action.payload,
        isTablesLoading: null,
      };
    case Type.TABLES_LOADING:
      return {
        ...state,
        isTablesLoading: true,
      };
    case Type.SET_TOP_FIVE:
      return {
        ...state,
        topFiveMeals: action.payload,
        isMealsLoading: null,
      };
    case Type.CLEAR_CART:
      return {
        ...state,
        cart: null,
      };
    case Type.ADD_TO_CART:
      return {
        ...state,
        // cart: [action.payload, ...state.cart],
        cart: !state.cart ? [action.payload] : [action.payload, ...state.cart],
        alertMsg: action.alert,
      };
    case Type.MEALS_LOADING:
      return {
        ...state,
        isMealsLoading: true,
      };
    case Type.SET_MODAL:
      return {
        ...state,
        isModalOpen: !state.isModalOpen,
      };
    case Type.POST_REVIEW:
      return {
        ...state,
        reviews: [...state.reviews, action.payload],
        reiviewChange: state.reiviewChange + 1,
      };
    case Type.LOAD_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };
    case Type.UPDATE_DATA_SUCCESS:
      return {
        ...state,
        alertMsg: action.payload,
      };
    case Type.LOAD_ALL_MEALS:
      return {
        ...state,
        meals: action.payload,
        isMealsLoading: null,
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
        alertMsgType: true,
      };
    case Type.SET_CURRENT:
      return {
        ...state,
        currentMeal: action.payload,
        isMealsLoading: null,
      };
    case Type.ADD_TO_ORDER:
      return {
        ...state,
        orders: [action.payload, ...state.orders],
      };
    case Type.ADD_TO_FAVOURITES:
      return {
        ...state,
        alertMsg: action.payload,
        alertMsgType: true,
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
        isMealsLoading: null,
      };
    //TODO: ALERTS
    case Type.UPDATE_DATA_FAIL:
      return {
        ...state,
        alertMsg: action.payload,
        alertMsgType: false,
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
        alertMsgType: false,
      };
    case Type.ADD_TO_FAVOURITES_ERROR:
      return {
        ...state,
        alertMsg: action.payload,
        alertMsgType: false,
      };
    case Type.DELETE_MEAL_ERROR:
      return {
        ...state,
        alertMsg: action.payload,
      };
    case Type.LOAD_REVIEWS_ERROR:
      return {
        ...state,
        alertMsg: action.payload,
        alertMsgType: false,
      };
    case Type.POST_REVIEW_ERROR:
      return {
        ...state,
        alertMsg: action.payload,
        alertMsgType: false,
      };
    case Type.REMOVE_ALERT:
      return {
        ...state,
        alertMsg: null,
      };
    default:
      return state;
  }
};

export default mealReducer;
