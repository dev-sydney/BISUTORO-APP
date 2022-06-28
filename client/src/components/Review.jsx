import React from 'react';

import './../styles/reviewStyle.scss';
const Review = ({ review }) => {
  let i;
  return (
    <div className="review">
      <div className="profile">
        <p>PP</p>
      </div>

      <div className="details">
        {[1, 2, 3, 4, 5].forEach((el, i) => {
          if (review.rating < el) return <span key={i}>⭐</span>;
        })}
        <span key={i}>⭐</span>
        <p>{review.review}</p>
        <p>27 sept 2022</p>
      </div>
    </div>
  );
};

export default Review;
