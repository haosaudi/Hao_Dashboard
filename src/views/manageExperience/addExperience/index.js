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
import { DocsCallout, Example } from "src/reusable";
import {
  CategoryAction,
  CityAction,
  ExperienceAction,
} from "src/redux-store/actions";
import { connect } from "react-redux";
import { ImageUpload } from "src/utils/api_calls";
import { missingFieldsCheckOut } from "src/utils/globalFunction";
import GoogleMapReact from "google-map-react";
import { toast } from "react-toastify";
import { Button } from "antd";

const Category = (props) => {
  const [state, setState] = useState({
    title_ar: "",
    description_ar: "",
    img_background: "",
    category_id: "",
    gender: "Male",
    time: "",
    price: "",
    language: "Arabic",
    city_id: "",
    experience_link: "",
    status: 1,
    entrance_img: "",
    pre_requisition_ar: "",
    tools_ar: "",
    location_desc_ar: "",
    online: false,
    longitude: "",
    latitude: "",
    loading: false,
  });
  const [coords, setCoords] = useState({ lat: 24.62565, lng: 56.7821736 });
  useEffect(() => {
    if (props.cities.length > 0) {
      setState({ ...state, city_id: props.cities[0].id });
    }
    if (props.categories.length > 0) {
      setState({ ...state, category_id: props.categories[0].id });
    }
  }, [props.cities, props.categories]);
  const imageUpload = async (file, key) => {
    setState({ ...state, loading: true });
    let data = new FormData();
    data.append("photo", file);
    let imageData = await ImageUpload(data, props.token);
    if (imageData.success) {
      setState({
        ...state,
        [key ? key : "img_background"]: imageData?.data?.location,
        loading: false,
      });
    } else {
      setState({ ...state, loading: false });
    }
    // setState({ ...state, loading: false })
    console.log("imageData", imageData);
  };
  const AddExperience = async () => {
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
      props.AddExperience(
        {
          ...data,
          online: state.online ? 1 : 0,
          slug: state.title_ar,
        },
        props.token,
        props.history
      );
    }
  };

  const CheckBox = () => (
    <CFormCheck
      id="enabled"
      defaultChecked={state.online}
      style={{ marginLeft: 0 }}
      onChange={(e) => {
        setState({ ...state, online: e.target.checked });
      }}
      type="checkbox"
      id="gridCheck1"
      label=""
    />
  );
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
                onClick={AddExperience}
                disabled={state.loading || props.isLoading}
                style={{ color: "white", fontSize: 12 }}
                color={"info"}
                shape="rounded-0"
              >
                Add
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
                  placeholder="Duration"
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
                Experience Link
              </CFormLabel>
              <CCol sm="4">
                <CFormControl
                  onChange={(e) =>
                    setState({ ...state, experience_link: e.target.value })
                  }
                  placeholder="Experience Link"
                  value={state.experience_link}
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
                Price
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
                Enabled
              </CFormLabel>
              <CCol sm="4">
                <CFormCheck
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                  onChange={(e) => {
                    setState({ ...state, status: 1 });
                  }}
                  defaultChecked
                  label="Enabled"
                />
                <CFormCheck
                  type="radio"
                  name="flexRadioDefault"
                  onChange={(e) => {
                    setState({ ...state, status: 0 });
                  }}
                  id="flexRadioDefault2"
                  label="Disabled"
                />
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
                <>
                  <CCol sm="2">Uploaded</CCol>
                  <img
                    style={{ width: 150 }}
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
                </>
              ) : null}

              {/* <CFormCheck type="checkbox" id="gridCheck1" label="Example checkbox" /> */}
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputPassword3"
                className="col-sm-2 col-form-label"
              >
                Entrance Image
              </CFormLabel>
              <CCol sm="4">
                <CFormControl
                  onChange={(e) => {
                    imageUpload(e.target.files[0], "entrance_img");
                  }}
                  type="file"
                  id="formFile"
                />
              </CCol>
              {state.loading ? (
                <CCol sm="2">
                  <CSpinner style={{ height: 25, width: 25 }} />
                </CCol>
              ) : state.entrance_img?.length > 0 ? (
                <>
                  <CCol sm="2">Uploaded</CCol>
                  <img
                    style={{ width: 150 }}
                    src={
                      state.entrance_img?.search("amazonaws") !== -1
                        ? state.entrance_img
                        : `http://18.217.187.206/img/course_img/${
                            state.entrance_img
                              ? state.entrance_img.toLowerCase()
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
              <CCol sm="3">
                <CRow className="mb-3">
                  <Button
                    onClick={() => {
                      setCoords({
                        lat: Number(state.latitude),
                        log: Number(state.longitude),
                      });
                    }}
                    style={{
                      width: 150,
                      background: "lightblue",
                      marginTop: 5,
                    }}
                  >
                    SEE IN THE MAP
                  </Button>
                </CRow>
              </CCol>
              {/* <div style={{ height: 200, width: 200 }}> */}
              <CCard
                style={{
                  height: 400,
                  width: 400,
                }}
                className="mb-12"
              >
                <GoogleMapReact
                  bootstrapURLKeys={{
                    key: "AIzaSyDxdw0CuRwe3cw-1t8bIHfvLsF1Qi4X5Yk",
                  }}
                  style={{ height: 200, width: 200 }}
                  defaultCenter={{ ...coords }}
                  defaultZoom={12}
                ></GoogleMapReact>
              </CCard>
              {/* </div> */}
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
    </>
  );
};

Category.propTypes = {
  AddExperience: PropTypes.func,
  token: PropTypes.string,
  isLoading: PropTypes.bool,
  history: PropTypes.object,
  categories: PropTypes.array,
  cities: PropTypes.array,
};

const mapStateToProp = (state) => ({
  isLoading: state.ExperienceReducer.isLoading,
  token: state.AuthReducer.token,
  categories: state.CategoryReducer.categories,
  cities: state.CityReducer.cities,
  // userData: state.AuthReducer.userData,
});

const mapDispatchToProps = {
  GetCategories: CategoryAction.GetAllCategories,
  GetCities: CityAction.GetAllCities,
  GetCategories: CategoryAction.GetAllCategories,
  AddExperience: ExperienceAction.AddExperience,
};

export default connect(mapStateToProp, mapDispatchToProps)(Category);
