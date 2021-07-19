import PropTypes from "prop-types";
import React, { useEffect, useState, createRef } from "react";
import classNames from "classnames";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
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
  CFormSelect,
  CSpinner,
} from "@coreui/react";

import {
  CategoryAction,
  CityAction,
  ProviderApprovalAction,
  BookingAction,
  GroupBookingAction,
} from "src/redux-store/actions";
import { connect } from "react-redux";
import { ImageUpload } from "src/utils/api_calls";
import { missingFieldsCheckOut } from "src/utils/globalFunction";
import { toast } from "react-toastify";
import moment from "moment";
const Category = (props) => {
  const rejected = props?.groupbooking?.status === "Rejected" ? true : false;
  const statusApproved =
    props?.groupbooking?.status === "Approved"
      ? true
      : props?.groupbooking?.status === "Rejected"
      ? true
      : false;
  const [state, setState] = useState({
    // loading: false,
    payment_method: "TRANSFER",
  });
  useEffect(() => {
    if (props.token) {
      if (props.match?.params?.id) {
        props.GetBookingById(props.match?.params?.id, props.token);
      } else {
        props.history.push("/groupbooking");
      }
    }
  }, []);
  useEffect(() => {
    // if (props.booking) {
    // let { request } = props;
    // console.log("props.groupBooking?.payment_method==", props.groupbooking?.payment_method?.toLowerCase())
    rejected
      ? null
      : (document.getElementById(
          "done"
        ).value = props.groupbooking?.payment_method?.toLowerCase());
    // setState({
    //   ...state,
    //   payment_method: props.groupBooking?.admin_note,
    // });
    // }
  }, [props.groupbooking?.payment_method]);
  // const imageUpload = async (file) => {
  //   setState({ ...state, loading: true });
  //   let data = new FormData();
  //   data.append("photo", file);
  //   let imageData = await ImageUpload(data, props.token);
  //   if (imageData.success) {
  //     setState({ ...state, img: imageData?.data?.location, loading: false });
  //   } else {
  //     setState({ ...state, loading: false });
  //   }
  //   // setState({ ...state, loading: false })
  //   console.log("imageData", imageData);
  // };
  const ApprovedGroupBooking = async () => {
    let data = state;

    let message = missingFieldsCheckOut(data);
    let isMissed = message?.length > 0;
    if (isMissed) {
      toast.warn(`Please fill all Fields ${message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      // console.log("=======DATA====", data)
      props.ApprovedGroupBooking(
        props.match?.params?.id,
        { ...data },
        props.token,
        props.history
      );
    }
  };
  return (
    <>
      {/* {console.log('ME SB BADALTA DEKHIYA!!', props.match)} */}
      <CCard className="mb-4">
        <CCardHeader>
          <CRow>
            <CCol style={{ alignItems: "center", display: "flex" }}>
              Edit Group Booking
            </CCol>
            <CCol style={{ display: "flex", justifyContent: "flex-end" }}>
              {/* <CButton
                onClick={ApprovedGroupBookings}
                disabled={state.loading || props.isLoading}
                style={{ color: "white", fontSize: 12 }}
                color={"info"}
                shape="rounded-0"
              >
                Edit
              </CButton> */}
              &nbsp; &nbsp;
              <CButton
                onClick={() => props.history.goBack()}
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
                Booking ID
              </CFormLabel>
              <CCol
                sm="4"
                style={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                {props?.groupbooking?.id}
                {/* {props?.groupbooking?.user_add_fname + " " + props?.groupbooking?.user_add_lname ||
                  "no entered"} */}
                {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputEmail3"
                className="col-sm-2 col-form-label"
              >
                email
              </CFormLabel>
              <CCol
                sm="4"
                style={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                {props?.groupbooking?.email || "no entered"}
                {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputEmail3"
                className="col-sm-2 col-form-label"
              >
                phone
              </CFormLabel>
              <CCol
                sm="4"
                style={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                {props?.groupbooking?.mobile || "no entered"}
                {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputEmail3"
                className="col-sm-2 col-form-label"
              >
                organization
              </CFormLabel>
              <CCol
                sm="4"
                style={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                {props?.groupbooking?.organisation || "no entered"}
                {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputEmail3"
                className="col-sm-2 col-form-label"
              >
                proposed date
              </CFormLabel>
              <CCol
                sm="4"
                style={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                {moment(props?.groupbooking?.proposed_date).format(
                  "DD-MM-YY"
                ) || ""}
                {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputEmail3"
                className="col-sm-2 col-form-label"
              >
                proposed Time
              </CFormLabel>
              <CCol
                sm="4"
                style={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                {props?.groupbooking?.proposed_time || "not entered"}
                {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputEmail3"
                className="col-sm-2 col-form-label"
              >
                Qauntity
              </CFormLabel>
              <CCol
                sm="4"
                style={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                {props?.groupbooking?.qty || ""}
                {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputEmail3"
                className="col-sm-2 col-form-label"
              >
                Gender
              </CFormLabel>
              <CCol
                sm="4"
                style={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                {props?.groupbooking?.gender || ""}
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputEmail3"
                className="col-sm-2 col-form-label"
              >
                Location
              </CFormLabel>
              <CCol
                sm="4"
                style={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                {props?.groupbooking?.location || "no entered"}
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputEmail3"
                className="col-sm-2 col-form-label"
              >
                note
              </CFormLabel>
              <CCol
                sm="4"
                style={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                {props?.groupbooking?.note || "no entered"}
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputEmail3"
                className="col-sm-2 col-form-label"
              >
                experience
              </CFormLabel>
              <CCol
                sm="4"
                style={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                {props?.groupbooking?.title_ar || "no entered"}
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputEmail3"
                className="col-sm-2 col-form-label"
              >
                Description
              </CFormLabel>
              <CCol
                sm="4"
                style={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                {props?.groupbooking?.description_ar || "not entered"}
                {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputEmail3"
                className="col-sm-2 col-form-label"
              >
                Hour
              </CFormLabel>
              <CCol
                sm="4"
                style={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                {props?.groupbooking?.time}
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputPassword3"
                className="col-sm-2 col-form-label"
              >
                Price
              </CFormLabel>
              <CCol
                sm="4"
                style={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                {props?.groupbooking?.price || "Not Entered"}
                {/* {moment(props?.groupbooking?.start_time).format("yy-MM-DD") || "not entered"} */}
                {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
              </CCol>
              {/* <CCol sm="4">
                <CFormSelect
                  id="done"
                  onChange={(e) => {
                    setState({ ...state, req_status: e.target.value });
                  }}
                  defaultValue={state.req_status}
                  aria-label="Default select example"
                >
                  <option value="Requested">Requested</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </CFormSelect>
              </CCol> */}
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputPassword3"
                className="col-sm-2 col-form-label"
              >
                Price
              </CFormLabel>
              <CCol
                sm="4"
                style={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                {props?.groupbooking?.price || "Not Entered"}
                {/* {moment(props?.groupbooking?.start_time).format("yy-MM-DD") || "not entered"} */}
                {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
              </CCol>
              {/* <CCol sm="4">
                <CFormSelect
                  id="done"
                  onChange={(e) => {
                    setState({ ...state, req_status: e.target.value });
                  }}
                  defaultValue={state.req_status}
                  aria-label="Default select example"
                >
                  <option value="Requested">Requested</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </CFormSelect>
              </CCol> */}
            </CRow>

            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputPassword3"
                className="col-sm-2 col-form-label"
              >
                Price
              </CFormLabel>
              <CCol
                sm="4"
                style={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                {props?.groupbooking?.price || "not entered"}
                {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputPassword3"
                className="col-sm-2 col-form-label"
              >
                New Session Date/Time
              </CFormLabel>
              <CCol
                sm="4"
                style={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                Not Clear
                {/* <input
                  // style={{ background: 'red' }}
                  onChange={(text) => setState({
                    newDateTime: text.target.value
                  })}
                /> */}
              </CCol>
            </CRow>

            {props?.groupbooking?.status === "Rejected" ? null : (
              <CRow className="mb-3">
                <CFormLabel
                  htmlFor="inputPassword3"
                  className="col-sm-2 col-form-label"
                >
                  Status
                </CFormLabel>
                <CCol
                  sm="4"
                  style={{
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <CFormSelect
                    // disabled
                    id="done"
                    disabled={statusApproved}
                    onChange={(e) => {
                      setState({ ...state, status: e.target.value });
                    }}
                    defaultValue={"transfer"}
                    // value=
                    // aria-label="Default select example"
                  >
                    <option value="card">card </option>
                    <option value="cash">cash</option>
                    <option value="transfer">transfer </option>
                  </CFormSelect>
                </CCol>
              </CRow>
            )}
            {statusApproved ? (
              <CCol style={{ display: "flex", justifyContent: "flex-end" }}>
                <CButton
                  // onClick={ApprovedGroupBookings}
                  disabled={state.loading || props.isLoading}
                  style={{
                    color: "white",
                    fontSize: 12,
                    backgroundColor: "green",
                  }}
                  color={"green"}
                  shape="rounded-0"
                  disabled
                >
                  {props?.groupbooking?.status}
                </CButton>
              </CCol>
            ) : (
              <CCol style={{ display: "flex", justifyContent: "flex-end" }}>
                <CButton
                  onClick={ApprovedGroupBooking}
                  disabled={state.loading || props.isLoading}
                  style={{
                    color: "white",
                    fontSize: 12,
                    backgroundColor: "green",
                  }}
                  color={"green"}
                  shape="rounded-0"
                >
                  Approved
                </CButton>
                &nbsp; &nbsp;
                <CButton
                  onClick={() =>
                    props.RejectGroupBooking(
                      props.match?.params?.id,
                      props.token,
                      props.history
                    )
                  }
                  style={{
                    color: "white",
                    fontSize: 12,
                    backgroundColor: "red",
                  }}
                  color={"red"}
                  shape="rounded-0"
                >
                  Reject
                </CButton>
              </CCol>
            )}
          </CForm>
        </CCardBody>
      </CCard>
    </>
  );
};

Category.propTypes = {
  UpdateBooking: PropTypes.func,
  GetBookingById: PropTypes.func,
  token: PropTypes.string,
  isLoading: PropTypes.bool,
  history: PropTypes.object,
  match: PropTypes.object,
  request: PropTypes.object,
};

const mapStateToProp = (state) => ({
  isLoading: state.GroupBookingsReducer.isLoading,
  token: state.AuthReducer.token,
  request: state.GroupBookingsReducer.request,
  groupbooking: state.GroupBookingsReducer.groupbooking,
});

const mapDispatchToProps = {
  GetBookingById: GroupBookingAction.GetBookingById,
  UpdateBooking: GroupBookingAction.UpdateBooking,
  RejectGroupBooking: GroupBookingAction.RejectGroupBooking,
  ApprovedGroupBooking: GroupBookingAction.ApprovedGroupBooking,
};

export default connect(mapStateToProp, mapDispatchToProps)(Category);
