import PropTypes from "prop-types";
import React, { useEffect, useState, createRef } from "react";
import classNames from "classnames";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CFormControl,
  CForm,
  CFormLabel,
  CButton,
  CFormCheck,
  CSpinner,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { DatePicker, Space } from "antd";
import { DocsLink } from "src/reusable";
import {
  CategoryAction,
  BookingAction,
  UserAction,
  ExperienceAvailibilityAction,
  GiftsAction,
} from "src/redux-store/actions";
const { RangePicker } = DatePicker;
import { connect } from "react-redux";
import swal from "sweetalert";
import Sortedtable from "../../components/sortedtables";
import moment from "moment";

const Category = (props) => {
  const [catBooking, setCategories] = useState([]);
  const [state, setState] = useState({
    finances: [],
    startDate: "",
    endDate: "",
    loader: false,
    invoiceDetail: false,
  });

  function onChange(date, dates) {
    setState({
      ...state,
      startDate: dates[0],
      endDate: dates[1],
    });
  }

  const Search = () => {
    if (props.token) {
      if (state.startDate?.length > 0 && state.endDate?.length > 0) {
        props.GetAllFinance(props.token, {
          from: state.startDate,
          to: state.endDate,
        });
      }
    }
  };
  useEffect(() => {
    _setFinances();
  }, [props.finances]);
  const onDone = (item) => {
    setState({
      ...state,
      invoiceDetail: item,
      finances: props.finances
        ? props.finances.map((item, i) => {
            console.log("itemmmmm", item);
            let { start_date, email, first_name, last_name } = item;
            return {
              ...item,
              no: String(i + 1).length == 1 ? `0${i + 1}` : i + 1,
              full_name: first_name + " " + last_name,
              start_date: moment(start_date).format("yy-MM-DD"),
              email: <p style={{ color: "#309CE4" }}>{email}</p>,
              action: (
                <div>
                  <span
                    onClick={() => onDone(item)}
                    style={{
                      color: "#309CE4",
                      fontSize: 12,
                      cursor: "pointer",
                    }}
                  >
                    Create Invoice
                  </span>
                </div>
              ),
            };
          })
        : [],
    });
  };
  const _setFinances = () => {
    setState({
      ...state,
      finances: props.finances
        ? props.finances.map((item, i) => {
            console.log("itemmmmm", item);
            let { start_date, email, first_name, last_name } = item;
            return {
              ...item,
              no: String(i + 1).length == 1 ? `0${i + 1}` : i + 1,
              full_name: first_name + " " + last_name,
              start_date: moment(start_date).format("yy-MM-DD"),
              email: <p style={{ color: "#309CE4" }}>{email}</p>,
              action: (
                <div>
                  <span
                    onClick={() => onDone(item)}
                    style={{
                      color: "#309CE4",
                      fontSize: 12,
                      cursor: "pointer",
                    }}
                  >
                    Create Invoice
                  </span>
                </div>
              ),
            };
          })
        : [],
    });
  };

  return (
    <>
      <CCard
        className="mb-4"
        style={{
          fontWeight: "bold",
          overflowY: "scroll",
          background: "white",
          width: "100%",
        }}
      >
        <CCardHeader>Finance</CCardHeader>
        <CForm>
          <CRow className="mb-3 col-sm-12">
            <CFormLabel
              // htmlFor="inputEmail3"
              className="col-sm-3  col-form-label"
            >
              Select Date Range
            </CFormLabel>
            <CCol sm="8">
              <RangePicker onChange={onChange} />
            </CCol>
          </CRow>
          <CRow className="mb-3 col-sm-12">
            <CCol sm="2">
              <CButton
                onClick={Search}
                disabled={state.loading || props.isLoading}
                style={{ color: "white", fontSize: 12 }}
                color={"info"}
                shape="rounded-0"
              >
                Search
              </CButton>
            </CCol>
          </CRow>
        </CForm>
        {state.invoiceDetail && (
          <CForm>
            <CRow className=" col-sm-12">
              <CCol sm="6"></CCol>
              <CCol sm="6">
                <CRow className=" col-sm-12">
                  <CFormLabel
                    htmlFor="inputEmail3"
                    className="col-sm-4 col-form-label"
                    style={{ border: "1px solid black" }}
                  >
                    Issue Date:
                  </CFormLabel>
                  <CCol
                    style={{ border: "1px solid black", borderLeft: "0px" }}
                    sm="8"
                  >
                    <CFormLabel className=" col-form-label">
                      {moment(state?.invoiceDetail?.created_at).format(
                        "yy-MM-DD"
                      )}
                    </CFormLabel>
                  </CCol>
                </CRow>
                <CRow className=" col-sm-12">
                  <CFormLabel
                    htmlFor="inputEmail3"
                    className="col-sm-4 col-form-label"
                    style={{ border: "1px solid black", borderTop: "0px" }}
                  >
                    Booking Period:
                  </CFormLabel>
                  <CCol
                    style={{
                      border: "1px solid black",
                      borderLeft: "0px",
                      borderTop: "0px",
                    }}
                    sm="8"
                  >
                    <CFormLabel className=" col-form-label">
                      From:{" "}
                      {moment(state?.invoiceDetail?.start_date).format(
                        "yy-MM-DD"
                      )}
                    </CFormLabel>
                    <br />
                    <CFormLabel className=" col-form-label">
                      To:{" "}
                      {moment(state?.invoiceDetail?.end_date).format(
                        "yy-MM-DD"
                      )}
                    </CFormLabel>
                  </CCol>
                </CRow>
                <CRow className=" col-sm-12">
                  <CFormLabel
                    htmlFor="inputEmail3"
                    className="col-sm-4 col-form-label"
                    style={{ border: "1px solid black", borderTop: "0px" }}
                  >
                    Client Information:
                  </CFormLabel>
                  <CCol
                    style={{
                      border: "1px solid black",
                      borderLeft: "0px",
                      borderTop: "0px",
                    }}
                    sm="8"
                  >
                    <CFormLabel className=" col-form-label">
                      {state?.invoiceDetail?.first_name}
                    </CFormLabel>
                    <br />
                    <CFormLabel className=" col-form-label">
                      Mobile: {state?.invoiceDetail?.mobile}
                    </CFormLabel>
                    <br />
                    <CFormLabel className=" col-form-label">
                      Bank: {state?.invoiceDetail?.Bank_name}
                    </CFormLabel>
                    <br />
                    <CFormLabel className=" col-form-label">
                      IBAN: {state?.invoiceDetail?.IBAN}
                    </CFormLabel>
                    <br />
                    <CFormLabel className=" col-form-label">
                      Full Name:{" "}
                      {state?.invoiceDetail?.first_name +
                        " " +
                        state?.invoiceDetail?.last_name}
                    </CFormLabel>
                    <br />
                    <CFormLabel className=" col-form-label">
                      Email: {state?.invoiceDetail?.email}
                    </CFormLabel>
                  </CCol>
                </CRow>
              </CCol>
            </CRow>
          </CForm>
        )}
        <Sortedtable
          dataArray={state.finances}
          columns={[
            {
              label: "S.No",
              field: "no",
              sort: "asc",
              width: 150,
            },
            {
              label: "Customer Name",
              field: "full_name",
              sort: "asc",
              width: 270,
            },
            {
              label: "Session Date",
              field: "start_date",
              sort: "asc",
              width: 270,
            },
            {
              label: "Quantity",
              field: "qty",
              sort: "asc",
              width: 270,
            },

            {
              label: "Action",
              field: "action",
              sort: "asc",
              width: 100,
            },
          ]}
        />
      </CCard>
    </>
  );
};

Category.propTypes = {
  GetAllFinance: PropTypes.func,
  DeleteBooking: PropTypes.func,
  token: PropTypes.string,
  isLoading: PropTypes.bool,
  history: PropTypes.object,
  finances: PropTypes.array,
};

const mapStateToProp = (state) => ({
  isLoading: state.BookingsReducer.isLoading,
  token: state.AuthReducer.token,
  finances: state.BookingsReducer.finances,

  // userData: state.AuthReducer.userData,
});

const mapDispatchToProps = {
  GetAllFinance: BookingAction.GetAllFinance,
  // DeleteBooking: BookingAction.DeleteBooking,
};

export default connect(mapStateToProp, mapDispatchToProps)(Category);
