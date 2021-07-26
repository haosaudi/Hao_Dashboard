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
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { DocsLink } from "src/reusable";
import {
  CategoryAction,
  couponAction,
  CouponAction,
} from "src/redux-store/actions";
import { connect } from "react-redux";
import { ImageUpload } from "src/utils/api_calls";
import { missingFieldsCheckOut } from "src/utils/globalFunction";
import { toast } from "react-toastify";
import moment from "moment-timezone";
const Category = (props) => {
  const [state, setState] = useState({
    coupon_code: "",
    coupon_type: "",
    amount: "",
    amount_type: "",
    expiry_date: new Date(),
    balance_note: "",
  });
  const [status, setStatus] = useState(false);
  useEffect(() => {
    if (props.token) {
      if (props.match?.params?.id) {
        props.GetCouponById(props.match?.params?.id, props.token);
      } else {
        props.history.push("/coupon");
      }
    }
  }, []);
  useEffect(() => {
    if (props.coupon) {
      let { coupon } = props;
      setState({
        ...state,
        coupon_code: coupon.coupon_code,
        coupon_type: coupon.coupon_type,
        amount: coupon.amount,
        amount_type: coupon.amount_type,
        expiry_date: new Date(coupon.expiry_date),
        balance_note: coupon.balance_note,
      });
      document.getElementById("amount_type").value = coupon.amount_type;
      document.getElementById("coupon_type").value = coupon.coupon_type;
    }
  }, [props.coupon]);

  const EditCoupon = async () => {
    let data = { ...state };
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
      props.UpdateCoupon(
        props.match?.params?.id,
        { ...data, expiry_date: moment(data.expiry_date).format("yy-MM-DD") },
        props.token,
        props.history
      );
    }
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
              Edit Category
            </CCol>
            <CCol style={{ display: "flex", justifyContent: "flex-end" }}>
              <CButton
                onClick={EditCoupon}
                disabled={state.loading || props.isLoading}
                style={{ color: "white", fontSize: 12 }}
                color={"info"}
                shape="rounded-0"
              >
                Edit
              </CButton>
              &nbsp; &nbsp;
              <CButton
                onClick={() => props.history.push("/coupon")}
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
                Coupon Code
              </CFormLabel>
              <CCol sm="4">
                <CFormControl
                  onChange={(e) =>
                    setState({ ...state, coupon_code: e.target.value })
                  }
                  placeholder="Coupon Code"
                  value={state.coupon_code}
                  type="email"
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
                Coupon Level
              </CFormLabel>
              <CCol sm="4">
                <CFormSelect
                  id="coupon_type"
                  onChange={(e) => {
                    setState({ ...state, coupon_type: e.target.value });
                  }}
                  aria-label="Default select example"
                >
                  <option>Coupon Level</option>
                  <option value="Website">Website</option>
                  <option value="Experience">Experience</option>
                  <option value="UserExp">UserExp</option>
                </CFormSelect>
                {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputEmail3"
                className="col-sm-2 col-form-label"
              >
                Amount
              </CFormLabel>
              <CCol sm="4">
                <CFormControl
                  value={state.amount}
                  onChange={(e) => {
                    if (e.target.value >= 0)
                      setState({ ...state, amount: e.target.value });
                  }}
                  placeholder="Amount"
                  type="number"
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
                Amount Type
              </CFormLabel>
              <CCol sm="4">
                <CFormSelect
                  id="amount_type"
                  onChange={(e) => {
                    setState({ ...state, amount_type: e.target.value });
                  }}
                  aria-label="Default select example"
                >
                  <option>Amount Type</option>
                  <option value="Fixed">Fixed</option>
                  <option value="Percentage">Percentage</option>
                </CFormSelect>
                {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputEmail3"
                className="col-sm-2 col-form-label"
              >
                Expiry Date
              </CFormLabel>
              <CCol sm="4">
                <DatePicker
                  selected={state.expiry_date}
                  onChange={(date) => setState({ ...state, expiry_date: date })}
                />
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputPassword3"
                className="col-sm-2 col-form-label"
              >
                Single Use?
              </CFormLabel>
              <CCol sm="4">
                <CFormCheck
                  // onChange={(e) => {
                  //   setStatus(e.target.checked);
                  // }}
                  type="checkbox"
                  id="gridCheck1"
                  label=""
                />
              </CCol>
              {/* <CFormCheck type="checkbox" id="gridCheck1" label="Example checkbox" /> */}
            </CRow>

            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputEmail3"
                className="col-sm-2 col-form-label"
              >
                Note
              </CFormLabel>
              <CCol sm="4">
                <CFormControl
                  onChange={(e) =>
                    setState({ ...state, balance_note: e.target.value })
                  }
                  component="textarea"
                  id="validationTextarea"
                  value={state.balance_note}
                  // placeholder="Required example textarea"
                  // invalid
                  // required
                ></CFormControl>
                {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
    </>
  );
};

Category.propTypes = {
  UpdateCoupon: PropTypes.func,
  GetCouponById: PropTypes.func,
  token: PropTypes.string,
  isLoading: PropTypes.bool,
  history: PropTypes.object,
  match: PropTypes.object,
  coupon: PropTypes.object,
};

const mapStateToProp = (state) => ({
  isLoading: state.AuthReducer.isLoading,
  token: state.AuthReducer.token,
  coupon: state.CouponReducer.coupon,
  // userData: state.AuthReducer.userData,
});

const mapDispatchToProps = {
  GetCouponById: CouponAction.GetCouponById,
  UpdateCoupon: CouponAction.UpdateCoupon,
};

export default connect(mapStateToProp, mapDispatchToProps)(Category);
