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

import { SessionsAction } from "src/redux-store/actions";
import { connect } from "react-redux";

import { missingFieldsCheckOut } from "src/utils/globalFunction";
import { toast } from "react-toastify";
import moment from "moment";
const Category = (props) => {
  const [state, setState] = useState({
    newDateTime: "sssss",
    // loading: false,
    admin_note: "sadda",
  });
  useEffect(() => {
    console.log("LIGHT AGYI", props.match?.params?.id);
    if (props.match?.params?.id) {
      console.log(" undar ari ha LIGHT AGYI", props.match?.params?.id);

      props.GetSessionsById(props.match?.params?.id, props.token);
    } else {
      // props.history.push("/sessionDetailss");
    }
  }, []);
  useEffect(() => {
    setState({
      ...state,
      sessionDetails: props.sessionDetails,
    });
  }, [props.sessionDetails]);
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
  const UpdateSessionss = async () => {
    let data = state;
    delete data.newDateTime;
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
      bo;
    } else {
      // props.UpdateSessions(
      //   props.match?.params?.id,
      //   { ...data },
      //   props.token,
      //   props.history
      // );
    }
  };
  return (
    <>
      {/* {console.log('ME SB BADALTA DEKHIYA!!', props.match)} */}
      <CCard className="mb-4">
        <CCardHeader>
          <CRow>
            <CCol style={{ alignItems: "center", display: "flex" }}>
              Edit Session
            </CCol>
            <CCol style={{ display: "flex", justifyContent: "flex-end" }}>
              <CButton
                onClick={UpdateSessionss}
                disabled={state.loading || props.isLoading}
                style={{ color: "white", fontSize: 12 }}
                color={"info"}
                shape="rounded-0"
              >
                Edit
              </CButton>
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
          {/* {console.log("sessionDetails", props.sessionDetails)} */}
          {/*           
          <CRow>
            <CCol>Category Name</CCol>
            <CCol>
              <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            </CCol>
            <CCol></CCol>
          </CRow>
          <CRow>
            <CCol>Category Description</CCol>
            <CCol>
              <CFormControl
                component="textarea"
                id="validationTextarea"
                placeholder="Required example textarea"
                // invalid
                // required
              ></CFormControl>
            </CCol>
            <CCol></CCol>
          </CRow>
        */}
          <CForm>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputEmail3"
                className="col-sm-2 col-form-label"
              >
                Sessions ID
              </CFormLabel>
              <CCol
                sm="4"
                style={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                {props?.sessionDetails?.order_id}
                {/* {props?.sessionDetails?.user_add_fname + " " + props?.sessionDetails?.user_add_lname ||
                  "no entered"} */}
                {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputEmail3"
                className="col-sm-2 col-form-label"
              >
                Sessions By
              </CFormLabel>
              <CCol
                sm="4"
                style={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                {props?.sessionDetails?.user_add_fname +
                  " " +
                  props?.sessionDetails?.user_add_lname || "no entered"}
                {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputEmail3"
                className="col-sm-2 col-form-label"
              >
                Sessions Date
              </CFormLabel>
              <CCol
                sm="4"
                style={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                {moment(props?.sessionDetails?.created_at).format("DD-MM-YY") ||
                  ""}
                {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputEmail3"
                className="col-sm-2 col-form-label"
              >
                Attendance Name
              </CFormLabel>
              <CCol
                sm="4"
                style={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                {props?.sessionDetails?.user_add_fname +
                  " " +
                  props?.sessionDetails?.user_add_lname || "no entered"}
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputEmail3"
                className="col-sm-2 col-form-label"
              >
                Experience
              </CFormLabel>
              <CCol
                sm="4"
                style={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                {props?.sessionDetails?.title_ar || "not entered"}
                {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputEmail3"
                className="col-sm-2 col-form-label"
              >
                Session Date
              </CFormLabel>
              <CCol
                sm="4"
                style={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                {moment(props?.sessionDetails?.start_date).format("yy-MM-DD") ||
                  "no entered"}
                {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputPassword3"
                className="col-sm-2 col-form-label"
              >
                Session Time
              </CFormLabel>
              <CCol
                sm="4"
                style={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                {props?.sessionDetails?.start_time || "Not Entered"}
                {/* {moment(props?.sessionDetails?.start_time).format("yy-MM-DD") || "not entered"} */}
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
                {props?.sessionDetails?.price || "not entered"}
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
                  id="done"
                  onChange={(e) => {
                    setState({ ...state, status: e.target.value });
                  }}
                  defaultValue={state.status}
                  aria-label="Default select example"
                >
                  <option value="Requested">under process</option>
                  <option value="Approved">Approved</option>
                </CFormSelect>
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputPassword3"
                className="col-sm-2 col-form-label"
              >
                Admin Note
              </CFormLabel>
              <CCol
                sm="4"
                style={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <input
                  value={state.admin_note}
                  // style={{ background: 'red' }}
                  onChange={(text) =>
                    setState({
                      admin_note: text.target.value,
                    })
                  }
                />
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
    </>
  );
};

Category.propTypes = {
  UpdateSessions: PropTypes.func,
  GetSessionsById: PropTypes.func,
  token: PropTypes.string,
  isLoading: PropTypes.bool,
  history: PropTypes.object,
  match: PropTypes.object,
  // request: PropTypes.object,
  sessionDetails: PropTypes.object,
};

const mapStateToProp = (state) => ({
  isLoading: state.SessionsReducer.isLoading,
  token: state.AuthReducer.token,
  // request: state.SessionsReducer.request,
  sessionDetails: state.SessionsReducer.sessionDetails,
});

const mapDispatchToProps = {
  GetSessionsById: SessionsAction.GetSessionsById,
  // UpdateBooking: SessionsAction.UpdateBooking,
};

export default connect(mapStateToProp, mapDispatchToProps)(Category);
