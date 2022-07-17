import React from 'react';

/* import './../../styles/navstyle.scss';
 */
const Navbar = () => {
  return (
    <div className="navblock">
      <input className="search_field" type="text" placeholder="🔍Search" />
      <hr />
      <div className="info">
        <div className="prompts">
          <h2>Today's options</h2>
          <p>Here's a collection of today's meals</p>
        </div>
        <div className="controls">
          <span className="filter_btn">Filter</span>
          <span className="compare">Compare meals</span>
          <span className="dots">•••</span>
        </div>
      </div>
      <div className="results_sort">
        <label>Sort by: </label>
        <select>
          <option>Price</option>
          <option>Ratings</option>
        </select>
      </div>
    </div>
  );
};
export default Navbar;
