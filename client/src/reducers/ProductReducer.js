import * as Type from './../contexts/types';

const mealReducer = (state, action) => {
  switch (action.type) {
    case Type.SET_MODAL:
      return {
        ...state,
        isModalOpen: !state.isModalOpen,
      };
    case Type.POST_REVIEW:
      return {
        ...state,
        reviews: [...state.reviews, action.payload],
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
        loadingMeals: false,
      };
    case Type.ADD_MEAL:
      return {
        ...state,
        alertMsg: action.payload,
        alertMsgType: true,
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
        currentMeal: { ...action.payload },
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
        alertMsgType: false,
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
