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
    CButton
} from "@coreui/react";
import { Card, Avatar } from 'antd';
import { DocsLink } from "src/reusable";
import {
    CategoryAction,
    BookingAction,
    UserAction,
    MyexperienceAction,
} from "src/redux-store/actions/providerActions";
import { connect } from "react-redux";
import swal from "sweetalert";
import Sortedtable from "../../../components/sortedtables";
import moment from "moment";
import { Row, Col } from 'antd';
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
                                        props.history.push(`/myexperience/edit/${item.id}`)
                                    }
                                    style={{ color: "#309CE4", fontSize: 12, cursor: "pointer" }}
                                >
                                    Edit
                                </span>
                                <span
                                    onClick={() =>
                                        props.history.push(`/experience/view/files/${item.id}`)
                                    }
                                    style={{
                                        color: "#309C2E",
                                        fontSize: 12,
                                        cursor: "pointer",
                                        marginLeft: 10,
                                    }}
                                >
                                    Experience Files
                                </span>
                                <span
                                    onClick={() =>
                                        {
                                            props.history.push(`/myexperience/viewprovidersessions/${item.id}`)
                                            props.ShowMySessions(
                                                item?.totalSession?.map((val) => {
                                                  return {
                                                    ...val,
                                                    title_ar: item?.title_ar || "",
                                                  };
                                                }) || []
                                              );
                                        }
                                    }
                                    style={{
                                        color: "red",
                                        fontSize: 12,
                                        cursor: "pointer",
                                        marginLeft: 10,
                                    }}
                                >
                                    View Sessions
                                </span>
                                {/* <span
                                    onClick={() =>
                                        props.history.push(`/experience/view/${item.id}`)
                                    }
                                    style={{
                                        color: "lightblue",
                                        textDecoration: "underline",
                                        fontSize: 12,
                                        cursor: "pointer",
                                        // marginLeft: 10,
                                    }}
                                >
                                    View Experience
                                </span> */}
                            </div>
                        ),
                    };
                }),
        });
    };
return(
    <>
    <h6>My Experience (08)</h6>
    <Row>
        {props.experiences && props.experiences.map(item => {
            return (
                <Col span={8} style={{ marginTop: 20,marginBottom:10 }} xs={24} xl={8} md={18} >
                    <Card style={{width:"86%",borderRadius:"10px",  boxShadow: "5px 10px 15px #888888"}} >
                        <Row >
                        
                            <Col span={12}>  <h4 style={{color:"#a1ccc4"}}>{item.category}</h4> </Col>
                            <Col span={12}><img alt="example" src={
                                item.img_background?.search("amazonaws") !== -1
                                  ? item.img_background
                                  : `http://18.217.187.206/img/course_img/${
                                      item.img_background ? item.img_background.toLowerCase() : ""
                                    }`
                              } width="90" height="90" style={{borderRadius:"10px",float:"right"}}/></Col>
                        </Row>
                        <Row style={{marginTop:"10px"}}>
                            <Col span={12} > <CButton color="primary" size="sm" color="danger"  onClick={() =>
                                {
                                    props.history.push(`/myexperience/viewprovidersessions/${item.id}`)
                                    props.ShowMySessions(
                                        item?.totalSession?.map((val) => {
                                          return {
                                            ...val,
                                            title_ar: item?.title_ar || "",
                                          };
                                        }) || []
                                      );
                                }
                            }>
                                Sessions
                            </CButton></Col>
                            <Col span={12}> <CButton color="primary" size="sm" color="white" onClick={() =>
                                props.history.push(`/experience/view/files/${item.id}`)
                            }>
                                Manage Files
                            </CButton></Col>
                        </Row>
                        <Row type="flex" align="middle">
                            <Col span={24} style={{textAlign:'center'}}> 
                            <CButton color="primary" size="sm" onClick={() =>
                                props.history.push(`/myexperience/edit/${item.id}`)
                            } >
                                Edit Experience
                            </CButton>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            )
        })}
    </Row>
    </>
)
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
                    My Experiences{" "}
                    <span
                        onClick={() => props.history.push("/myexperience/createexperience")}
                        style={{
                            fontSize: 12,
                            fontWeight: "400",
                            marginLeft: 30,
                            color: "#309CE4",
                            textDecorationLine: "underline",
                            cursor: "pointer",
                        }}
                    >
                        Create New  Expereince
                    </span>
                    <span
                        onClick={() => props.history.push("/myexperience/createsessions")}
                        style={{
                            fontSize: 12,
                            fontWeight: "400",
                            marginLeft: 30,
                            color: "#309CE4",
                            textDecorationLine: "underline",
                            cursor: "pointer",
                        }}
                    >
                        Create New  sessions
                    </span>
                    <span
                        onClick={() => props.history.push("/myexperience/viewregisteredusers")}

                        style={{
                            fontSize: 12,
                            marginLeft: 30,
                            fontWeight: "400",
                            color: "#309CE4",
                            textDecorationLine: "underline",
                            cursor: "pointer",
                        }}
                    >
                        View Registered Users
                    </span>
                    <span
                        onClick={() => props.history.push("/myexperience/viewregisteredusers")}
                        style={{
                            fontSize: 12,
                            marginLeft: 30,
                            fontWeight: "400",
                            color: "#309CE4",
                            textDecorationLine: "underline",
                            cursor: "pointer",
                        }}
                    >
                        Chat
                    </span>
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
    ShowMySessions: PropTypes.func,
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
    ShowMySessions: MyexperienceAction.ShowMySessions,

};

export default connect(mapStateToProp, mapDispatchToProps)(Category);
