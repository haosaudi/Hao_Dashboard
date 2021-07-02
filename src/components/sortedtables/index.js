import React from "react";
// import { MDBDataTable } from 'mdbreact';
import { MDBDataTable } from "mdbreact";

const DatatablePage = ({ dataArray, columns }) => {
  const data = {
    columns: columns,

    rows: dataArray,
  };

  return (
    <>
      <MDBDataTable
        // striped
        bordered
        small
        data={data}
      />
      {
        //     <MDBTable responsiveSm>
        //     <MDBTableHead columns={data.columns} />
        //     <MDBTableBody rows={data.rows} />
        // </MDBTable>}
      }
    </>
  );
};

export default DatatablePage;
