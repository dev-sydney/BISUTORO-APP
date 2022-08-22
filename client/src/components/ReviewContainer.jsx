import React, { useState, useContext, useEffect } from 'react';
import Review from './Review';

import productContext from './../contexts/ProductContext';

import './../styles/reviewStyle.scss';

const ReviewContainer = ({ setReviewBlock }) => {
  const mealsContext = useContext(productContext);
  const { reviews, aysncReviewActions, currentMeal, reiviewChange } =
    mealsContext;
  useEffect(() => {
    aysncReviewActions.loadReviewsOnMeal(currentMeal._id);
    // console.log('Loading reviews');
  }, [reiviewChange]);
  const ratings = [1, 2, 3, 4, 5];

  const [reviewBlock] = useState(true);
  const [reviewData, setReviewData] = useState({
    review: '',
    rating: 0,
  });

  const { review } = reviewData;

  const onTextareaChange = (e) => {
    setReviewData({ ...reviewData, [e.target.name]: e.target.value });
  };

  const onRatingsClick = (e) => {
    let fieldRating = e.target.dataset.rating;
    let fieldName = e.target.dataset.name;
    // console.log(fieldRating);
    setReviewData({
      ...reviewData,
      [fieldName]: +fieldRating,
    });
    // console.log(reviewData);
  };

  const onSubmitReview = (e) => {
    e.preventDefault();
    // console.log(reviewData);
    aysncReviewActions.postReview(currentMeal._id, reviewData);
    setReviewData({ review: '', rating: 0 });
  };

  return (
    <div className="review_container">
      <div
        style={{
          textAlign: 'left',
          width: '100%',
          paddingLeft: '2em',
          cursor: 'pointer',
        }}
      >
        <span
          className="material-symbols-rounded"
          onClick={() => {
            setReviewBlock(!reviewBlock);
          }}
        >
          arrow_back
        </span>
      </div>
      <div className="reviews_section">
        {!reviews
          ? 'No reviews yet'
          : reviews.map((el) => <Review key={el._id} review={el} />)}
      </div>
      <hr />
      <form onSubmit={onSubmitReview}>
        <div>
          {ratings.map((el, i) => (
            <span
              key={i}
              data-name="rating"
              onClick={onRatingsClick}
              data-rating={el}
              className="star"
            >
              ⭐
            </span>
          ))}
        </div>
        <textarea
          placeholder="Tell us how you feel"
          name="review"
          value={review}
          onChange={onTextareaChange}
        ></textarea>
        <input type="submit" className="review-submit" />
      </form>
    </div>
  );
};

export default ReviewContainer;
