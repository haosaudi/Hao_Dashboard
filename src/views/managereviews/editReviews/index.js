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
import { CategoryAction, ReviewsAction } from "src/redux-store/actions";
import { connect } from "react-redux";
import { ImageUpload } from "src/utils/api_calls";
import { missingFieldsCheckOut } from "src/utils/globalFunction";
import { toast } from "react-toastify";
const review = (props) => {
  const [state, setState] = useState({
    name_ar: "",
    description_ar: "",
    img: "",
    loading: false,
    reviewStatus: false,
  });
  const [status, setStatus] = useState(false);
  useEffect(() => {
    if (props.token) {
      if (props.match?.params?.id) {
        props.GetReviewById(props.match?.params?.id, props.token);
      } else {
        props.history.push("/reviews");
      }
    }
  }, []);
  useEffect(() => {
    if (props.review) {
      let { review } = props;
      console.log("props.review", props?.review?.status);
      setState({
        ...state,

        reviewStatus: props.review.status,
      });
      // console.log(review.status == 1);
      // // if (document.getElementById("gridCheck1")) {
      // document.getElementById("gridCheck1").setAttribute("checked", true);
      // // }

      // setStatus(review.status == 1);
    }
  }, [props.review]);

  const EditReview = async () => {
    props.UpdateReviews(
      props.match?.params?.id,
      { status: state.reviewStatus },
      props.token,
      props.history
    );
  };

  const CheckBox = () => {
    return (
      <CForm>
        <CRow className="mb-3">
          <CFormLabel
            htmlFor="inputPassword3"
            className="col-sm-2 col-form-label"
          >
            Status
          </CFormLabel>
          <CCol sm="4">
            <CFormCheck
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              onChange={(e) => {
                setState({ ...state, reviewStatus: 1 });
              }}
              defaultChecked={state.reviewStatus == 1}
              label="Enabled"
            />
            <CFormCheck
              type="radio"
              name="flexRadioDefault"
              onChange={(e) => {
                setState({ ...state, reviewStatus: 0 });
              }}
              defaultChecked={state.reviewStatus == 0}
              id="flexRadioDefault2"
              label="Disabled"
            />
          </CCol>
          {/* <CFormCheck type="checkbox" id="gridCheck1" label="Example checkbox" /> */}
        </CRow>
      </CForm>
    );
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
              Edit Review
            </CCol>
            <CCol style={{ display: "flex", justifyContent: "flex-end" }}>
              <CButton
                onClick={EditReview}
                disabled={state.loading || props.isLoading}
                style={{ color: "white", fontSize: 12 }}
                color={"info"}
                shape="rounded-0"
              >
                Edit
              </CButton>
              &nbsp; &nbsp;
              <CButton
                onClick={() => props.history.push("/reviews")}
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
          <CheckBox />
        </CCardBody>
      </CCard>
    </>
  );
};

review.propTypes = {
  UpdateReviews: PropTypes.func,
  GetReviewById: PropTypes.func,
  token: PropTypes.string,
  isLoading: PropTypes.bool,
  history: PropTypes.object,
  match: PropTypes.object,
  review: PropTypes.object,
};

const mapStateToProp = (state) => ({
  isLoading: state.AuthReducer.isLoading,
  token: state.AuthReducer.token,
  review: state.ReviewsReducer.review,
  // userData: state.AuthReducer.userData,
});

const mapDispatchToProps = {
  GetReviewById: ReviewsAction.GetReviewById,
  UpdateReviews: ReviewsAction.UpdateReviews,
};

export default connect(mapStateToProp, mapDispatchToProps)(review);
