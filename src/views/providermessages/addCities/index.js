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
import { CategoryAction, CityAction } from "src/redux-store/actions";
import { connect } from "react-redux";
import { ImageUpload } from "src/utils/api_calls";
import { missingFieldsCheckOut } from "src/utils/globalFunction";
import { toast } from "react-toastify";

const City = (props) => {
  const [state, setState] = useState({
    name_ar: "",
    img: "",
    loading: false,
  });
  const [status, setStatus] = useState(false);

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
  const AddCity = async () => {
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
      props.AddCity(
        { ...data, status: status ? 1 : 0 },
        props.token,
        props.history
      );
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
                onClick={AddCity}
                disabled={state.loading || props.isLoading}
                style={{ color: "white", fontSize: 12 }}
                color={"info"}
                shape="rounded-0"
              >
                Add
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
                City Name
              </CFormLabel>
              <CCol sm="4">
                <CFormControl
                  onChange={(e) =>
                    setState({ ...state, name_ar: e.target.value })
                  }
                  placeholder="City Name"
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
                Enabled
              </CFormLabel>
              <CCol sm="4">
                <CFormCheck
                  onChange={(e) => {
                    setStatus(e.target.checked);
                  }}
                  type="checkbox"
                  id="gridCheck1"
                  label=""
                />
              </CCol>
              {/* <CFormCheck type="checkbox" id="gridCheck1" label="Example checkbox" /> */}
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputPassword3"
                className="col-sm-2 col-form-label"
              >
                City Image
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
              ) : state.img?.length > 0 ? (
                <>
                  <CCol sm="2">Uploaded</CCol>
                  <img
                    style={{ width: 150 }}
                    src={
                      state.img?.search("amazonaws") !== -1
                        ? state.img
                        : `http://18.217.187.206/img/category_img/${
                            state.img ? state.img.toLowerCase() : ""
                          }`
                    }
                  />
                </>
              ) : null}

              {/* <CFormCheck type="checkbox" id="gridCheck1" label="Example checkbox" /> */}
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
    </>
  );
};

City.propTypes = {
  AddCity: PropTypes.func,
  token: PropTypes.string,
  isLoading: PropTypes.bool,
  history: PropTypes.object,
  cities: PropTypes.array,
};

const mapStateToProp = (state) => ({
  isLoading: state.AuthReducer.isLoading,
  token: state.AuthReducer.token,
  cities: state.CityReducer.cities,
  // userData: state.AuthReducer.userData,
});

const mapDispatchToProps = {
  AddCity: CityAction.AddCity,
};

export default connect(mapStateToProp, mapDispatchToProps)(City);
