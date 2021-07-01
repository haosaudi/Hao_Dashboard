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
} from "src/redux-store/actions";
import { connect } from "react-redux";
import swal from "sweetalert";
import Sortedtable from "../../components/sortedtables";
import moment from "moment";

const Category = (props) => {
  const [catBooking, setCategories] = useState([]);
  const [state, setState] = useState({
    users: [],
    loader: false,
  });

  useEffect(() => {
    if (props.token) {
      props.GetAllUsers(props.token);
    }
  }, []);
  useEffect(() => {
    _setUsers();
  }, [props.users]);

  const _setUsers = () => {
    setState({
      ...state,
      users:
        props.users &&
        props.users.map((item, i) => {
          console.log("itemmmmm", item);
          let { account_status, profile_img, created_at, email } = item;
          let status = account_status == 1 ? "Active" : "Not Verified";
          return {
            ...item,
            account_status: (
              <p style={{ color: account_status == 1 ? "#7CD568" : "red" }}>
                {status}
              </p>
            ),
            profile_img: (
              <img
                style={{ width: 80, height: 80, borderRadius: 100 }}
                src={
                  profile_img?.search("amazonaws") !== -1
                    ? profile_img
                    : `http://18.217.187.206/img/profile_img/${
                        profile_img ? profile_img.toLowerCase() : ""
                      }`
                }
              />
            ),
            created_at: moment(created_at).format("yy-MM-DD"),
            email: <p style={{ color: "#309CE4" }}>{email}</p>,
            action: (
              <div>
                {" "}
                <span
                  onClick={() =>
                    props.history.push(`/userManagement/edit/${item.id}`)
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
        <CCardHeader>User Management</CCardHeader>
        <Sortedtable
          dataArray={state.users}
          columns={[
            {
              label: "Users Image",
              field: "profile_img",
              sort: "asc",
              // width: 150
            },
            {
              label: "First Name",
              field: "first_name",
              sort: "asc",
              width: 270,
            },
            {
              label: "Last Name",
              field: "last_name",
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
              label: "Role",
              field: "role",
              sort: "asc",
              width: 100,
            },
            {
              label: "Registration Date",
              field: "created_at",
              sort: "asc",
              width: 100,
            },
            {
              label: "Status",
              field: "account_status",
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
  GetAllUsers: PropTypes.func,
  DeleteBooking: PropTypes.func,
  token: PropTypes.string,
  isLoading: PropTypes.bool,
  history: PropTypes.object,
  users: PropTypes.array,
};

const mapStateToProp = (state) => ({
  isLoading: state.UserReducer.isLoading,
  token: state.AuthReducer.token,
  users: state.UserReducer.users,

  // userData: state.AuthReducer.userData,
});

const mapDispatchToProps = {
  GetAllUsers: UserAction.GetAllUsers,
  // DeleteBooking: BookingAction.DeleteBooking,
};

export default connect(mapStateToProp, mapDispatchToProps)(Category);
