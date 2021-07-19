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
import { CategoryAction, ReviewsAction } from "src/redux-store/actions";
import { connect } from "react-redux";
import swal from "sweetalert";
import moment from "moment";

const Category = (props) => {
  const categoryTableHeading = [
    "Experiences",
    "user",
    "Text",
    "Status",
    "create At ",
    "Action",
  ];

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (props.token) {
      props.GetAllReviews(props.token);
    }
  }, []);
  useEffect(() => {
    setReviews(props.reviews);
  }, [props.reviews]);
  const DeleteReviews = (i, id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this category!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Your category has been deleted!", {
          icon: "success",
        });
        props.DeleteReviews(id, props.token);
        setReviews(reviews.filter((item, ind) => ind !== i));
      } else {
        swal("Your category is safe!");
      }
    });
  };
  return (
    <>
      {console.log("I GOT THE reviews", props.reviews)}
      <CCard className="mb-4">
        <CCardHeader style={{ fontWeight: "bold" }}>
          Reviews{" "}
          {/* <span
                        onClick={() => props.history.push('/category/add')}
                        style={{
                            fontSize: 12,
                            fontWeight: '400',
                            color: '#309CE4',
                            textDecorationLine: 'underline',
                            cursor: 'pointer',
                        }}
                    >
                        Add New Category
                    </span> */}
        </CCardHeader>
        <CCardBody>
          <CTable caption="top">
            <CTableCaption>List of reivews</CTableCaption>
            <CTableHead>
              <CTableRow>
                {categoryTableHeading.map((val, index) => (
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
              {reviews?.length > 0
                ? reviews?.map((val, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>{val?.title_ar}</CTableDataCell>
                      <CTableDataCell>
                        {val?.first_name + " " + val?.last_name}
                      </CTableDataCell>
                      <CTableDataCell>{val?.comment}</CTableDataCell>
                      <CTableDataCell>
                        {val?.status == 1 ? "Enabled" : "Disabled"}
                      </CTableDataCell>
                      <CTableDataCell>
                        {moment(val?.created_at).format("yy-MM-DD")}
                      </CTableDataCell>
                      <CTableDataCell>
                        <span
                          onClick={() =>
                            props.history.push(`/reviews/edit/${val.id}`)
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
                            console.log("sss", val, val.id);
                            DeleteReviews(index, val.id);
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

Category.propTypes = {
  GetAllReviews: PropTypes.func,
  DeleteReviews: PropTypes.func,
  token: PropTypes.string,
  isLoading: PropTypes.bool,
  history: PropTypes.object,
  reviews: PropTypes.array,
};

const mapStateToProp = (state) => ({
  isLoading: state.ReviewsReducer.isLoading,
  token: state.AuthReducer.token,
  reviews: state.ReviewsReducer.reviews,
  // userData: state.AuthReducer.userData,
});

const mapDispatchToProps = {
  GetAllReviews: ReviewsAction.GetAllReviews,
  DeleteReviews: ReviewsAction.DeleteReviews,
  UpdateReviews: ReviewsAction.UpdateReviews,
};

export default connect(mapStateToProp, mapDispatchToProps)(Category);
