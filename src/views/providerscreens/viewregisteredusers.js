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
    BookingAction,
    UserAction,
    MyexperienceAction,
} from "src/redux-store/actions/providerActions";
import { connect } from "react-redux";
import swal from "sweetalert";
import Sortedtable from "../../components/sortedtables";
import moment from "moment";

const Category = (props) => {
    const [catBooking, setCategories] = useState([]);
    const [state, setState] = useState({
        experiences: [],
        loader: false,
    });

    useEffect(() => {

        if (props.token) {
            console.log("FUNCTUON RUNNING", props.token)
            props.GetProviderAllExperiences(props.token);
        }
        else {
            console.log("ELSE")
        }
    }, []);
    useEffect(() => {
        _setExperiences();
    }, [props.experiences]);

    const _setExperiences = () => {
        setState({
            ...state,
            experiences:
                props.experiences &&
                props.experiences.map((item, i) => {
                    console.log("itemmmmm", item);
                    let {
                        account_status,
                        img_background,
                        totalReview,
                        created_at,
                        providerDetail,
                    } = item;
                    let status = account_status == 1 ? "Active" : "Not Verified";
                    return {
                        ...item,
                        account_status: (
                            <p style={{ color: account_status == 1 ? "#7CD568" : "red" }}>
                                {status}
                            </p>
                        ),
                        img_background: (
                            <img
                                style={{ width: 120, height: 80 }}
                                src={
                                    img_background?.search("amazonaws") !== -1
                                        ? img_background
                                        : `http://18.217.187.206/img/course_img/${img_background ? img_background.toLowerCase() : ""
                                        }`
                                }
                            />
                        ),
                        totalReview: totalReview || 0,
                        created_at: moment(created_at).format("yy-MM-DD"),
                        action: (
                            <div style={{ display: "flex", flexWrap: "wrap" }}>

                                <span
                                    onClick={() =>
                                        props.history.push(`/experience/view/files/${item.id}`)
                                    }
                                    style={{
                                        color: "red",
                                        fontSize: 12,
                                        cursor: "pointer",
                                        marginLeft: 10,
                                    }}
                                >
                                    View Details
                                </span>

                            </div>
                        ),
                    };
                }),
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
                <CCardHeader>
                    viewregisteredusers{" "}


                </CCardHeader>
                <Sortedtable
                    dataArray={state.experiences.reverse()}
                    columns={[
                        {
                            label: "Experience Image",
                            field: "img_background",
                            sort: "asc",
                            // width: 150
                        },
                        {
                            label: "Experience Name",
                            field: "title_ar",
                            sort: "asc",
                            width: 270,
                        },
                        {
                            label: "Total Reviews",
                            field: "totalReview",
                            sort: "asc",
                            width: 200,
                        },
                        // {
                        //   label: "Email",
                        //   field: "email",
                        //   sort: "asc",
                        //   width: 100,
                        // },

                        {
                            label: "Price",
                            field: "price",
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
                            label: "Category",
                            field: "category",
                            sort: "asc",
                            width: 100,
                        },
                        {
                            label: "City",
                            field: "city",
                            sort: "asc",
                            width: 100,
                        },
                        {
                            label: "Hours",
                            field: "time",
                            sort: "asc",
                            width: 100,
                        },
                        {
                            label: "Created Date",
                            field: "created_at",
                            sort: "asc",
                            width: 100,
                        },
                        {
                            label: "Status",
                            field: "status",
                            sort: "asc",
                            width: 100,
                        },

                        {
                            label: "Actions",
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
    GetProviderAllExperiences: PropTypes.func,
    DeleteBooking: PropTypes.func,
    token: PropTypes.string,
    isLoading: PropTypes.bool,
    history: PropTypes.object,
    experiences: PropTypes.array,
};

const mapStateToProp = (state) => ({
    isLoading: state.GetAllProviderReducer.isLoading,
    token: state.AuthReducer.token,
    experiences: state.GetAllProviderReducer.experiences,

});

const mapDispatchToProps = {
    GetProviderAllExperiences: MyexperienceAction.GetProviderAllExperiences,
    // DeleteBooking: BookingAction.DeleteBooking,
    CreateExpeirence: MyexperienceAction.CreateExpeirence,

};

export default connect(mapStateToProp, mapDispatchToProps)(Category);
