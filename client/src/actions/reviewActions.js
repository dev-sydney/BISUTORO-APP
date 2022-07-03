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
  postReview = async (mealID, reviewData) => {
    try {
      const res = await axios.post(
        `/api/v1/reviews/${mealID}`,
        reviewData,
        config
      );
      this.successDispatcher(res, Type.POST_REVIEW, res.data.review);
    } catch (err) {
      this.dispatch({
        type: Type.POST_REVIEW_ERROR,
        payload: 'Trouble posting this review, please try again',
      });
    }
  };
}

export default ReviewActions;
