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
import { MyexperienceAction } from "src/redux-store/actions/providerActions";
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
        props.GetCategories(props.token);
        props.GetCities(props.token);
      } else {
        // props.history.push("/experience");
      }
    }
  }, []);
  useEffect(() => {
    if (props.experience) {
      let { experience } = props;
      console.log("experience.online===", experience.status);
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
        status: experience.status,
      });
      console.log(experience.status == 1);
      // if (document.getElementById("gridCheck1")) {
      document.getElementById("category").value = experience.category_id;
      document.getElementById("city").value = experience.city_id;
      document.getElementById("gender").value = experience.gender;
      document.getElementById("language").value = experience.language;
      // }

      setStatus(experience.status == 1);
    }
  }, [props.experience]);
  const imageUpload = async (file) => {
    setState({ ...state, loading: true });
    let data = new FormData();
    data.append("photo", file);
    let imageData = await ImageUpload(data, props.token);
    console.log("imageeeedata", imageData);
    if (imageData?.success) {
      setState({
        ...state,
        img_background: imageData?.data?.location,
        loading: false,
      });
    } else {
      setState({ ...state, loading: false });
    }
    console.log("imageData", imageData);
  };
  const EditExperience = async () => {
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
      props.UpdateExperience(
        props.match?.params?.id,
        { ...data, slug: state.name_ar, status: status ? 1 : 0 },
        props.token,
        props.history
      );
    }
  };

  const CheckBox = () => (
    <CFormCheck
      id="enabled"
      defaultChecked={state.status}
      style={{ marginLeft: 0 }}
      onChange={(e) => {
        setState({ ...state, status: e.target.checked });
      }}
      type="checkbox"
      id="gridCheck1"
      label=""
    />
  );

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <CRow>
            <CCol style={{ alignItems: "center", display: "flex" }}>
              Edit Experience
            </CCol>
            <CCol style={{ display: "flex", justifyContent: "flex-end" }}>
              <CButton
                onClick={EditExperience}
                disabled={state.loading || props.isLoading}
                style={{ color: "white", fontSize: 12 }}
                color={"info"}
                shape="rounded-0"
              >
                Edit
              </CButton>
              &nbsp; &nbsp;
              <CButton
                onClick={() => props.history.push("/myexperience")}
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
                Experience Name
              </CFormLabel>
              <CCol sm="4">
                <CFormControl
                  onChange={(e) =>
                    setState({ ...state, title_ar: e.target.value })
                  }
                  placeholder="Experience Name"
                  type="email"
                  value={state.title_ar}
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
                Experience Description
              </CFormLabel>
              <CCol sm="4">
                <CFormControl
                  onChange={(e) =>
                    setState({ ...state, description_ar: e.target.value })
                  }
                  component="textarea"
                  value={state.description_ar}
                  id="validationTextarea"
                  // placeholder="Required example textarea"
                  // invalid
                  // required
                ></CFormControl>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputPassword3"
                className="col-sm-2 col-form-label"
              >
                Category
              </CFormLabel>
              <CCol sm="4">
                <CFormSelect
                  id="category"
                  onChange={(e) => {
                    setState({ ...state, category_id: e.target.value });
                  }}
                  defaultValue={state.category_id}
                  aria-label="Default select example"
                >
                  {props.categories.map((val) => (
                    <option value={val.id}>{val.name_ar}</option>
                  ))}
                  {/* <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option> */}
                </CFormSelect>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputPassword3"
                className="col-sm-2 col-form-label"
              >
                Gender
              </CFormLabel>
              <CCol sm="4">
                <CFormSelect
                  id="gender"
                  onChange={(e) => {
                    setState({ ...state, gender: e.target.value });
                  }}
                  defaultValue={state.gender}
                  aria-label="Default select example"
                >
                  {["Male", "Female", "Both", "Kids"].map((val) => (
                    <option value={val}>{val}</option>
                  ))}
                  {/* <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option> */}
                </CFormSelect>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputPassword3"
                className="col-sm-2 col-form-label"
              >
                City
              </CFormLabel>
              <CCol sm="4">
                <CFormSelect
                  id="city"
                  onChange={(e) => {
                    setState({ ...state, city_id: e.target.value });
                  }}
                  defaultValue={state.city_id}
                  aria-label="Default select example"
                >
                  {props.cities.map((val) => (
                    <option value={val.id}>{val.name_ar}</option>
                  ))}
                  {/* <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option> */}
                </CFormSelect>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputEmail3"
                className="col-sm-2 col-form-label"
              >
                Duration
              </CFormLabel>
              <CCol sm="4">
                <CFormControl
                  onChange={(e) => setState({ ...state, time: e.target.value })}
                  placeholder="Experience Name"
                  type="number"
                  value={state.time}
                  id="inputEmail3"
                />
                {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputEmail3"
                className="col-sm-2 col-form-label"
              >
                Duration
              </CFormLabel>
              <CCol sm="4">
                <CInputGroup>
                  <CFormControl
                    onChange={(e) =>
                      setState({ ...state, price: e.target.value })
                    }
                    placeholder="Price"
                    value={state.price}
                    type="Number"
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                  />
                  <CInputGroupText id="basic-addon1">SAR</CInputGroupText>
                </CInputGroup>
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
              <CCol sm="4">
                <CFormSelect
                  id="language"
                  onChange={(e) => {
                    setState({ ...state, language: e.target.value });
                  }}
                  defaultValue={state.language}
                  aria-label="Default select example"
                >
                  {["Arabic", "English"].map((val) => (
                    <option value={val}>{val}</option>
                  ))}
                  {/* <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option> */}
                </CFormSelect>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputPassword3"
                className="col-sm-2 col-form-label"
              >
                Requirements For Attending
              </CFormLabel>
              <CCol sm="4">
                <CFormControl
                  onChange={(e) =>
                    setState({ ...state, tools_ar: e.target.value })
                  }
                  component="textarea"
                  value={state.tools_ar}
                  id="validationTextarea"
                  // placeholder="Required example textarea"
                  // invalid
                  // required
                ></CFormControl>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputPassword3"
                className="col-sm-2 col-form-label"
              >
                What Do You Provide For Attendees In The Experience?
              </CFormLabel>
              <CCol sm="4">
                <CFormControl
                  onChange={(e) =>
                    setState({ ...state, pre_requisition_ar: e.target.value })
                  }
                  component="textarea"
                  value={state.pre_requisition_ar}
                  id="validationTextarea"
                  // placeholder="Required example textarea"
                  // invalid
                  // required
                ></CFormControl>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputPassword3"
                className="col-sm-2 col-form-label"
              >
                Location Description
              </CFormLabel>
              <CCol sm="4">
                <CFormControl
                  onChange={(e) =>
                    setState({ ...state, location_desc_ar: e.target.value })
                  }
                  component="textarea"
                  value={state.location_desc_ar}
                  id="validationTextarea"
                  // placeholder="Required example textarea"
                  // invalid
                  // required
                ></CFormControl>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputPassword3"
                className="col-sm-2 col-form-label"
              >
                Online?
              </CFormLabel>
              <CCol sm="4">
                <CheckBox />{" "}
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
              ) : state.img_background?.length > 0 ? (
                <CCol sm="2">Uploaded</CCol>
              ) : null}

              {/* <CFormCheck type="checkbox" id="gridCheck1" label="Example checkbox" /> */}
            </CRow>
            <img
              src={state.img_background || ""}
              style={{ height: 40, width: 40 }}
            />
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputPassword3"
                className="col-sm-2 col-form-label"
              >
                Location
              </CFormLabel>
              <CCol sm="3">
                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="inputPassword3"
                    className="col-sm-4 col-form-label"
                  >
                    Lat:
                  </CFormLabel>
                  <CFormControl
                    onChange={(e) =>
                      setState({ ...state, latitude: e.target.value })
                    }
                    style={{ width: 180 }}
                    // component="textarea"
                    value={state.latitude}
                    id="validationTextarea"
                    // placeholder="Required example textarea"
                    // invalid
                    // required
                  ></CFormControl>
                </CRow>
              </CCol>
              <CCol sm="3">
                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="inputPassword3"
                    className="col-sm-4 col-form-label"
                  >
                    Lng:
                  </CFormLabel>
                  <CFormControl
                    onChange={(e) =>
                      setState({ ...state, longitude: e.target.value })
                    }
                    style={{ width: 180 }}
                    // component="textarea"
                    value={state.longitude}
                    id="validationTextarea"
                    // placeholder="Required example textarea"
                    // invalid
                    // required
                  ></CFormControl>
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
  experience: state.GetAllProviderReducer.experience,
  categories: state.CategoryReducer.categories,
  cities: state.CityReducer.cities,
  // userData: state.AuthReducer.userData,
});

const mapDispatchToProps = {
  GetCategories: CategoryAction.GetAllCategories,
  GetCities: CityAction.GetAllCities,
  GetExperienceById: MyexperienceAction.GetExperienceById,
  UpdateExperience: MyexperienceAction.UpdateExperience,
  CreateExpeirence: MyexperienceAction.CreateExpeirence,
};

export default connect(mapStateToProp, mapDispatchToProps)(Category);
