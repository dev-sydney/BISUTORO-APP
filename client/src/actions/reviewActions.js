import axios from 'axios';
import * as Type from './../contexts/types';
// import { asyncActions } from '../Utilss';
import { config } from '../Utilss';

class ReviewActions {
  constructor(dispatch) {
    this.dispatch = dispatch;
  }
  successDispatcher(res, type, payload) {
    if (res.data.status === 'success') {
      this.dispatch({
        type,
        payload,
      });
    }
  }
  loadReviewsOnMeal = async (mealID) => {
    try {
      //   console.log(mealID);
      const res = await axios.get(`/api/v1/reviews/?meal=${mealID}`, config);
      //   console.log(res);
      this.successDispatcher(res, Type.LOAD_REVIEWS, res.data.reviews);
    } catch (err) {
      //   console.error(err);
      this.dispatch({
        type: Type.LOAD_REVIEWS_ERROR,
        payload: err.response.data.message,
      });
    }
  };
}

export default ReviewActions;
