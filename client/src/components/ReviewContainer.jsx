import React, { useState } from 'react';
import Review from './Review';

import './../styles/reviewStyle.scss';

const ReviewContainer = ({ setReviewBlock }) => {
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
    console.log(e.target.dataset.rating);
    console.log(e.target.dataset.name);
    setReviewData({
      ...reviewData,
      rating: e.target.dataset.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(reviewData);
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
      <Review />
      <Review />
      <Review />
      <Review />
      <form onSubmit={onSubmit}>
        <div>
          {ratings.map((el, i) => (
            <span
              key={i}
              data-name="rating"
              onClick={onRatingsClick}
              data-rating={el}
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
