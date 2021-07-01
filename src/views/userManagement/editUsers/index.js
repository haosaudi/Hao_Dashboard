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
const Category = (props) => {
  const [state, setState] = useState({
    isSiteAdmin: false,
    mobile: "",
    password: "",
  });
  useEffect(() => {
    if (props.token) {
      if (props.match?.params?.id) {
        props.GetUserById(props.match?.params?.id, props.token);
      } else {
        props.history.push("/bookings");
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
      isSiteAdmin: user?.role == "SiteAdmin",
    });
    // }
  }, [props.user]);

  const UpdateUsers = async () => {
    let data = state;
    let { isSiteAdmin } = state;
    delete data.isSiteAdmin;
    if (data?.password?.length == 0) {
      delete data.password;
    }
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
      console.log("LETS GO SHAPATAR!!", isSiteAdmin);
      props.UpdateUser(
        {
          ...data,
          role: isSiteAdmin ? "SiteAdmin" : "User",
          id: props.match?.params?.id,
        },
        props.token,
        props.history
      );
    }
  };

  const CheckBox = () => {
    return (
      <CFormCheck
        style={{ marginLeft: 0 }}
        id="enabled"
        defaultChecked={state.isSiteAdmin}
        onChange={(e) => {
          setState({ ...state, isSiteAdmin: e.target.checked });
        }}
        type="checkbox"
        id="gridCheck1"
        label=""
      />
    );
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
                onClick={() => props.history.push("/userManagement")}
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
                Site Admin?
              </CFormLabel>
              <CCol sm="4">
                <CheckBox />
              </CCol>
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
                Password
              </CFormLabel>
              <CCol sm="4">
                <CFormControl
                  onChange={(e) =>
                    setState({ ...state, password: e.target.value })
                  }
                  component="textarea"
                  value={state.password}
                  id="validationTextarea"
                  placeholder="Password"
                  // invalid
                  // required
                ></CFormControl>
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
    </>
  );
};

Category.propTypes = {
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

export default connect(mapStateToProp, mapDispatchToProps)(Category);
