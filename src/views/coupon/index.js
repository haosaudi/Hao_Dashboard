import PropTypes from "prop-types";
import React, { useEffect, useState, createRef } from "react";
import classNames from "classnames";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { DocsLink } from "src/reusable";
import { CategoryAction, CityAction } from "src/redux-store/actions";
import { connect } from "react-redux";
import swal from "sweetalert";
import CouponAction from "src/redux-store/actions/coupon";
import moment from "moment";
import Sortedtable from "../../components/sortedtables";
const Category = (props) => {
  const categoryTableHeading = [
    "Booked By",
    "Coupon Level",
    "Amount",
    "Amount Type",
    "Expire Date",
    "Single Use?",
    "Enabled",
    "Action",
  ];

  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    if (props.token) {
      props.GetCoupons(props.token);
    }
  }, []);
  useEffect(() => {
    setCoupons(
      props.coupons.map((val, index) => {
        return {
          ...val,
          expiry_date: moment(val.expiry_date).format("DD-MM-yy"),
          created_at: moment(val.created_at).format("DD-MM-yy"),
          status: val.status == 1 ? "Enabled" : "Disabled",
          action: (
            <>
              <span
                onClick={() => {
                  DeleteCoupon(index, val.id);
                }}
                style={{
                  color: "red",
                  fontSize: 12,
                  cursor: "pointer",
                  paddingLeft: 5,
                }}
              >
                Delete
              </span>
              &nbsp;
              <span
                onClick={() => props.history.push(`/coupon/edit/${val.id}`)}
                style={{ color: "#309CE4", fontSize: 12, cursor: "pointer" }}
              >
                Edit
              </span>
            </>
          ),
        };
      })
    );
  }, [props.coupons]);
  const DeleteCoupon = (i, id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this coupon!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Poof! Your coupon has been deleted!", {
          icon: "success",
        });
        props.DeleteCoupon(id, props.token);
        setCoupons(coupons.filter((item, ind) => ind !== i));
      } else {
        swal("Your coupon is safe!");
      }
    });
  };
  return (
    <>
      {console.log("I GOT THE CATEGORIES", props.coupons)}
      <CCard className="mb-4">
        <CCardHeader style={{ fontWeight: "bold" }}>
          Coupons{" "}
          <span
            onClick={() => props.history.push("/coupon/add")}
            style={{
              fontSize: 12,
              fontWeight: "400",
              color: "#309CE4",
              textDecorationLine: "underline",
              cursor: "pointer",
            }}
          >
            Add New Coupons
          </span>
        </CCardHeader>
        <CCardBody>
          {/* <CTable caption="top">
            <CTableCaption>List of Coupons</CTableCaption>
            <CTableHead>
              <CTableRow>
                {categoryTableHeading.map((val, index) => (
                  <CTableHeaderCell key={index} scope="col">
                    {val}
                  </CTableHeaderCell>
                ))}
              </CTableRow>
            </CTableHead>
            <CTableBody> */}
          {/* {coupons?.length > 0
                ? coupons?.map((val, index) => (
                    <CTableRow key={index}>
                      <CTableHeaderCell scope="row">
                        {val.coupon_code}
                      </CTableHeaderCell>
                      <CTableDataCell>{val.coupon_type}</CTableDataCell>
                      <CTableDataCell>{val.amount}</CTableDataCell>
                      <CTableDataCell>{val.amount_type}</CTableDataCell>
                      <CTableDataCell>
                        {moment(val.expiry_date).format("DD-MM-yy")}
                      </CTableDataCell>
                      <CTableDataCell>{val.status}</CTableDataCell>
                      <CTableDataCell>{val.status}</CTableDataCell>
                      <CTableDataCell>
                        <span
                          onClick={() => {
                            DeleteCoupon(index, val.id);
                          }}
                          style={{
                            color: "red",
                            fontSize: 12,
                            cursor: "pointer",
                            paddingLeft: 5,
                          }}
                        >
                          Delete
                        </span>
                      </CTableDataCell>
                    </CTableRow>
                  ))
                : null} */}
          {/* </CTableBody>
          </CTable> */}
          {/* "Booked By",
    "Coupon Level",
    "Amount",
    "Amount Type",
    "Expire Date",
    "Single Use?",
    "Enabled",
    "Action", */}
          <Sortedtable
            dataArray={coupons}
            columns={[
              {
                label: "Coupon Code",
                field: "coupon_code",
                sort: "asc",
                width: 150,
              },
              {
                label: "Coupon Amount",
                field: "amount",
                sort: "asc",
                width: 270,
              },
              {
                label: "Coupon Amount Type",
                field: "amount_type",
                sort: "asc",
                width: 270,
              },
              {
                label: "Coupon Level",
                field: "coupon_type",
                sort: "asc",
                width: 270,
              },
              {
                label: "Used Count",
                field: "user",
                sort: "asc",
                width: 270,
              },

              {
                label: "Coupon Status",
                field: "status",
                sort: "asc",
                width: 270,
              },
              {
                label: "Created at",
                field: "created_at",
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
        </CCardBody>
      </CCard>
    </>
  );
};

Category.propTypes = {
  GetCoupons: PropTypes.func,
  DeleteCoupon: PropTypes.func,
  token: PropTypes.string,
  isLoading: PropTypes.bool,
  history: PropTypes.object,
  coupons: PropTypes.array,
};

const mapStateToProp = (state) => ({
  isLoading: state.AuthReducer.isLoading,
  token: state.AuthReducer.token,
  coupons: state.CouponReducer.coupons,
  // userData: state.AuthReducer.userData,
});

const mapDispatchToProps = {
  GetCoupons: CouponAction.GetAllCoupons,
  DeleteCoupon: CouponAction.DeleteCoupon,
};

export default connect(mapStateToProp, mapDispatchToProps)(Category);
