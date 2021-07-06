import PropTypes from "prop-types";
import React, { useEffect, useState, createRef } from "react";
import classNames from "classnames";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { DocsLink } from "src/reusable";
import {
  CategoryAction,
  BookingAction,
  UserAction,
  ExperienceAvailibilityAction,
} from "src/redux-store/actions";
import { connect } from "react-redux";
import swal from "sweetalert";
import Sortedtable from "../../components/sortedtables";
import moment from "moment";

const Category = (props) => {
  const [catBooking, setCategories] = useState([]);
  const [state, setState] = useState({
    refunds: [],
    loader: false,
  });

  useEffect(() => {
    if (props.token) {
      props.GetAllRefundsBookings(props.token);
    }
  }, []);
  useEffect(() => {
    _setrefunds();
  }, [props.refunds]);

  const _setrefunds = () => {
    setState({
      ...state,
      refunds:
        props.refunds &&
        props.refunds.map((item, i) => {
          console.log("itemmmmm", item);
          let { id, updated_at, first_name, last_name } = item;
          return {
            ...item,
            id: `#${id}`,
            full_name: first_name + " " + last_name,

            updated_at: moment(updated_at).format("yy-MM-DD"),
          };
        }),
    });
  };

  return (
    <>
      <CCard
        className="mb-4"
        style={{
          fontWeight: "bold",
          overflowY: "scroll",
          background: "white",
          width: "100%",
        }}
      >
        <CCardHeader>View Refunds</CCardHeader>
        <Sortedtable
          dataArray={state.refunds}
          columns={[
            {
              label: "User",
              field: "full_name",
              sort: "asc",
              width: 270,
            },
            {
              label: "Order#",
              field: "id",
              sort: "asc",
              width: 200,
            },
            {
              label: "Order Total",
              field: "qty",
              sort: "asc",
              width: 200,
            },

            {
              label: "Cancelled At",
              field: "updated_at",
              sort: "asc",
              width: 100,
            },
          ]}
        />
      </CCard>
    </>
  );
};

Category.propTypes = {
  GetAllRefundsBookings: PropTypes.func,
  DeleteBooking: PropTypes.func,
  token: PropTypes.string,
  isLoading: PropTypes.bool,
  history: PropTypes.object,
  refunds: PropTypes.array,
};

const mapStateToProp = (state) => ({
  isLoading: state.BookingsReducer.isLoading,
  token: state.AuthReducer.token,
  refunds: state.BookingsReducer.refunds,

  // userData: state.AuthReducer.userData,
});

const mapDispatchToProps = {
  GetAllRefundsBookings: BookingAction.GetAllRefundsBookings,
  // DeleteBooking: BookingAction.DeleteBooking,
};

export default connect(mapStateToProp, mapDispatchToProps)(Category);
