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
    CFormCheck,
    CButtonGroup,
    CButtonToolbar,
} from "@coreui/react";
// import { DocsLink } from 'src/reusable'
import { DocsCallout, Example } from "src/reusable";

import {
    CategoryAction,
    BookingAction,
    GroupBookingAction,
    SessionsAction,
} from "src/redux-store/actions";
import { connect } from "react-redux";
import swal from "sweetalert";
import Sortedtable from "../../components/sortedtables";
import moment from "moment";


const Test = ()=>{
    return (
        <div>This is test.js</div>
    )
}

export default Test