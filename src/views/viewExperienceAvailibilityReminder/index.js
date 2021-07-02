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
    experienceAvailibilties: [],
    loader: false,
  });

  useEffect(() => {
    if (props.token) {
      props.GetAllExperiencesReminders(props.token);
    }
  }, []);
  useEffect(() => {
    _setExperienceAvailibilties();
  }, [props.experienceAvailibilties]);

  const _setExperienceAvailibilties = () => {
    setState({
      ...state,
      experienceAvailibilties:
        props.experienceAvailibilties &&
        props.experienceAvailibilties.map((item, i) => {
          console.log("itemmmmm", item);
          let {
            account_status,
            profile_img,
            created_at,
            email,
            first_name,
            last_name,
          } = item;
          let status = account_status == 1 ? "Active" : "Not Verified";
          return {
            ...item,
            account_status: (
              <p style={{ color: account_status == 1 ? "#7CD568" : "red" }}>
                {status}
              </p>
            ),
            full_name: first_name + " " + last_name,
            profile_img: (
              <img
                style={{ width: 80, height: 80, borderRadius: 150 }}
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
                    props.history.push(`/providerManagement/edit/${item.id}`)
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
        <CCardHeader>View Experience Availibility Request</CCardHeader>
        <Sortedtable
          dataArray={state.experienceAvailibilties}
          columns={[
            {
              label: "Course Name",
              field: "title_ar",
              sort: "asc",
              width: 150,
            },
            {
              label: "Requested By",
              field: "full_name",
              sort: "asc",
              width: 270,
            },
            {
              label: "Requested Email",
              field: "email",
              sort: "asc",
              width: 200,
            },

            {
              label: "Requested Date",
              field: "created_at",
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
  GetAllExperiencesReminders: PropTypes.func,
  DeleteBooking: PropTypes.func,
  token: PropTypes.string,
  isLoading: PropTypes.bool,
  history: PropTypes.object,
  experienceAvailibilties: PropTypes.array,
};

const mapStateToProp = (state) => ({
  isLoading: state.ExperienceAvailibilityReducer.isLoading,
  token: state.AuthReducer.token,
  experienceAvailibilties:
    state.ExperienceAvailibilityReducer.experienceAvailibilties,

  // userData: state.AuthReducer.userData,
});

const mapDispatchToProps = {
  GetAllExperiencesReminders:
    ExperienceAvailibilityAction.GetAllExperiencesReminders,
  // DeleteBooking: BookingAction.DeleteBooking,
};

export default connect(mapStateToProp, mapDispatchToProps)(Category);
