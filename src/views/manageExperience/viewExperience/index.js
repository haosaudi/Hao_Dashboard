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
  CFormSelect,
  CSpinner,
  CInputGroupText,
  CInputGroup,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { DocsLink } from "src/reusable";
import {
  CategoryAction,
  CityAction,
  ExperienceAction,
} from "src/redux-store/actions";
import { connect } from "react-redux";
import { ImageUpload } from "src/utils/api_calls";
import { missingFieldsCheckOut } from "src/utils/globalFunction";
import { toast } from "react-toastify";
const Category = (props) => {
  const [state, setState] = useState({
    title_ar: "",
    description_ar: "",
    img_background: "",
    category_id: "",
    gender: "",
    time: "",
    price: "",
    language: "",
    city_id: "",
    pre_requisition_ar: "",
    tools_ar: "",
    location_desc_ar: "",
    online: false,
    longitude: "",
    latitude: "",
    loading: false,
  });
  const [status, setStatus] = useState(false);
  useEffect(() => {
    if (props.token) {
      if (props.match?.params?.id) {
        props.GetExperienceById(props.match?.params?.id, props.token);
      } else {
        props.history.push("/experience");
      }
    }
  }, []);
  useEffect(() => {
    if (props.experience) {
      let { experience } = props;
      console.log("EXPERIENCE!!", experience);
      setState({
        ...state,
        title_ar: experience.title_ar,
        description_ar: experience.description_ar,
        category_id: experience.category_id,
        city_id: experience.city_id,
        gender: experience.gender,
        time: experience.time,
        price: experience.price,
        language: experience.language,
        pre_requisition_ar: experience.pre_requisition_ar,
        tools_ar: experience.tools_ar,
        location_desc_ar: experience.location_desc_ar,
        online: experience.online,
        longitude: experience.longitude,
        latitude: experience.latitude,
        img_background: experience.img_background,
      });
    }
  }, [props.experience]);

  const CheckBox = () => (
    <CFormCheck
      defaultChecked={state.online}
      style={{ marginLeft: 0 }}
      onChange={(e) => {
        setState({ ...state, online: e.target.checked });
      }}
      type="checkbox"
      id="gridCheck1"
      label=""
      disabled
    />
  );

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <CRow>
            <CCol style={{ alignItems: "center", display: "flex" }}>
              View Experience
            </CCol>
            <CCol style={{ display: "flex", justifyContent: "flex-end" }}>
              <CButton
                onClick={() => props.history.push("/experience")}
                style={{ color: "grey", fontSize: 12 }}
                color={"light"}
                shape="rounded-0"
              >
                BACK
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
              <CCol sm="4">
                {state.title_ar}
                {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputPassword3"
                className="col-sm-2 col-form-label"
              >
                Experience Description
              </CFormLabel>
              <CCol sm="4">{state.description_ar}</CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputPassword3"
                className="col-sm-2 col-form-label"
              >
                Category
              </CFormLabel>
              <CCol sm="4">{props?.experience?.category || ""}</CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputPassword3"
                className="col-sm-2 col-form-label"
              >
                Gender
              </CFormLabel>
              <CCol sm="4">{state.gender}</CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputPassword3"
                className="col-sm-2 col-form-label"
              >
                City
              </CFormLabel>
              <CCol sm="4">{props?.experience?.category || ""}</CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputEmail3"
                className="col-sm-2 col-form-label"
              >
                Duration
              </CFormLabel>
              <CCol sm="4">
                {state.time}
                {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputEmail3"
                className="col-sm-2 col-form-label"
              >
                Price
              </CFormLabel>
              <CCol sm="4">
                {state.price}
                {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputPassword3"
                className="col-sm-2 col-form-label"
              >
                Language
              </CFormLabel>
              <CCol sm="4">{state.language}</CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputPassword3"
                className="col-sm-2 col-form-label"
              >
                Requirements For Attending
              </CFormLabel>
              <CCol sm="4">{state.tools_ar}</CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputPassword3"
                className="col-sm-2 col-form-label"
              >
                What Do You Provide For Attendees In The Experience?
              </CFormLabel>
              <CCol sm="4">{state.pre_requisition_ar}</CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputPassword3"
                className="col-sm-2 col-form-label"
              >
                Location Description
              </CFormLabel>
              <CCol sm="4">{state.location_desc_ar}</CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputPassword3"
                className="col-sm-2 col-form-label"
              >
                Online?
              </CFormLabel>
              <CCol sm="4">
                <CheckBox />
                <span style={{ marginLeft: 20, fontSize: 12 }}>Online</span>
              </CCol>
              {/* <CFormCheck type="checkbox" id="gridCheck1" label="Example checkbox" /> */}
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputPassword3"
                className="col-sm-2 col-form-label"
              >
                Background Image
              </CFormLabel>
              <CCol sm="4">
                <img
                  style={{ width: 200 }}
                  src={
                    state.img_background?.search("amazonaws") !== -1
                      ? state.img_background
                      : `http://18.217.187.206/img/course_img/${
                          state.img_background
                            ? state.img_background.toLowerCase()
                            : ""
                        }`
                  }
                />
              </CCol>

              {/* <CFormCheck type="checkbox" id="gridCheck1" label="Example checkbox" /> */}
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputPassword3"
                className="col-sm-2 col-form-label"
              >
                Location
              </CFormLabel>
              <CCol sm="3">
                <CRow style={{}} className="mb-5">
                  <CFormLabel
                    htmlFor="inputPassword3"
                    className="col-sm-4 col-form-label"
                  >
                    Lat:
                  </CFormLabel>
                  <CFormLabel
                    htmlFor="inputPassword3"
                    className="col-sm-9 col-form-label"
                  >
                    {state.latitude}
                  </CFormLabel>
                </CRow>
              </CCol>
              <CCol sm="3">
                <CRow className="mb-5">
                  <CFormLabel
                    htmlFor="inputPassword3"
                    className="col-sm-4 co l-form-label"
                  >
                    Lng:
                  </CFormLabel>
                  <CFormLabel
                    htmlFor="inputPassword3"
                    className="col-sm-9 col-form-label"
                  >
                    {state.longitude}
                  </CFormLabel>
                </CRow>
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
    </>
  );
};

Category.propTypes = {
  UpdateExperience: PropTypes.func,
  GetCategories: PropTypes.func,
  GetCities: PropTypes.func,
  GetExperienceById: PropTypes.func,
  token: PropTypes.string,
  isLoading: PropTypes.bool,
  history: PropTypes.object,
  match: PropTypes.object,
  experience: PropTypes.object,
  categories: PropTypes.array,
  cities: PropTypes.array,
};

const mapStateToProp = (state) => ({
  isLoading: state.ExperienceReducer.isLoading,
  token: state.AuthReducer.token,
  experience: state.ExperienceReducer.experience,
  categories: state.CategoryReducer.categories,
  cities: state.CityReducer.cities,
  // userData: state.AuthReducer.userData,
});

const mapDispatchToProps = {
  GetCategories: CategoryAction.GetAllCategories,
  GetCities: CityAction.GetAllCities,
  GetExperienceById: ExperienceAction.GetExperienceById,
  UpdateExperience: ExperienceAction.UpdateExperience,
};

export default connect(mapStateToProp, mapDispatchToProps)(Category);
