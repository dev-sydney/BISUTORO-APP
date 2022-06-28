import React, { useState, useContext } from 'react';
import Review from './Review';

import productContext from './../contexts/ProductContext';

import './../styles/reviewStyle.scss';

const ReviewContainer = ({ setReviewBlock }) => {
  const mealsContext = useContext(productContext);
  const { reviews } = mealsContext;

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

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(reviewData);
  };

  return (
    <div className="review_container">
      <button
        onClick={() => {
          setReviewBlock(!reviewBlock);
        }}
      >
        ❌
      </button>
      {reviews.length === 0
        ? 'No reviews yet'
        : reviews.map((el) => <Review key={el._id} review={el} />)}

      <form onSubmit={onSubmit}>
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
        <input type="submit" value="Done" />
      </form>
    </div>
  );
};

export default ReviewContainer;
