import PropTypes from "prop-types";
import React, { useEffect, useState, createRef } from "react";
import classNames from "classnames";
import DatePicker from "react-datepicker";
// import TimePicker from 'react-time-picker';
import "react-datepicker/dist/react-datepicker.css";
import { TimePicker } from "antd";
import moment from "moment";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CFormControl,
  CForm,
  CFormLabel,
  CFormCheck,
  CSpinner,
} from "@coreui/react";
// import CIcon from '@coreui/icons-react'
import { CategoryAction, GroupBookingAction } from "src/redux-store/actions";
import { connect } from "react-redux";
import { ImageUpload } from "src/utils/api_calls";
import { missingFieldsCheckOut } from "src/utils/globalFunction";
import { toast } from "react-toastify";
// import TimePicker from 'react-bootstrap-time-picker';

const Category = (props) => {
  const [state, setState] = useState({
    // name_ar: '',
    // description_ar: '',
    // img: '',
    // loading: false,
    name: "",
    mobile: "",
    email: "",
    organisation: "",
    course_id: 18,
    proposed_date: "",
    proposed_time: "",
    qty: "",
    gender: "",
    location: "",
    note: "",
  });
  const [status, setStatus] = useState(false);
  // useEffect(() => {
  //   if (props.token) {
  //     props.GetCategories(props.token)
  //   }
  // }, [])

  const CreateGroupBooking = async () => {
    let data = state;
    delete data.loading;
    let message = missingFieldsCheckOut(data);
    let isMissed = message.length > 0;
    if (isMissed) {
      toast.warn(`Please fill all Fields ${message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      console.log("check values", data);
      props.CreateGroupBooking({ ...data }, props.token, props.history);
    }
  };
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader
        // style={{
        //   fontWeight: 'bold',
        //   display: 'flex',
        //   flexWrap: 'wrap',
        //   justifyContent: 'space-between',
        // }}
        >
          <CRow>
            <CCol style={{ alignItems: "center", display: "flex" }}>
              Add Category
            </CCol>
            <CCol style={{ display: "flex", justifyContent: "flex-end" }}>
              <CButton
                onClick={CreateGroupBooking}
                disabled={state.loading || props.isLoading}
                style={{ color: "white", fontSize: 12 }}
                color={"info"}
                shape="rounded-0"
              >
                Add
              </CButton>
              &nbsp; &nbsp;
              <CButton
                onClick={() => props.history.push("/groupbooking")}
                style={{ color: "grey", fontSize: 12 }}
                color={"light"}
                shape="rounded-0"
              >
                Cancel
              </CButton>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CForm>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputEmail3"
                className="col-sm-2 col-form-label"
              >
                Name
              </CFormLabel>
              <CCol sm="4">
                <CFormControl
                  onChange={(e) => setState({ ...state, name: e.target.value })}
                  placeholder="Group Booking Name"
                  type="email"
                  id="inputEmail3"
                />
                {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputEmail3"
                className="col-sm-2 col-form-label"
              >
                organisation
              </CFormLabel>
              <CCol sm="4">
                <CFormControl
                  onChange={(text) =>
                    setState({ ...state, organisation: text.target.value })
                  }
                  placeholder="Organization"
                  type="email"
                  id="inputEmail3"
                />
                {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputEmail3"
                className="col-sm-2 col-form-label"
              >
                Email
              </CFormLabel>
              <CCol sm="4">
                <CFormControl
                  onChange={(e) =>
                    setState({ ...state, email: e.target.value })
                  }
                  placeholder="Email"
                  type="email"
                  id="inputEmail3"
                />
                {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputEmail3"
                className="col-sm-2 col-form-label"
              >
                mobile
              </CFormLabel>
              <CCol sm="4">
                <CFormControl
                  onChange={(e) =>
                    setState({ ...state, mobile: e.target.value })
                  }
                  placeholder="Mobile"
                  type="email"
                  id="inputEmail3"
                />
                {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputPassword3"
                className="col-sm-2 col-form-label"
              >
                course_id
              </CFormLabel>
              <CCol sm="4">
                <CFormControl
                  onChange={(e) =>
                    setState({ ...state, course_id: e.target.value })
                  }
                  component="textarea"
                  id="validationTextarea"
                  placeholder="16"
                  // invalid
                  // required
                ></CFormControl>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputPassword3"
                className="col-sm-2 col-form-label"
              >
                qty
              </CFormLabel>
              <CCol sm="4">
                <CFormControl
                  onChange={(e) => setState({ ...state, qty: e.target.value })}
                  component="textarea"
                  id="validationTextarea"
                  placeholder="11"
                  // invalid
                  // required
                ></CFormControl>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputPassword3"
                className="col-sm-2 col-form-label"
              >
                gender
              </CFormLabel>
              <CCol sm="4">
                <CFormControl
                  onChange={(e) =>
                    setState({ ...state, gender: e.target.value })
                  }
                  component="textarea"
                  id="validationTextarea"
                  placeholder="male"
                  // invalid
                  // required
                ></CFormControl>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputPassword3"
                className="col-sm-2 col-form-label"
              >
                location
              </CFormLabel>
              <CCol sm="4">
                <CFormControl
                  onChange={(e) =>
                    setState({ ...state, location: e.target.value })
                  }
                  component="textarea"
                  id="validationTextarea"
                  placeholder="location"
                  // invalid
                  // required
                ></CFormControl>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputPassword3"
                className="col-sm-2 col-form-label"
              >
                note
              </CFormLabel>
              <CCol sm="4">
                <CFormControl
                  onChange={(e) => setState({ ...state, note: e.target.value })}
                  component="textarea"
                  id="validationTextarea"
                  placeholder="Note"
                  // invalid
                  // required
                ></CFormControl>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputPassword3"
                className="col-sm-2 col-form-label"
              >
                Proposed Date
              </CFormLabel>
              <CCol>
                <DatePicker
                  selected={state?.proposed_date}
                  onChange={(date) =>
                    setState({ ...state, proposed_date: date })
                  }
                />
              </CCol>
              <CCol></CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputPassword3"
                className="col-sm-2 col-form-label"
              >
                proposed Time
              </CFormLabel>
              <CCol>
                {/* <TimePicker start="10:00" end="21:00" step={30} /> */}
                <TimePicker
                  //  onChange={onChange}
                  defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
                />
              </CCol>
              <CCol></CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
    </>
  );
};

Category.propTypes = {
  CreateGroupBooking: PropTypes.func,
  token: PropTypes.string,
  isLoading: PropTypes.bool,
  history: PropTypes.object,
  categories: PropTypes.array,
};

const mapStateToProp = (state) => ({
  isLoading: state.AuthReducer.isLoading,
  token: state.AuthReducer.token,
  categories: state.CategoryReducer.categories,
  // userData: state.AuthReducer.userData,
});

const mapDispatchToProps = {
  // GetCategories: GroupBookingAction.GetAllCategories,
  CreateGroupBooking: GroupBookingAction.CreateGroupBooking,
};

export default connect(mapStateToProp, mapDispatchToProps)(Category);
