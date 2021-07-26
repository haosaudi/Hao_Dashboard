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
    // title_ar: "",
    // description_ar: "",
    // course_file: "",
    // category_id: "",
    // gender: "",
    // time: "",
    // price: "",
    // language: "",
    // city_id: "",
    // pre_requisition_ar: "",
    // tools_ar: "",
    // location_desc_ar: "",
    // online: false,
    // longitude: "",
    // latitude: "",
    course_files: [],
    course_file: "",
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

        course_files: experience.course_files,
      });
    }
  }, [props.experience]);

  // const CheckBox = () => (
  //   <CFormCheck
  //     defaultChecked={state.online}
  //     style={{ marginLeft: 0 }}
  //     onChange={(e) => {
  //       setState({ ...state, online: e.target.checked });
  //     }}
  //     type="checkbox"
  //     id="gridCheck1"
  //     label=""
  //     disabled
  //   />
  // );

  const imageUpload = async (file, key) => {
    setState({ ...state, loading: true });
    let data = new FormData();
    data.append("photo", file);
    let imageData = await ImageUpload(data, props.token);
    if (imageData.success) {
      setState({
        ...state,
        course_file: imageData?.data?.location,
        loading: false,
      });
    } else {
      setState({ ...state, loading: false });
    }
    // setState({ ...state, loading: false })
    console.log("imageData", imageData);
  };

  const addInToExperience = () => {
    props.AddExperienceFile(
      {
        filename: state.course_file,
        type: "png",
        course_id: props.match?.params?.id,
      },
      props.token
    );
    setState({
      ...state,
      course_files: [...state.course_files, { filename: state.course_file }],
      course_file: "",
    });
    console.log("CHECKING DATA", state);
  };

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
              <CFormLabel
                htmlFor="inputPassword3"
                className="col-sm-2 col-form-label"
              >
                Background Image
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
              ) : state.course_file?.length > 0 ? (
                <>
                  <CCol sm="2">Uploaded</CCol>
                  <img
                    style={{ width: 150 }}
                    src={
                      state.course_file?.search("amazonaws") !== -1
                        ? state.course_file
                        : `http://18.217.187.206/img/course_img/${
                            state.course_file
                              ? state.course_file.toLowerCase()
                              : ""
                          }`
                    }
                  />
                </>
              ) : null}

              {/* <CFormCheck type="checkbox" id="gridCheck1" label="Example checkbox" /> */}
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CButton
                  disabled={state.course_file.length == 0}
                  onClick={addInToExperience}
                  style={{ color: "white", fontSize: 12 }}
                  color={"dark"}
                  shape="rounded-0"
                >
                  ADD IN TO FILE
                </CButton>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              {state?.course_files?.length > 0 ? (
                state?.course_files.map((val) => (
                  <CCol md="6" sm="8">
                    <CCard style={{ width: "18rem", marginTop: 20 }}>
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
  AddExperienceFile: PropTypes.func,
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
  AddExperienceFile: ExperienceAction.AddExperienceFile,
};

export default connect(mapStateToProp, mapDispatchToProps)(Category);
