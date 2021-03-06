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
  CFormCheck,
  CButtonGroup,
  CButtonToolbar,
} from "@coreui/react";
// import { DocsLink } from 'src/reusable'
import { DocsCallout, Example } from "src/reusable";

import {
  CategoryAction,
  BookingAction,
  GroupBookingAction,
  SessionsAction,
} from "src/redux-store/actions";
import { connect } from "react-redux";
import swal from "sweetalert";
import Sortedtable from "../../../components/sortedtables";
import moment from "moment";

const Category = (props) => {
  const categoryTableHeading = [
    "Category Image",
    "Category Name",
    "Category Description",
    "Category Status",
    "Action",
  ];

  const [state, setState] = useState({
    sessions: [],
    loader: false,
  });

  useEffect(() => {
    if (props.token) {
      props.GetAllSessions(props.token);
    }
  }, []);
  useEffect(() => {
    // setCategories(props.categories)
    // console.log("itemmmmm")

    setState({
      ...state,
      sessions:
        props.sessions &&
        props.sessions.map((item, i) => {
          console.log("itemmmmm", item.id);
          return {
            ...item,
            start_date: moment(item.start_date).format("yy-MM-DD"),
            created_at: moment(item.created_at).format("yy-MM-DD"),
            online: (
              <div
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <CCol sm="4">
                  <CFormCheck
                    disabled
                    defaultChecked={item.online === 0 ? false : true}
                    type="checkbox"
                    id="gridCheck1"
                  />
                </CCol>
              </div>
            ),
            action: (
              <div>
                {" "}
                <span
                  onClick={() =>
                    props.history.push(`/Sessions/editsessions/${item.id}`)
                  }
                  style={{ color: "#309CE4", fontSize: 12, cursor: "pointer" }}
                >
                  Edit
                </span>
              </div>
            ),
            action2: (
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
                  Delete
                </span>
              </div>
            ),
          };
        }),
    });
  }, [props.sessions]);
  const EditBooking = (i, id) => {
    //  ????
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
        <CCardHeader>All Session </CCardHeader>
        <Sortedtable
          dataArray={state.sessions}
          columns={[
            {
              label: "order#",
              field: "id",
              sort: "asc",
              // width: 150
            },

            {
              label: "Experience Name",
              field: "title_ar",
              sort: "asc",
              width: 200,
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
              label: "seats",
              field: "seats",
              sort: "asc",
              width: 100,
            },
            {
              label: "Remaing Seats",
              field: "seats",
              sort: "asc",
              width: 100,
            },
            {
              label: "Booked Seats",
              field: "group_booking",
              sort: "asc",
              width: 100,
            },
            {
              label: "online",
              field: "online",
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
              label: "Edit",
              field: "action",
              sort: "asc",
              width: 100,
            },
            {
              label: "delete",
              field: "action2",
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
  sessions: PropTypes.array,
};

const mapStateToProp = (state) => ({
  isLoading: state.GroupBookingsReducer.isLoading,
  token: state.AuthReducer.token,
  sessions: state.ExperienceReducer.sessions,

  // userData: state.AuthReducer.userData,
});

const mapDispatchToProps = {
  GetAllSessions: SessionsAction.GetAllSessions,
  // DeleteBooking: GroupBookingAction.DeleteBooking,
};

export default connect(mapStateToProp, mapDispatchToProps)(Category);
