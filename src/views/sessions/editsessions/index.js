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
  CFormCheck,
  CSpinner,
} from "@coreui/react";

import { SessionsAction } from "src/redux-store/actions";
import { connect } from "react-redux";

import { missingFieldsCheckOut } from "src/utils/globalFunction";
import { toast } from "react-toastify";
import moment from "moment";
const Category = (props) => {
  const [state, setState] = useState({
    status: 1,
    online: 0,
    seats: 0,
    note: "",
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
      status: props?.sessionDetails?.status,
      note: props?.sessionDetails?.note,
      online: props?.sessionDetails?.online,
      seats: props?.sessionDetails?.seats,
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
      props.UpdateSessions(
        props.match?.params?.id,
        { ...data },
        props.token,
        props.history
      );
    }
  };

  const RadioButton = () => {
    return (
      <CCol sm="4">
        <CFormCheck
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault1"
          onChange={(e) => {
            setState({ ...state, status: 1 });
          }}
          defaultChecked={state.status == 1}
          label="Enabled"
        />
        <CFormCheck
          type="radio"
          name="flexRadioDefault"
          onChange={(e) => {
            setState({ ...state, status: 0 });
          }}
          defaultChecked={state.status == 0}
          id="flexRadioDefault2"
          label="Disabled"
        />
      </CCol>
    );
  };
  const RadioButton1 = () => {
    return (
      <CCol sm="4">
        <CFormCheck
          type="radio"
          name="flexRadioDefaultDone"
          id="flexRadioDefaultDOne"
          onChange={(e) => {
            console.log("CHECKING CHEKED!!", e.target.checked);
            setState({ ...state, online: e.target.checked ? 1 : 0 });
          }}
          defaultChecked={state.online == 1}
          label="Online?"
        />
      </CCol>
    );
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
          <CForm>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputEmail3"
                className="col-sm-2 col-form-label"
              >
                Experience Name
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
                Start Date
              </CFormLabel>
              <CCol
                sm="4"
                style={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                {moment(props?.sessionDetails?.start_date).format("DD-MM-YY") ||
                  ""}
                {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputEmail3"
                className="col-sm-2 col-form-label"
              >
                End Date
              </CFormLabel>
              <CCol
                sm="4"
                style={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                {moment(props?.sessionDetails?.end_date).format("DD-MM-YY") ||
                  ""}
                {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputEmail3"
                className="col-sm-2 col-fo  rm-label"
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
                {props?.sessionDetails?.first_name +
                  " " +
                  props?.sessionDetails?.last_name || "no entered"}
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
                Start Time
              </CFormLabel>
              <CCol
                sm="4"
                style={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                {props?.sessionDetails?.start_time || "Not Entered"}
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputPassword3"
                className="col-sm-2 col-form-label"
              >
                End Time
              </CFormLabel>
              <CCol
                sm="4"
                style={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                {props?.sessionDetails?.end_time || "Not Entered"}
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
                {props?.sessionDetails?.price || "not entered"}
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputPassword3"
                className="col-sm-2 col-form-label"
              >
                Number of Seats
              </CFormLabel>
              <CCol
                sm="4"
                style={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                {/* {state.seats || "not entered"} */}
                <CFormControl
                  onChange={(e) => {
                    if (e.target.value < 0) {
                    } else {
                      setState({ ...state, seats: e.target.value });
                    }
                  }}
                  value={state.seats}
                  id="validationTextarea"
                  type="number"
                ></CFormControl>
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputPassword4"
                className="col-sm-2 col-form-label"
              >
                Online
              </CFormLabel>
              <RadioButton1 />
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputPassword3"
                className="col-sm-2 col-form-label"
              >
                Status
              </CFormLabel>
              <RadioButton />
            </CRow>

            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputPassword3"
                className="col-sm-2 col-form-label"
              >
                Note
              </CFormLabel>
              <CCol
                sm="4"
                style={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <input
                  value={state.note}
                  onChange={(text) =>
                    setState({
                      ...state,
                      note: text.target.value,
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
  UpdateSessions: SessionsAction.UpdateSession,
  // UpdateBooking: SessionsAction.UpdateBooking,
};

export default connect(mapStateToProp, mapDispatchToProps)(Category);
