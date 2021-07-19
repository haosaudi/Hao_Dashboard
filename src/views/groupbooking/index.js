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
// import { DocsLink } from 'src/reusable'
import {
  CategoryAction,
  BookingAction,
  GroupBookingAction,
} from "src/redux-store/actions";
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
    groupbookings: [],
    loader: false,
  });

  useEffect(() => {
    if (props.token) {
      props.GetAllGroupBooking(props.token);
    }
  }, []);
  useEffect(() => {
    // setCategories(props.categories)
    // console.log("itemmmmm")

    setState({
      ...state,
      groupbookings:
        props.groupbookings &&
        props.groupbookings.map((item, i) => {
          // console.log("itemmmmm", item)
          return {
            ...item,
            start_date: moment(item.start_date).format("yy-MM-DD"),
            created_at: moment(item.created_at).format("yy-MM-DD"),
            action: (
              <div>
                {" "}
                <span
                  onClick={() =>
                    props.history.push(
                      `/groupbooking/approvedgroupbooking/${item.id}`
                    )
                  }
                  style={{ color: "#309CE4", fontSize: 12, cursor: "pointer" }}
                >
                  Edit
                </span>
              </div>
            ),
            // name: item.user_add_fname,
            // orderId: item.order_id,
            // AttendeeBy: '2011/04/25',
            // bookedBy: '$320',
            // email: item.email,
            // experience: item.title_ar,
            // sessionsDate: item.start_date,
            // sessionTime: item.start_time,
            // priceItem: '$320',
            // coupon: '2011/04/25',
            // status: '$320',
            // registerationDate: '$320',
            // totalPrice: '2011/04/25',
            // Actions: '$320',
          };
        }),
    });
  }, [props.groupbookings]);
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
          Group Bookings{" "}
          <span
            onClick={() =>
              props.history.push("/groupbooking/creategroupbooking")
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
            Add New Group Booking
          </span>
        </CCardHeader>
        <Sortedtable
          dataArray={state.groupbookings}
          columns={[
            {
              label: "req#",
              field: "id",
              sort: "asc",
              // width: 150
            },

            {
              label: "Attendee By",
              field: "name",
              sort: "asc",
              width: 200,
            },
            {
              label: "Mobile",
              field: "mobile",
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
              label: "Added Date",
              field: "created_at",
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

          // actions ={()=>}
          // delete={()=> EditBooking() }
        />
      </CCard>
    </>
  );
};

Category.propTypes = {
  GetAllGroupBooking: PropTypes.func,
  DeleteBooking: PropTypes.func,
  token: PropTypes.string,
  isLoading: PropTypes.bool,
  history: PropTypes.object,
  groupbookings: PropTypes.array,
};

const mapStateToProp = (state) => ({
  isLoading: state.GroupBookingsReducer.isLoading,
  token: state.AuthReducer.token,
  groupbookings: state.GroupBookingsReducer.groupbookings,

  // userData: state.AuthReducer.userData,
});

const mapDispatchToProps = {
  GetAllGroupBooking: GroupBookingAction.GetAllGroupBooking,
  // DeleteBooking: GroupBookingAction.DeleteBooking,
};

export default connect(mapStateToProp, mapDispatchToProps)(Category);
