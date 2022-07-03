import React from 'react';

import './../styles/reviewStyle.scss';
const Review = ({ review }) => {
  const ratings = [1, 2, 3, 4, 5];
  return (
    <div className="review">
      <div className="profile">
        <p>PP</p>
      </div>

      <div className="details">
        {ratings.map((el, i) => {
          if (review.rating >= el) return <span key={i}>⭐</span>;
        })}

        <p>{review.review}</p>
        <p>
          {new Date(review.createAt).toLocaleString('en-us', {
            month: 'long',
            year: 'numeric',
            day: '2-digit',
          })}
        </p>
      </div>
    </div>
  );
};

export default Review;
