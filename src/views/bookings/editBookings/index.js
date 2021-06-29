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
import CIcon from "@coreui/icons-react";
import { DocsLink } from "src/reusable";
import {
  CategoryAction,
  CityAction,
  ProviderApprovalAction,
} from "src/redux-store/actions";
import { connect } from "react-redux";
import { ImageUpload } from "src/utils/api_calls";
import { missingFieldsCheckOut } from "src/utils/globalFunction";
import { toast } from "react-toastify";
import moment from "moment";
const Category = (props) => {
  const [state, setState] = useState({
    req_status: "",
    loading: false,
  });
  const [status, setStatus] = useState(false);
  useEffect(() => {
    if (props.token) {
      if (props.match?.params?.id) {
        props.GetRequestById(props.match?.params?.id, props.token);
      } else {
        props.history.push("/city");
      }
    }
  }, []);
  useEffect(() => {
    if (props.request) {
      let { request } = props;
      document.getElementById("done").value = request.req_status;
      setState({
        ...state,
        req_status: request.req_status,
      });
    }
  }, [props.request]);
  const imageUpload = async (file) => {
    setState({ ...state, loading: true });
    let data = new FormData();
    data.append("photo", file);
    let imageData = await ImageUpload(data, props.token);
    if (imageData.success) {
      setState({ ...state, img: imageData?.data?.location, loading: false });
    } else {
      setState({ ...state, loading: false });
    }
    // setState({ ...state, loading: false })
    console.log("imageData", imageData);
  };
  const EditCity = async () => {
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
      props.UpdateProviderRequest(
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
              Edit Category
            </CCol>
            <CCol style={{ display: "flex", justifyContent: "flex-end" }}>
              <CButton
                onClick={EditCity}
                disabled={state.loading || props.isLoading}
                style={{ color: "white", fontSize: 12 }}
                color={"info"}
                shape="rounded-0"
              >
                Edit
              </CButton>
              &nbsp; &nbsp;
              <CButton
                onClick={() => props.history.push("/city")}
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
                Requested User
              </CFormLabel>
              <CCol
                sm="4"
                style={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                {props?.request?.first_name + " " + props?.request?.last_name ||
                  "s"}
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
              <CCol
                sm="4"
                style={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                {props?.request?.email || ""}
                {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputEmail3"
                className="col-sm-2 col-form-label"
              >
                Mobile
              </CFormLabel>
              <CCol
                sm="4"
                style={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                {props?.request?.mobile || ""}
                {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputEmail3"
                className="col-sm-2 col-form-label"
              >
                City
              </CFormLabel>
              <CCol
                sm="4"
                style={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                {props?.request?.city || ""}
                {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputEmail3"
                className="col-sm-2 col-form-label"
              >
                Category
              </CFormLabel>
              <CCol
                sm="4"
                style={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                {props?.request?.category || ""}
                {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputEmail3"
                className="col-sm-2 col-form-label"
              >
                Requested Date
              </CFormLabel>
              <CCol
                sm="4"
                style={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                {moment(props?.request?.created_at).format("yy-MM-DD") || ""}
                {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputPassword3"
                className="col-sm-2 col-form-label"
              >
                Request Status
              </CFormLabel>
              <CCol sm="4">
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
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
    </>
  );
};

Category.propTypes = {
  UpdateProviderRequest: PropTypes.func,
  GetRequestById: PropTypes.func,
  token: PropTypes.string,
  isLoading: PropTypes.bool,
  history: PropTypes.object,
  match: PropTypes.object,
  request: PropTypes.object,
};

const mapStateToProp = (state) => ({
  isLoading: state.ProviderApprovalReducer.isLoading,
  token: state.AuthReducer.token,
  request: state.ProviderApprovalReducer.request,
  // userData: state.AuthReducer.userData,
});

const mapDispatchToProps = {
  GetRequestById: ProviderApprovalAction.GetProviderRequestById,
  UpdateProviderRequest: ProviderApprovalAction.UpdateProviderRequest,
};

export default connect(mapStateToProp, mapDispatchToProps)(Category);
