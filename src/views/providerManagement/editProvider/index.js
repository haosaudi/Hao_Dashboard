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
  CInputGroupText,
  CSpinner,
  CInputGroup,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { DocsLink } from "src/reusable";
import {
  CategoryAction,
  CityAction,
  ProviderApprovalAction,
  BookingAction,
  UserAction,
} from "src/redux-store/actions";
import { connect } from "react-redux";
import { ImageUpload } from "src/utils/api_calls";
import { missingFieldsCheckOut } from "src/utils/globalFunction";
import { toast } from "react-toastify";
import moment from "moment";
const EditProviderManagement = (props) => {
  const [state, setState] = useState({
    loading: false,
    mobile: "",
    profile_img: "",
    percentage: "",
  });
  useEffect(() => {
    if (props.token) {
      if (props.match?.params?.id) {
        props.GetUserById(props.match?.params?.id, props.token);
      } else {
        props.history.push("/providerManagement");
      }
    }
  }, []);
  useEffect(() => {
    // if (props.booking) {
    let { user } = props;
    // document.getElementById("done").value = request.req_status;
    setState({
      ...state,
      mobile: user?.mobile,
      profile_img: user?.profile_img,
      percentage: user?.percentage,
    });
    // }
  }, [props.user]);

  const UpdateUsers = async () => {
    let data = state;
    delete data.loading;
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
      props.UpdateUser(
        {
          ...data,
          id: props.match?.params?.id,
        },
        props.token,
        props.history,
        true
      );
    }
  };
  const imageUpload = async (file) => {
    setState({ ...state, loading: true });
    let data = new FormData();
    data.append("photo", file);
    let imageData = await ImageUpload(data, props.token);
    if (imageData.success) {
      setState({
        ...state,
        profile_img: imageData?.data?.location,
        loading: false,
      });
    } else {
      setState({ ...state, loading: false });
    }
    // setState({ ...state, loading: false })
    console.log("imageData", imageData);
  };
  return (
    <>
      {/* {console.log('ME SB BADALTA DEKHIYA!!', props.match)} */}
      <CCard className="mb-4">
        <CCardHeader>
          <CRow>
            <CCol style={{ alignItems: "center", display: "flex" }}>
              Edit User
            </CCol>
            <CCol style={{ display: "flex", justifyContent: "flex-end" }}>
              <CButton
                onClick={UpdateUsers}
                disabled={state.loading || props.isLoading}
                style={{ color: "white", fontSize: 12 }}
                color={"info"}
                shape="rounded-0"
              >
                Edit
              </CButton>
              &nbsp; &nbsp;
              <CButton
                onClick={() => props.history.push("/providerManagement")}
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
                htmlFor="inputPassword3"
                className="col-sm-2 col-form-label"
              >
                User Image
              </CFormLabel>
              <CCol sm="4">
                <CFormControl
                  onChange={(e) => {
                    imageUpload(e.target.files[0]);
                  }}
                  type="file"
                  id="formFile"
                />
              </CCol>
              {state.loading ? (
                <CCol sm="2">
                  <CSpinner style={{ height: 25, width: 25 }} />
                </CCol>
              ) : state.profile_img?.length > 0 ? (
                <>
                  <CCol sm="2">Uploaded</CCol>
                  <img
                    style={{ width: 150 }}
                    src={
                      state.profile_img?.search("amazonaws") !== -1
                        ? state.profile_img
                        : `http://18.217.187.206/img/category_img/${
                            state.profile_img
                              ? state.profile_img.toLowerCase()
                              : ""
                          }`
                    }
                  />
                </>
              ) : null}

              {/* <CFormCheck type="checkbox" id="gridCheck1" label="Example checkbox" /> */}
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputEmail3"
                className="col-sm-2 col-form-label"
              >
                Mobile
              </CFormLabel>
              <CCol sm="4">
                <CFormControl
                  onChange={(e) =>
                    setState({ ...state, mobile: e.target.value })
                  }
                  placeholder="Mobile"
                  type="email"
                  value={state.mobile}
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
                Percentage
              </CFormLabel>
              <CCol sm="4">
                {/* <CFormControl
                  onChange={(e) =>
                    setState({ ...state, percentage: e.target.value })
                  }
                  placeholder="Percentage"
                  value={state.percentage}
                  id="inputEmail3"
                /> */}
                <CInputGroup>
                  <CFormControl
                    onChange={(e) => {
                      if (e.target.value >= 0)
                        setState({ ...state, percentage: e.target.value });
                    }}
                    placeholder="Percentage"
                    value={state.percentage}
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                  />
                  <CInputGroupText id="basic-addon1">%</CInputGroupText>
                </CInputGroup>
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
    </>
  );
};

EditProviderManagement.propTypes = {
  UpdateUser: PropTypes.func,
  GetUserById: PropTypes.func,
  token: PropTypes.string,
  isLoading: PropTypes.bool,
  history: PropTypes.object,
  match: PropTypes.object,
  user: PropTypes.object,
};

const mapStateToProp = (state) => ({
  isLoading: state.UserReducer.isLoading,
  token: state.AuthReducer.token,
  user: state.UserReducer.user,
});

const mapDispatchToProps = {
  GetUserById: UserAction.GetUserById,
  UpdateUser: UserAction.UpdateUser,
};

export default connect(
  mapStateToProp,
  mapDispatchToProps
)(EditProviderManagement);
