import React from 'react';
import './../styles/skeletonStyle.scss';
import './../styles/productStyle.scss';
const SkeletonProduct = () => {
  return (
    <div className="product card">
      <h2></h2>
      <div className="image"></div>
      <p></p>
      <h2></h2>
    </div>
  );
};

export default SkeletonProduct;
