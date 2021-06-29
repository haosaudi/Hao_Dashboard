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
import {
  CategoryAction,
  CityAction,
  ProviderApprovalAction,
} from "src/redux-store/actions";
import { connect } from "react-redux";
import swal from "sweetalert";
import moment from "moment";

const ProviderApproval = (props) => {
  const providerApprovalTableHeading = [
    "Requested Users",
    "Email",
    "Mobile",
    "City",
    "Category",
    "Requested Date",
    "Requested Status",
    "Action",
  ];

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (props.token) {
      props.GetRequests(props.token);
    }
  }, []);
  useEffect(() => {
    setRequests(props.requests);
  }, [props.requests]);
  const deleteRequest = (i, id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this request!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Poof! Your request has been deleted!", {
          icon: "success",
        });
        props.DeleteRequest(id, props.token);
        setRequests(requests.filter((item, ind) => ind !== i));
      } else {
        swal("Your request is safe!");
      }
    });
  };
  return (
    <>
      {console.log("I GOT THE CATEGORIES", props.requests)}
      <CCard className="mb-4">
        <CCardHeader style={{ fontWeight: "bold" }}>Requests </CCardHeader>
        <CCardBody>
          <CTable caption="top">
            <CTableCaption>List of Requests</CTableCaption>
            <CTableHead>
              <CTableRow>
                {providerApprovalTableHeading.map((val, index) => (
                  <CTableHeaderCell key={index} scope="col">
                    {val}
                  </CTableHeaderCell>
                ))}
                {/* <CTableHeaderCell scope="col">Class</CTableHeaderCell>
                <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
                <CTableHeaderCell scope="col">Heading</CTableHeaderCell> */}
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {requests?.length > 0
                ? requests?.map((val, index) => (
                  <CTableRow key={index}>
                    <CTableHeaderCell scope="row">
                      {val.first_name + " " + val.last_name}
                    </CTableHeaderCell>
                    <CTableDataCell>{val.email}</CTableDataCell>
                    <CTableDataCell>{val.mobile}</CTableDataCell>
                    <CTableDataCell>{val.city}</CTableDataCell>
                    <CTableDataCell>{val.category}</CTableDataCell>
                    <CTableDataCell>
                      {moment(val.created_at).format("yy-MM-DD")}
                    </CTableDataCell>
                    <CTableDataCell
                      style={{
                        color:
                          val.req_status == "Requested"
                            ? "#79D363"
                            : val.req_status == "Approved"
                              ? "#67B5E9"
                              : "#E53452",
                      }}
                    >
                      {val.req_status}
                    </CTableDataCell>
                    <CTableDataCell
                    // style={{ color: '#309CE4', fontSize: 12, cursor: 'pointer' }}
                    >
                      <span
                        onClick={() =>
                          props.history.push(`/request/edit/${val.id}`)
                        }
                        style={{
                          color: "#309CE4",
                          fontSize: 12,
                          cursor: "pointer",
                        }}
                      >
                        Edit
                      </span>
                      <span
                        onClick={() => {
                          deleteRequest(index, val.id);
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
                : null}

              {/* <CTableRow>
                <CTableHeaderCell scope="row">2</CTableHeaderCell>
                <CTableDataCell>Jacob</CTableDataCell>
                <CTableDataCell>Thornton</CTableDataCell>
                <CTableDataCell>@fat</CTableDataCell>
              </CTableRow>
              <CTableRow> */}
              {/* <CTableHeaderCell scope="row">3</CTableHeaderCell>
                <CTableDataCell>Larry</CTableDataCell>
                <CTableDataCell>the Bird</CTableDataCell>
                <CTableDataCell>@twitter</CTableDataCell>
              </CTableRow> */}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  );
};

ProviderApproval.propTypes = {
  GetRequests: PropTypes.func,
  DeleteRequest: PropTypes.func,
  token: PropTypes.string,
  isLoading: PropTypes.bool,
  history: PropTypes.object,
  requests: PropTypes.array,
};

const mapStateToProp = (state) => ({
  isLoading: state.ProviderApprovalReducer.isLoading,
  token: state.AuthReducer.token,
  requests: state.ProviderApprovalReducer.requests,
  // userData: state.AuthReducer.userData,
});

const mapDispatchToProps = {
  GetRequests: ProviderApprovalAction.GetAllProviderRequests,
  DeleteRequest: ProviderApprovalAction.DeleteProviderRequest,
};

export default connect(mapStateToProp, mapDispatchToProps)(ProviderApproval);
