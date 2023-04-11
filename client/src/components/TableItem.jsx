import React from 'react';
import { UilUserCircle } from '@iconscout/react-unicons';
import './../styles/tableStyle.scss';

const TableItem = ({
  table,
  setSelectedTable,
  setTableReservationModalActive,
}) => {
  return (
    <div className="table_item" style={{ margin: '0.5em 0' }}>
      <img
        className="table_image"
        src={`/img/tables/${table.photo}`}
        alt="table"
      />
      <h3>{table.name}</h3>

      <div className="price_seating">
        <div>
          <p style={{ marginRight: 'auto' }}>$ {table.price}</p>
          <p style={{ marginLeft: 'auto' }}>
            <UilUserCircle size="1.5em" />2
            {table.seating === 2 ? '' : `- ${table.seating}`}
          </p>
        </div>
        <button
          className="book_btn"
          onClick={() => {
            setSelectedTable(table);
            setTableReservationModalActive(true);
          }}
        >
          book
        </button>
      </div>
    </div>
  );
};

export default TableItem;
