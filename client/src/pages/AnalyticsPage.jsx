import React, { useContext, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import ProductContext from './../contexts/ProductContext';

import './../styles/analyticsStyle.scss';

//NOTE: DOWNLOAD THE PDF PACKAGE
const AnalyticsPage = () => {
  const productContxt = useContext(ProductContext);

  const onDownloadBtnClick = () => {
    const pdf = new jsPDF();
  };

  useEffect(() => {
    productContxt.getTopFiveMeals();
    //eslint-disable-next-line
  }, []);
  return (
    <div className="analytics_container">
      <h1 style={{ textAlign: 'left', padding: 0 }}>Highest Rated Meals</h1>
      {productContxt.topFiveMeals &&
        (productContxt.topFiveMeals.length === 0 ? (
          <p>No results yet</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Meal</th>
                <th>ratings</th>
              </tr>
            </thead>

            <tbody>
              {productContxt.topFiveMeals.map((meal, i) => (
                <tr key={meal._id}>
                  <td>{i + 1}</td>
                  <td>
                    <div
                      style={{
                        maxWidth: 'fit-content',
                        margin: 'none',
                      }}
                      className="photo__name"
                    >
                      <img
                        src={`/img/meals/${meal.image}`}
                        alt="meal"
                        // className="form__user-photo"
                        style={{
                          minHeight: '4em',
                          maxHeight: '4em',
                          maxWidth: '5em',
                          minWidth: '5em',
                        }}
                      />
                      <p
                        style={{ marginTop: 'auto', marginBottom: 'auto' }}
                      >{`${meal.name}`}</p>
                    </div>
                  </td>

                  <td>{meal.ratingsAverage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ))}
    </div>
  );
};

export default AnalyticsPage;
