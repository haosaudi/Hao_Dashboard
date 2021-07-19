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
import { CategoryAction, BookingAction } from "src/redux-store/actions";
import { connect } from "react-redux";
import swal from "sweetalert";
import Sortedtable from "../../components/sortedtables";
import moment from "moment";

const Category = (props) => {
  const categoryTableHeading = [
    "Category Image",
    "Category Name",
    "Category Description",
    "Category Status",
    "Action",
  ];

  const [catBooking, setCategories] = useState([]);
  const [state, setState] = useState({
    bookings: [],
    loader: false,
  });

  useEffect(() => {
    if (props.token) {
      props.GetAllBookings(props.token);
    }
  }, []);
  useEffect(() => {
    // setCategories(props.categories)
    console.log("itemmmmm");

    setState({
      ...state,
      bookings: props?.bookings?.map((item, i) => {
        return {
          ...item,
          start_date: moment(item.start_date).format("yy-MM-DD"),
          created_at: moment(item.created_at).format("yy-MM-DD"),
          action: (
            <div>
              <span
                onClick={() =>
                  props.history.push(`/bookingdetails/edit/${item.id}`)
                }
                style={{ color: "#309CE4", fontSize: 12, cursor: "pointer" }}
              >
                Edit
              </span>
            </div>
          ),
        };
      }),
    });
  }, [props.bookings]);
  const EditBooking = (i, id) => {
    //  ہب
  };
  // const EditBooking = (i, id) => {
  //   swal({
  //     title: 'Are you sure?',
  //     text: 'Once deleted, you will not be able to recover this category!',
  //     icon: 'warning',
  //     buttons: true,
  //     dangerMode: true,
  //   }).then((willDelete) => {
  //     if (willDelete) {
  //       swal('Poof! Your category has been deleted!', {
  //         icon: 'success',
  //       })
  //       props.DeleteCategory(id, props.token)
  //       // setCategories(categories.filter((item, ind) => ind !== i))
  //       setState({ ...state, bookings: state.bookings.filter((item, ind) => ind !== i) })
  //     } else {
  //       swal('Your category is safe!')
  //     }
  //   })
  // }
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
        <CCardHeader>
          bookings
          <span
            onClick={() =>
              props.history.push("groupbooking/viewbookingstatistics")
            }
            style={{
              fontSize: 12,
              fontWeight: "400",
              color: "#309CE4",
              textDecorationLine: "underline",
              cursor: "pointer",
              marginLeft: 16,
            }}
          >
            ‎View Booking Statistics
          </span>
        </CCardHeader>
        <Sortedtable
          dataArray={state.bookings}
          columns={[
            {
              label: "order#",
              field: "id",
              sort: "asc",
            },
            {
              label: "order Item",
              field: "order_id",
              sort: "asc",
              width: 270,
            },
            {
              label: "Attendee By",
              field: "user_add_fname",
              sort: "asc",
              width: 200,
            },
            {
              label: "Booked By",
              field: "first_name",
              sort: "asc",
              width: 200,
            },
            {
              label: "Email",
              field: "email",
              sort: "asc",
              width: 100,
            },

            {
              label: "Experience",
              field: "title_ar",
              sort: "asc",
              width: 100,
            },
            {
              label: "Sessions Date",
              field: "start_date",
              sort: "asc",
              width: 100,
            },
            {
              label: "Sessions Time",
              field: "start_time",
              sort: "asc",
              width: 100,
            },
            {
              label: "Price Items",
              field: "coursePrice",
              sort: "asc",
              width: 100,
            },
            {
              label: "Coupon",
              field: "coupon_code",
              sort: "asc",
              width: 100,
            },
            {
              label: "Status",
              field: "status",
              sort: "asc",
              width: 100,
            },

            {
              label: "Registeration Date",
              field: "created_at",
              sort: "asc",
              width: 100,
            },
            {
              label: "total Price ",
              field: "price",
              sort: "asc",
              width: 100,
            },
            {
              label: "Actions",
              field: "action",
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
  GetAllBookings: PropTypes.func,
  DeleteBooking: PropTypes.func,
  token: PropTypes.string,
  isLoading: PropTypes.bool,
  history: PropTypes.object,
  bookings: PropTypes.array,
};

const mapStateToProp = (state) => ({
  isLoading: state.BookingsReducer.isLoading,
  token: state.AuthReducer.token,
  bookings: state.BookingsReducer.bookingsStats,
});

const mapDispatchToProps = {
  GetAllBookings: BookingAction.GetAllBookings,
  // DeleteBooking: BookingAction.DeleteBooking,
};

export default connect(mapStateToProp, mapDispatchToProps)(Category);
