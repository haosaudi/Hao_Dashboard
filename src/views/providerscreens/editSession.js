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

const Category = (props) => {
    const categoryTableHeading = [
        "Category Image",
        "Category Name",
        "Category Description",
        "Category Status",
        "Action",
    ];

    const [state, setState] = useState({
        sessions: [],
        loader: false,
    });
    useEffect(() => {
        // console.log(props.token)
        // if (props.token) {
        //     props.GetSessionsById(425,props.token);
        // }
    }, [props.token]);
 
    useEffect(() => {
        setState({
            ...state,
            sessions:
                props.getExperienceById &&
                props.getExperienceById.map((item, i) => {
                    return {
                        ...item,
                        start_date: moment(item.start_date).format("yy-MM-DD"),
                        end_date: moment(item.end_date).format("yy-MM-DD"),
                        group_booking:item.booked_seats?item.booked_seats:0,
                        
                        attendance: (
                            <div
                                style={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                    display: "flex",
                                }}
                            >
                                <CCol sm="4">
                                    <CFormCheck
                                        disabled
                                        defaultChecked={item.online === 0 ? false : true}
                                        type="checkbox"
                                        id="gridCheck1"
                                    />
                                </CCol>
                            </div>
                        ),
                        action: (
                            <div>
                                {" "}
                                <span
                                    onClick={() =>
                                        props.history.push(`/Sessions/editsession/${item.id}`)
                                    }
                                    style={{ color: "#309CE4", fontSize: 12, cursor: "pointer" }}
                                >
                                    Edit
                                </span>
                            </div>
                        ),
                        action2: (
                            <div>
                                {" "}
                                <span
                                    onClick={() =>
                                        props.history.push(
                                            `/groupbooking/approvedgroupbooking/${item.id}`
                                        )
                                    }
                                    style={{ color: "#309CE4", fontSize: 12, cursor: "pointer" }}
                                >
                                    Delete
                                </span>
                            </div>
                        ),
                        action3: (
                            <div>
                                {" "}
                                <span
                                    onClick={() =>
                                        props.history.push(
                                            `/groupbooking/approvedgroupbooking/${item.id}`
                                        )
                                    }
                                    style={{ color: "#309CE4", fontSize: 12, cursor: "pointer" }}
                                >
                                    View Registered Userssssss
                                </span>
                            </div>
                        ),
                    };
                }),
        });
    }, [props.sessions]);
    const EditBooking = (i, id) => {
        //  ہب
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
                <CCardHeader>View Provider Sessions </CCardHeader>
                <Sortedtable
                    dataArray={state.sessions}
                    columns={[
                        {
                            label: "BookedBy#",
                            field: "id",
                            sort: "asc",
                            // width: 150
                        },

                        {
                            label: "Attendee Name",
                            field: "attendee_name",
                            sort: "asc",
                            width: 200,
                        },

                        {
                            label: "Gender",
                            field: "gender",
                            sort: "asc",
                            width: 100,
                        },
                        {
                            label: "Amount Paid",
                            field: "amount_paid",
                            sort: "asc",
                            width: 100,
                        },
                        {
                            label: "Booking Date",
                            field: "booking_date",
                            sort: "asc",
                            width: 100,
                        },
                        {
                            label: "Booking Status",
                            field: "booking_status",
                            sort: "asc",
                            width: 100,
                        },
                        {
                            label: "Attendance",
                            field: "attendance",
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
    attendeesArray: PropTypes.array,
    Attendees:PropTypes.func,
    getExperienceById:PropTypes.array
};

const mapStateToProp = (state) => ({
    attendeesArray : state.GetAllProviderReducer.attendees,
    getExperienceById:state.GetAllProviderReducer.mySessions
});

const mapDispatchToProps = {
    Attendees: SessionsAction.Attendees,
};

export default connect(mapStateToProp, mapDispatchToProps)(Category);
