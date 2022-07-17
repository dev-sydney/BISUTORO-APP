import React from 'react';

const Category = ({ category }) => {
  return (
    <div>
      <h2>{category.categoryName}</h2>
      <p>{category.results} meals</p>
    </div>
  );
};

export default Category;
