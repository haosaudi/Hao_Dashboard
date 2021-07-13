import PropTypes from "prop-types";
import React, { useEffect, useState, useRef } from "react";
import classNames from "classnames";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CFormLabel,
  CFormSelect,
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
  EmailAction,
} from "src/redux-store/actions";
import { connect } from "react-redux";
import swal from "sweetalert";
import moment from "moment";
import EmailEditor from "react-email-editor";
import { toast } from "react-toastify";
const Category = (props) => {
  const [catBooking, setCategories] = useState([]);
  const [state, setState] = useState({
    email_type: "",
    email_type_no: 0,
  });
  const emailEditorRef = useRef(null);

  const exportHtml = () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data;
      if (state.email_type_no.length > 0) {
        AddDesign(html, design);
      } else {
        toast.warn(`Please Select Email Type`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
  };

  const onLoad = () => {
    // you can load your template here;
    // const templateJson = {};
    // emailEditorRef.current.editor.loadDesign(templateJson);
  };

  const AddDesign = async (html, design) => {
    props.AddDesign(
      {
        html,
        ...design,
        schema_version: design.schemaVersion,
        email_type: emailTypes[state.email_type_no],
        email_type_no: state.email_type_no,
        status: 1,
      },
      props.token,
      props.history
    );
  };

  let emailTypes = {
    0: "Forgot Password",
    1: "Otp",
    2: "Booking 12 hour before",
    3: "Experience Review",
    4: "Slot Availibility",
    5: "Received Gift",
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
        <CCardHeader>Email Design</CCardHeader>
        <CCardBody>
          <CRow className="mb-3">
            <CFormLabel
              htmlFor="inputEmail3"
              className="col-sm-2 col-form-label"
            >
              Email Type
            </CFormLabel>
            <CCol sm="4">
              <CFormSelect
                onChange={(e) => {
                  setState({ ...state, email_type_no: e.target.value });
                }}
                aria-label="Default select example"
              >
                <option>Email Type</option>
                <option
                  onClick={() => {
                    console.log("YUP!!");
                    setState({ ...state, email_type: "Forgot Password" });
                  }}
                  value="0"
                >
                  Forgot Password
                </option>
                <option
                  onClick={() => {
                    setState({ ...state, email_type: "Otp" });
                  }}
                  value="1"
                >
                  Otp
                </option>
                <option
                  onClick={() => {
                    setState({
                      ...state,
                      email_type: "Booking 12 hour before",
                    });
                  }}
                  value="2"
                >
                  Booking 12 hour before
                </option>
                <option
                  onClick={() => {
                    setState({ ...state, email_type: "Experience Review" });
                  }}
                  value="3"
                >
                  Experience Review
                </option>
                <option
                  onClick={() => {
                    setState({ ...state, email_type: "Slot Availibility" });
                  }}
                  value="4"
                >
                  Slot Availibility
                </option>
                <option
                  onClick={() => {
                    setState({ ...state, email_type: "Received Gift" });
                  }}
                  value="5"
                >
                  Received Gift
                </option>
              </CFormSelect>
              {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
            </CCol>
          </CRow>
          <div>
            <button disabled={props.isLoading} onClick={exportHtml}>
              Add To Design
            </button>
          </div>
          <EmailEditor ref={emailEditorRef} onLoad={onLoad} />
        </CCardBody>
      </CCard>
    </>
  );
};

Category.propTypes = {
  AddDesign: PropTypes.func,
  DeleteBooking: PropTypes.func,
  token: PropTypes.string,
  isLoading: PropTypes.bool,
  history: PropTypes.object,
};

const mapStateToProp = (state) => ({
  isLoading: state.EmailReducer.isLoading,
  token: state.AuthReducer.token,
});

const mapDispatchToProps = {
  AddDesign: EmailAction.AddEmailDesign,
  // DeleteBooking: BookingAction.DeleteBooking,
};

export default connect(mapStateToProp, mapDispatchToProps)(Category);
