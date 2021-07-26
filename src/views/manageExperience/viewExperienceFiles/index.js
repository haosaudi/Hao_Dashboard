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
  CCardImage,
  CCardTitle,
  CCardText,
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
              View Experience Files
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
              <CCol>
                <CButton
                  disabled={true}
                  onClick={() => props.history.push("/experience")}
                  style={{ color: "white", fontSize: 12 }}
                  color={"dark"}
                  shape="rounded-0"
                >
                  ADD IN TO FILE
                </CButton>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              {props?.experience?.course_files?.length > 0 ? (
                props?.experience?.course_files.map((val) => (
                  <CCol md="6" sm="8">
                    <CCard style={{ width: "18rem", marginTop: 20 }}>
                      {/* <CCardImage
                        component="svg"
                        orientation="top"
                        className="docs-placeholder-img"
                        width="100%"
                        height="180"
                        xmlns={`https://www.haosaudi.com/img/course_img/${val.filename}`}
                        role="img"
                        aria-label="Placeholder: Image cap"
                        preserveAspectRatio="xMidYMid slice"
                        focusable="false"
                      > */}
                      <img
                        style={{ width: "100%", height: "100%" }}
                        src={
                          val.filename?.search("https") !== -1
                            ? val.filename
                            : `https://www.haosaudi.com/img/course_img/${val.filename}`
                        }
                      />
                      {/* </CCardImage> */}
                    </CCard>
                  </CCol>
                ))
              ) : (
                <CCol>NO EXPERIENCE FILES</CCol>
              )}
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
