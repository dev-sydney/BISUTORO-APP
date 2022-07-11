import React from 'react';

import './../../styles/navstyle.scss';

const Navbar = () => {
  return (
    <div className="navblock">
      <input className="search_field" type="text" placeholder="🔍Search" />
      <span className="filter_btn">Filter</span>
      <h1>Today's options</h1>

      <div className="results_sort">
        Sort by v
        <ol>
          <li>Price</li>
          <li>ratings</li>
        </ol>
      </div>
    </div>
  );
};
export default Navbar;
