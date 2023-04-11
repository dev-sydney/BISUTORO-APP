import React, { useEffect, useContext, useState } from 'react';
import TableItemContainer from '../components/TableItemContainer';
import ProductContext from './../contexts/ProductContext';
import ModalBackground from '../components/ModalBackground';
import DialogBox from './../components/DialogBox';

const TableReservationsPage = () => {
  const productContxt = useContext(ProductContext);
  const [isTableReservationModalActive, setTableReservationModalActive] =
    useState(false);
  const dialogMessage = 'Are you sure want to reserve this table?';
  const [selectedTable, setSelectedTable] = useState({});

  useEffect(() => {
    productContxt.loadAllTables();
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      {isTableReservationModalActive ? (
        <ModalBackground
          children={
            <DialogBox
              dialogMessage={dialogMessage}
              onCancelClickFn={setTableReservationModalActive}
              onProceedClickFn={productContxt.makeTableReservation}
              args={selectedTable}
            />
          }
        />
      ) : (
        ''
      )}
      <h1 style={{ textAlign: 'left', fontSize: '2.5em', padding: '0' }}>
        Table Reservations
      </h1>
      {productContxt.isTablesLoading ? (
        'loading'
      ) : (
        <TableItemContainer
          tables={productContxt.tables}
          setSelectedTable={setSelectedTable}
          setTableReservationModalActive={setTableReservationModalActive}
        />
      )}
    </div>
  );
};

export default TableReservationsPage;
