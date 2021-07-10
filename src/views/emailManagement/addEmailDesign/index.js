import PropTypes from "prop-types";
import React, { useEffect, useState, useRef } from "react";
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
  BookingAction,
  UserAction,
  ExperienceAvailibilityAction,
  EmailAction,
} from "src/redux-store/actions";
import { connect } from "react-redux";
import swal from "sweetalert";
import moment from "moment";
import EmailEditor from "react-email-editor";
const Category = (props) => {
  const [catBooking, setCategories] = useState([]);
  const [state, setState] = useState({
    refunds: [],
    loader: false,
  });
  const emailEditorRef = useRef(null);

  const exportHtml = () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data;
      AddDesign(html, design);
    });
  };

  const onLoad = () => {
    // you can load your template here;
    // const templateJson = {};
    // emailEditorRef.current.editor.loadDesign(templateJson);
  };

  const AddDesign = async (html, design) => {
    props.AddDesign(
      { html, ...design, schema_version: design.schemaVersion },
      props.token,
      props.history
    );
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
        <CCardHeader>Email Design</CCardHeader>
        <CCardBody>
          <div>
            <button disabled={props.isLoading} onClick={exportHtml}>
              Add To Design
            </button>
          </div>
          <EmailEditor ref={emailEditorRef} onLoad={onLoad} />
        </CCardBody>
      </CCard>
    </>
  );
};

Category.propTypes = {
  AddDesign: PropTypes.func,
  DeleteBooking: PropTypes.func,
  token: PropTypes.string,
  isLoading: PropTypes.bool,
  history: PropTypes.object,
};

const mapStateToProp = (state) => ({
  isLoading: state.EmailReducer.isLoading,
  token: state.AuthReducer.token,
});

const mapDispatchToProps = {
  AddDesign: EmailAction.AddEmailDesign,
  // DeleteBooking: BookingAction.DeleteBooking,
};

export default connect(mapStateToProp, mapDispatchToProps)(Category);
