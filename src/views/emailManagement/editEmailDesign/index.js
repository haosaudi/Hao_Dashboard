import PropTypes from "prop-types";
import React, {
  useEffect,
  useState,
  createRef,
  useRef,
  useLayoutEffect,
} from "react";
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
  EmailAction,
  designAction,
} from "src/redux-store/actions";
import { connect } from "react-redux";
import { ImageUpload } from "src/utils/api_calls";
import { missingFieldsCheckOut } from "src/utils/globalFunction";
import { toast } from "react-toastify";
import EmailEditor from "react-email-editor";
const Category = (props) => {
  const [state, setState] = useState({
    status: false,
    email_type_no: 0,
  });
  const [status, setStatus] = useState(false);
  const emailEditorRef = useRef(null);
  useEffect(() => {
    if (props.token) {
      if (props.match?.params?.id) {
        props.GetEmailDesignById(props.match?.params?.id, props.token);
      } else {
        props.history.push("/email");
      }
    }
  }, []);

  const onLoad = () => {
    // you can load your template here;
    const templateJson = {};
  };
  useLayoutEffect(() => {
    if (props.design) {
      let { design } = props;
      if (design.body && design.counters) {
        setState({
          ...state,
          status: design?.status,
          email_type_no: String(design?.email_type_no),
          design: {
            body: JSON.parse(design.body),
            counters: JSON.parse(design.counters),
            schemaVersion: design.schema_version,
          },
          html: design.html,
        });
        document.getElementById(
          "emailType"
        ).value = design?.email_type_no?.toString();
        if (design.body && design.counters) {
          emailEditorRef?.current?.editor?.loadDesign({
            body: JSON.parse(design.body),
            counters: JSON.parse(design.counters),
            schemaVersion: design.schema_version,
          });

          setStatus(design.status == 1);
        }
      }
    }
  }, [props.design]);
  let emailTypes = {
    1: "Otp",
    2: "Booking 12 hour before",
    3: "Experience Review",
    4: "Slot Availibility",
    5: "Received Gift",
  };
  const EditDesign = async () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data;
      if (state.email_type_no.length > 0) {
        props.UpdateEmailDesign(
          props.match?.params?.id,
          {
            email_type: emailTypes[state.email_type_no],
            email_type_no: state.email_type_no,
            body: JSON.stringify(design.body),
            counters: JSON.stringify(design.counters),
            schema_version: design.schemaVersion,
            html,
            status: state.status ? 1 : 0,
          },
          props.token,
          props.history
        );
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
              Edit design
            </CCol>
            <CCol style={{ display: "flex", justifyContent: "flex-end" }}>
              <CButton
                onClick={EditDesign}
                disabled={state.loading || props.isLoading}
                style={{ color: "white", fontSize: 12 }}
                color={"info"}
                shape="rounded-0"
              >
                Edit
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
          <CForm>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputEmail3"
                className="col-sm-2 col-form-label"
              >
                Email Type
              </CFormLabel>
              <CCol sm="4">
                <CFormSelect
                  id="emailType"
                  onChange={(e) => {
                    setState({ ...state, email_type_no: e.target.value });
                  }}
                  aria-label="Default select example"
                >
                  <option>Email Type</option>

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

            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputPassword3"
                className="col-sm-2 col-form-label"
              >
                Active
              </CFormLabel>
              <CCol sm="4">
                <CheckBox />
              </CCol>
              {/* <CFormCheck type="checkbox" id="gridCheck1" label="Example checkbox" /> */}
            </CRow>
            <EmailEditor ref={emailEditorRef} onLoad={onLoad} />
          </CForm>
        </CCardBody>
      </CCard>
    </>
  );
};

Category.propTypes = {
  UpdateEmailDesign: PropTypes.func,
  GetCategories: PropTypes.func,
  GetCities: PropTypes.func,
  GetEmailDesignById: PropTypes.func,
  token: PropTypes.string,
  isLoading: PropTypes.bool,
  history: PropTypes.object,
  match: PropTypes.object,
  design: PropTypes.object,
  categories: PropTypes.array,
  cities: PropTypes.array,
};

const mapStateToProp = (state) => ({
  isLoading: state.EmailReducer.isLoading,
  token: state.AuthReducer.token,
  design: state.EmailReducer.design,
  categories: state.CategoryReducer.categories,
  cities: state.CityReducer.cities,
});

const mapDispatchToProps = {
  GetEmailDesignById: EmailAction.GetEmailDesignById,
  UpdateEmailDesign: EmailAction.UpdateEmailDesign,
};

export default connect(mapStateToProp, mapDispatchToProps)(Category);
