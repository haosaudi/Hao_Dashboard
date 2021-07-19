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
import renderHTML from "react-render-html";
import { DocsLink } from "src/reusable";
import {
  CategoryAction,
  BookingAction,
  UserAction,
  ExperienceAvailibilityAction,
  EmailAction,
} from "src/redux-store/actions";
import { connect } from "react-redux";
import swal from "sweetalert";
import Sortedtable from "../../components/sortedtables";
import moment from "moment";

const Category = (props) => {
  const [catBooking, setCategories] = useState([]);
  const [htmlll, setHtml] = useState(false);
  const [state, setState] = useState({
    designs: [],
    loader: false,
    html: false,
  });

  useEffect(() => {
    if (props.token) {
      props.GetAllEmailDesigns(props.token);
    }
  }, []);
  useEffect(() => {
    _setdesigns();
  }, [props.designs]);

  const _setdesigns = () => {
    setState({
      ...state,
      designs:
        props.designs &&
        props.designs.map((item, i) => {
          console.log("itemmmmm", item);
          let { id, updated_at, created_at, html, status } = item;
          return {
            ...item,
            id: `#${id}`,
            status: status == 1 ? "Enabled" : "Disabled",
            updated_at: moment(updated_at).format("yy-MM-DD"),
            created_at: moment(created_at).format("yy-MM-DD"),
            actions: (
              <div>
                {" "}
                <span
                  onClick={() => props.history.push(`/email/edit/${item.id}`)}
                  style={{ color: "#309CE4", fontSize: 12, cursor: "pointer" }}
                >
                  Edit
                </span>
                <span
                  onClick={() => {
                    deleteEmailDesign(i, item.id);
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
              </div>
            ),
            preview: (
              <div>
                <span
                  onClick={() => setHtml(html)}
                  style={{ color: "#309CE4", fontSize: 12, cursor: "pointer" }}
                >
                  PREVIEW DESIGN
                </span>
              </div>
            ),
          };
        }),
    });
  };

  const deleteEmailDesign = (i, id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Email!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Poof! Your email has been deleted!", {
          icon: "success",
        });
        props.DeleteEmailDesign(id, props.token);
        setState({
          ...state,
          designs: state.designs.filter((item, ind) => ind !== i),
        });
      } else {
        swal("Your email is safe!");
      }
    });
  };

  return (
    <>
      {htmlll && (
        <CCard
          className="mb-4"
          style={{
            fontWeight: "bold",
            overflowY: "scroll",
            background: "white",
            width: "100%",
          }}
        >
          <CCardHeader>Email Preview</CCardHeader>
          <CCardBody
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>{renderHTML(htmlll)}</div>
          </CCardBody>
        </CCard>
      )}
      <CCard
        className="mb-4"
        style={{
          fontWeight: "bold",
          overflowY: "scroll",
          background: "white",
          width: "100%",
        }}
      >
        <CCardHeader>
          View Email Designs{" "}
          <span
            onClick={() => props.history.push("/email/add")}
            style={{
              fontSize: 12,
              fontWeight: "400",
              color: "#309CE4",
              textDecorationLine: "underline",
              cursor: "pointer",
            }}
          >
            Add New Design
          </span>
        </CCardHeader>

        <Sortedtable
          dataArray={state.designs}
          columns={[
            {
              label: "ID#",
              field: "id",
              sort: "asc",
              width: 200,
            },
            {
              label: "Preview",
              field: "preview",
              sort: "asc",
              width: 270,
            },
            {
              label: "Email Type",
              field: "email_type",
              sort: "asc",
              width: 270,
            },

            {
              label: "Status",
              field: "status",
              sort: "asc",
              width: 270,
            },
            {
              label: "Created At",
              field: "created_at",
              sort: "asc",
              width: 200,
            },

            {
              label: "Actions",
              field: "actions",
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
  GetAllEmailDesigns: PropTypes.func,
  DeleteBooking: PropTypes.func,
  token: PropTypes.string,
  isLoading: PropTypes.bool,
  history: PropTypes.object,
  designs: PropTypes.array,
};

const mapStateToProp = (state) => ({
  isLoading: state.BookingsReducer.isLoading,
  token: state.AuthReducer.token,
  designs: state.EmailReducer.designs,
});

const mapDispatchToProps = {
  GetAllEmailDesigns: EmailAction.GetAllEmailDesigns,
  DeleteEmailDesign: EmailAction.DeleteEmailDesign,
  // DeleteBooking: BookingAction.DeleteBooking,
};

export default connect(mapStateToProp, mapDispatchToProps)(Category);
