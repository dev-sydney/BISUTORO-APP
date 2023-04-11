import React from 'react';
import TableItem from './TableItem';

import './../styles/tableStyle.scss';
const TableItemContainer = ({
  tables,
  setSelectedTable,
  setTableReservationModalActive,
}) => {
  return (
    <div>
      {tables &&
        (tables.length > 0
          ? tables.map((table) => (
              <TableItem
                key={table._id}
                table={table}
                setSelectedTable={setSelectedTable}
                setTableReservationModalActive={setTableReservationModalActive}
              />
            ))
          : 'No tables available at this moment')}
    </div>
  );
};

export default TableItemContainer;
