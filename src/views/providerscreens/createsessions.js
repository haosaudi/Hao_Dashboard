import PropTypes from "prop-types";
import React, { useEffect, useState, createRef } from "react";
import classNames from "classnames";
import { AutoComplete } from 'antd';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CButton,
    CFormControl,
    CForm,
    CFormLabel,
    CFormCheck,
    CFormSelect,
    CSpinner,
    CInputGroupText,
    CInputGroup,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { DocsLink } from "src/reusable";
import {
    // CategoryAction,
    // CityAction,
    MyexperienceAction,
} from "src/redux-store/actions/providerActions";
import {
    CategoryAction,
    CityAction,
} from "src/redux-store/actions";
import { connect } from "react-redux";
import { ImageUpload } from "src/utils/api_calls";
import { missingFieldsCheckOut } from "src/utils/globalFunction";
import { toast } from "react-toastify";
import Datetime from "react-datetime";
import { Tabs, Table, Navbar, DropdownButton, Button, Form, InputGroup, Col, Row, Dropdown } from 'react-bootstrap';


import FormControl from "@material-ui/core/FormControl";
import "react-datetime/css/react-datetime.css";

const Category = (props) => {
    const [startDate, setStartDate] = useState(new Date());
    const [result, setResult] = useState([{


    }]);

    const handleSearch = (value) => {
        let res = [];

        if (!value || value.indexOf('@') >= 0) {
            res = [];
        } else {
            res = ['gmail.com', '163.com', 'qq.com'].map((domain) => `${value}@${domain}`);
        }

        setResult(res);
    };


    const [state, setState] = useState({
        title_ar: "",
        description_ar: "",
        img_background: "",
        category_id: "",
        gender: "Male",
        time: "",
        price: "",
        language: "Arabic",
        city_id: "",
        pre_requisition_ar: "",
        tools_ar: "",
        location_desc_ar: "",
        online: false,
        longitude: "",
        latitude: "",
        loading: false,
        result: [],

        CreateSessions: [
            {
                key: "Experience",
            },
            {
                key: "Date",
            },
            {
                key: "Begin Time",
            },
            {
                key: "End Time",
            },
            {
                key: "Price",
            },
            {
                key: "Repeat",
            },
            {
                key: "Is There Additional Price For Equipment",
            },
            {
                key: "Price with Equipment",
            },
            {
                key: "Number of seats",
            },
            {
                key: "Active",
            }, {
                key: "Online"
            },
            {
                key: "Note",
            },
            {
                key: "Repeat Type"
            },

            {
                key: "Repeat Until",
            },
            {
                key: "Repeat Count",
            },
        ],
        categories: [
            "Sciences", "Art", "football"

        ],
        RepeatType: [
            "Weekly", "Monthly", "Yearly"

        ],
        days: [
            "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"

        ],



        startDate: new Date()
    });

    const _OnchangeText = (val, index) => {

        const updatedArray = state.CreateSessions.map((item, i) => {
            if (i == index) {
                return { ...item, value: val }
            }
            else {
                return item
            }
        })



        setState({ ...state, CreateSessions: updatedArray })




    }

    useEffect(() => {

        console.log("props.allExperiences", props.allExperiences.map((item, i) => {
            console.log("   item.title_ar", item.title_ar)
        }))
        // if (props.allExperiences.length > 0) {
        //     setState({ ...state, result: props.allExperiences });
        // }
    }, [props.allExperiences]);

    const AddSessions = async () => {
        let data = state;

        let message = missingFieldsCheckOut(data);
        let isMissed = message?.length > 0;
        if (isMissed) {
            toast.warn(`Please fill all Fields ${message}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            console.log("data", data, "online", state.online, "token", props.token)
            let data = {
                "course_id": 9,
                "start_date": "2021-06-20",
                "end_date": "2021-06-20",
                "start_time": "12:00",
                "end_time": "14:00",
                "price": 200,
                "seats": 20

            }
            props.AddExperience(
                {
                    ...data,
                    status: 1,
                    online: state.online ? 1 : 0,
                    slug: state.title_ar,
                },
                props.token,
                props.history
            );
        }
    };

    const CheckBox = () => (
        <CFormCheck
            id="enabled"
            defaultChecked={state.online}
            style={{ marginLeft: 0 }}
            onChange={(e) => {
                setState({ ...state, online: e.target.checked });
            }}
            type="checkbox"
            id="gridCheck1"
            label=""
        />
    );
    return (
        <CCard className="mb-4"
            style={{ paddingRight: 10, paddingRight: 10 }}
        >
            {/* <AutoComplete
                style={{
                    width: 200,
                }}
                onSearch={handleSearch}
                placeholder="input here"
            >
                {result.map((email) => (
                    <Option key={email} value={email}>
                        {email}
                    </Option>
                ))}
            </AutoComplete> */}
            <CCardHeader>

                <CRow>
                    <CCol style={{ alignItems: "center", display: "flex" }}>
                        Create Sessions
                    </CCol>
                    <CCol style={{ display: "flex", justifyContent: "flex-end" }}>
                        <CButton
                            onClick={AddSessions}
                            disabled={state.loading || props.isLoading}
                            style={{ color: "white", fontSize: 12 }}
                            color={"info"}
                            shape="rounded-0"
                        >
                            Edit
                        </CButton>
                        &nbsp; &nbsp;
                        <CButton
                            onClick={() => props.history.push("/myexperience")}
                            style={{ color: "grey", fontSize: 12 }}
                            color={"light"}
                            shape="rounded-0"
                        >
                            Cancel
                        </CButton>
                    </CCol>
                </CRow>
            </CCardHeader>

            <Form>
                {
                    state.CreateSessions.map((item, i) => {

                        let length = state.CreateSessions?.length - 1

                        return <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail"
                            style={{ fontSize: "13px", color: '#909090' }}
                        >
                            <Form.Label column sm="2"

                            >
                                {item.key}
                            </Form.Label>
                            <Col sm="10"

                            >
                                {

                                    item.key == "Experience" ?

                                        <DropdownButton
                                            style={{ padding: 0, margin: 0, justifyItems: 'center', alignItems: 'center' }}
                                            id="dropdown-basic-button" title={item.value || "select gender"}
                                        >
                                            {
                                                state.result && state.result.map((item) => {

                                                    return <Dropdown.Item
                                                        onClick={() =>
                                                            _OnchangeText(item, i)
                                                        }

                                                    > {item} </Dropdown.Item>
                                                })
                                            }
                                        </DropdownButton>





                                        :
                                        item.key == "Date" ?

                                            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}

                                                style={{ border: '0px solid #d3d3d3', background: '#f6f6f6' }}

                                            />
                                            :
                                            item.key == "Begin Time" ?

                                                <div class="md-form">


                                                    <FormControl fullWidth>
                                                        <Datetime
                                                            dateFormat={false}
                                                            inputProps={{ placeholder: "select Start Time" }}
                                                        />
                                                    </FormControl>
                                                </div>
                                                :
                                                item.key == "End Time" ?

                                                    <div class="md-form"


                                                    >


                                                        <FormControl fullWidth>
                                                            <Datetime
                                                                dateFormat={false}
                                                                inputProps={{ placeholder: "select End Time" }}
                                                            />
                                                        </FormControl>
                                                    </div>
                                                    :
                                                    item.key == "Repeat Until" ?

                                                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}

                                                            style={{ border: '0px solid #d3d3d3', background: '#f6f6f6' }}

                                                        />
                                                        :



                                                        item.key == "Online" ?
                                                            <>

                                                                <div class="form-check">
                                                                    <input
                                                                        class="form-check-input"
                                                                        type="checkbox"
                                                                        value=""
                                                                        id="flexCheckDefault"
                                                                    // onChange={(text) => console.log("ssssss", text.target.value)}
                                                                    />
                                                                    <label class="form-check-label" for="flexCheckDefault">
                                                                        Yes
                                                                    </label>
                                                                </div>



                                                            </>
                                                            : item.key == "Active" ?
                                                                <>

                                                                    <div class="form-check">
                                                                        <input
                                                                            class="form-check-input"
                                                                            type="checkbox"
                                                                            value=""
                                                                            id="flexCheckDefault"
                                                                        // onChange={(text) => console.log("ssssss", text.target.value)}
                                                                        />
                                                                        <label class="form-check-label" for="flexCheckDefault">
                                                                            Yes
                                                                        </label>
                                                                    </div>



                                                                </>
                                                                : item.key == "Repeat" ?
                                                                    <>

                                                                        <div class="form-check">
                                                                            <input
                                                                                class="form-check-input"
                                                                                type="checkbox"
                                                                                value=""
                                                                                id="flexCheckDefault"
                                                                            // onChange={(text) => console.log("ssssss", text.target.value)}
                                                                            />
                                                                            <label class="form-check-label" for="flexCheckDefault">
                                                                                Yes
                                                                            </label>
                                                                        </div>



                                                                    </>
                                                                    : item.key == "Is There Additional Price For Equipment" ?
                                                                        <>

                                                                            <div class="form-check">
                                                                                <input
                                                                                    class="form-check-input"
                                                                                    type="checkbox"
                                                                                    value=""
                                                                                    id="flexCheckDefault"
                                                                                // onChange={(text) => console.log("ssssss", text.target.value)}
                                                                                />
                                                                                <label class="form-check-label" for="flexCheckDefault">
                                                                                    Yes
                                                                                </label>
                                                                            </div>



                                                                        </>
                                                                        : item.key == "Active" ?
                                                                            <div class="form-check">
                                                                                <input
                                                                                    class="form-check-input"
                                                                                    type="checkbox"
                                                                                    value=""
                                                                                    id="flexCheckDefault"
                                                                                // onChange={(text) => console.log("ssssss", text.target.value)}
                                                                                />
                                                                                <label class="form-check-label" for="flexCheckDefault">
                                                                                    Yes
                                                                                </label>
                                                                            </div>

                                                                            :
                                                                            item.key == "Repeat Type" ?
                                                                                <>

                                                                                    <DropdownButton
                                                                                        style={{ padding: 0, margin: 0, justifyItems: 'center', alignItems: 'center' }}
                                                                                        id="dropdown-basic-button" title={item.value || "select"}
                                                                                    >
                                                                                        {
                                                                                            state.RepeatType && state.RepeatType.map((item) => {

                                                                                                return <Dropdown.Item
                                                                                                    onClick={() =>
                                                                                                        _OnchangeText(item, i)
                                                                                                    }

                                                                                                > {item} </Dropdown.Item>
                                                                                            })
                                                                                        }
                                                                                    </DropdownButton>
                                                                                    <div style={{ flexDirection: 'row', display: 'flex', marginTop: 8 }} >

                                                                                        {
                                                                                            state.days && state.days.map((item, i) => {
                                                                                                return <div class="form-check"
                                                                                                    style={{ marginRight: 10, justifyContent: 'center' }}
                                                                                                >
                                                                                                    <input
                                                                                                        class="form-check-input"
                                                                                                        type="checkbox"
                                                                                                        value=""
                                                                                                        id="flexCheckDefault"
                                                                                                    // onChange={(text) => console.log("ssssss", text.target.value)}
                                                                                                    />
                                                                                                    <label class="form-check-label"
                                                                                                    //  for="flexCheckDefault"
                                                                                                    // onClick={() => alert("Be")}
                                                                                                    >
                                                                                                        {item}
                                                                                                    </label>
                                                                                                </div>
                                                                                            })
                                                                                        }
                                                                                    </div>


                                                                                </>


                                                                                : <Form.Control plaintext defaultValue=""
                                                                                    style={{ border: '1px solid #d3d3d3', background: '#f6f6f6' }}

                                                                                    value={item.value}
                                                                                    onChange={(text) => _OnchangeText(text.target.value, i)}
                                                                                />
                                }



                            </Col>
                        </Form.Group>


                    })
                }


            </Form>
        </CCard>
        // <>
        //     <CCard className="mb-4">
        //         <p

        //         >
        //             <CRow>
        //                 <CCol style={{ alignItems: "center", display: "flex" }}>
        //                     Create Sessions
        //                 </CCol>
        //                 <CCol style={{ display: "flex", justifyContent: "flex-end" }}>
        //                     <CButton
        //                         onClick={AddExperience}
        //                         disabled={state.loading || props.isLoading}
        //                         style={{ color: "white", fontSize: 12 }}
        //                         color={"info"}
        //                         shape="rounded-0"
        //                     >
        //                         Add
        //                     </CButton>
        //                     &nbsp; &nbsp;
        //                     <CButton
        //                         onClick={() => props.history.push("/category")}
        //                         style={{ color: "grey", fontSize: 12 }}
        //                         color={"light"}
        //                         shape="rounded-0"
        //                     >
        //                         Cancel
        //                     </CButton>
        //                 </CCol>
        //             </CRow>
        //         </CCardHeader>
        //         <CCardBody>

        //             <CForm>
        //                 <CRow className="mb-3">
        //                     <CFormLabel
        //                         htmlFor="inputEmail3"
        //                         className="col-sm-2 col-form-label"
        //                     >
        //                         Experience Name
        //                     </CFormLabel>
        //                     <CCol sm="4">
        //                         <CFormControl
        //                             onChange={(e) =>
        //                                 setState({ ...state, title_ar: e.target.value })
        //                             }
        //                             placeholder="Experience Name"
        //                             type="email"
        //                             value={state.title_ar}
        //                             id="inputEmail3"
        //                         />
        //                         {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
        //                     </CCol>
        //                 </CRow>
        //                 <CRow className="mb-3">
        //                     <CFormLabel
        //                         htmlFor="inputPassword3"
        //                         className="col-sm-2 col-form-label"
        //                     >
        //                         Date
        //                     </CFormLabel>
        //                     <CCol sm="4">
        //                         <CFormControl
        //                             onChange={(e) =>
        //                                 setState({ ...state, date: e.target.value })
        //                             }
        //                             component="textarea"
        //                             value={state.date}
        //                             id="validationTextarea"
        //                         // placeholder="Required example textarea"
        //                         // invalid
        //                         // required
        //                         ></CFormControl>
        //                     </CCol>
        //                 </CRow>

        //                 {/* <CRow className="mb-3">
        //                     <CFormLabel
        //                         htmlFor="inputPassword3"
        //                         className="col-sm-2 col-form-label"
        //                     >
        //                         Gender
        //                     </CFormLabel>
        //                     <CCol sm="4">
        //                         <CFormSelect
        //                             id="gender"
        //                             onChange={(e) => {
        //                                 setState({ ...state, gender: e.target.value });
        //                             }}
        //                             defaultValue={state.gender}
        //                             aria-label="Default select example"
        //                         >
        //                             {["Male", "Female", "Both", "Kids"].map((val) => (
        //                                 <option value={val}>{val}</option>
        //                             ))}

        //                         </CFormSelect>
        //                     </CCol>
        //                 </CRow> */}
        //                 {/* <CRow className="mb-3">
        //                     <CFormLabel
        //                         htmlFor="inputPassword3"
        //                         className="col-sm-2 col-form-label"
        //                     >
        //                         City
        //                     </CFormLabel>
        //                     <CCol sm="4">
        //                         <CFormSelect
        //                             id="city"
        //                             onChange={(e) => {
        //                                 setState({ ...state, city_id: e.target.value });
        //                             }}
        //                             defaultValue={state.city_id}
        //                             aria-label="Default select example"
        //                         >
        //                             {props.cities.map((val) => (
        //                                 <option value={val.id}>{val.name_ar}</option>
        //                             ))}

        //                         </CFormSelect>
        //                     </CCol>
        //                 </CRow> */}
        //                 <CRow className="mb-3">
        //                     <CFormLabel
        //                         htmlFor="inputEmail3"
        //                         className="col-sm-2 col-form-label"
        //                     >
        //                         Begin Time
        //                     </CFormLabel>
        //                     <CCol sm="4">
        //                         <CFormControl
        //                             onChange={(e) => setState({ ...state, Begin_Time: e.target.value })}
        //                             placeholder="Experience Name"
        //                             type="number"
        //                             value={state.time}
        //                             id="inputEmail3"
        //                         />
        //                         {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
        //                     </CCol>
        //                 </CRow>
        //                 <CRow className="mb-3">
        //                     <CFormLabel
        //                         htmlFor="inputEmail3"
        //                         className="col-sm-2 col-form-label"
        //                     >
        //                         End Time
        //                     </CFormLabel>
        //                     <CCol sm="4">
        //                         <CFormControl
        //                             onChange={(e) => setState({ ...state, End_Time: e.target.value })}
        //                             placeholder="Experience Name"
        //                             type="number"
        //                             value={state.time}
        //                             id="inputEmail3"
        //                         />
        //                         {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
        //                     </CCol>
        //                 </CRow>

        //                 <CRow className="mb-3">
        //                     <CFormLabel
        //                         htmlFor="inputEmail3"
        //                         className="col-sm-2 col-form-label"
        //                     >
        //                         Price
        //                     </CFormLabel>
        //                     <CCol sm="4">
        //                         <CInputGroup>
        //                             <CFormControl
        //                                 onChange={(e) =>
        //                                     setState({ ...state, price: e.target.value })
        //                                 }
        //                                 placeholder="Price"
        //                                 value={state.price}
        //                                 type="Number"
        //                                 aria-label="Recipient's username"
        //                                 aria-describedby="button-addon2"
        //                             />
        //                             <CInputGroupText id="basic-addon1">SAR</CInputGroupText>
        //                         </CInputGroup>
        //                         {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
        //                     </CCol>
        //                 </CRow>


        //                 <CRow className="mb-3">
        //                     <CFormLabel
        //                         htmlFor="inputPassword3"
        //                         className="col-sm-2 col-form-label"
        //                     >
        //                         Language
        //                     </CFormLabel>
        //                     <CCol sm="4">
        //                         <CFormSelect
        //                             id="language"
        //                             onChange={(e) => {
        //                                 setState({ ...state, language: e.target.value });
        //                             }}
        //                             defaultValue={state.language}
        //                             aria-label="Default select example"
        //                         >
        //                             {["Arabic", "English"].map((val) => (
        //                                 <option value={val}>{val}</option>
        //                             ))}
        //                             {/* <option value="Approved">Approved</option>
        //           <option value="Rejected">Rejected</option> */}
        //                         </CFormSelect>
        //                     </CCol>
        //                 </CRow>
        //                 <CRow className="mb-3">
        //                     <CFormLabel
        //                         htmlFor="inputPassword3"
        //                         className="col-sm-2 col-form-label"
        //                     >
        //                         Requirements For Attending
        //                     </CFormLabel>
        //                     <CCol sm="4">
        //                         <CFormControl
        //                             onChange={(e) =>
        //                                 setState({ ...state, tools_ar: e.target.value })
        //                             }
        //                             component="textarea"
        //                             value={state.tools_ar}
        //                             id="validationTextarea"
        //                         // placeholder="Required example textarea"
        //                         // invalid
        //                         // required
        //                         ></CFormControl>
        //                     </CCol>
        //                 </CRow>
        //                 <CRow className="mb-3">
        //                     <CFormLabel
        //                         htmlFor="inputPassword3"
        //                         className="col-sm-2 col-form-label"
        //                     >
        //                         What Do You Provide For Attendees In The Experience?
        //                     </CFormLabel>
        //                     <CCol sm="4">
        //                         <CFormControl
        //                             onChange={(e) =>
        //                                 setState({ ...state, pre_requisition_ar: e.target.value })
        //                             }
        //                             component="textarea"
        //                             value={state.pre_requisition_ar}
        //                             id="validationTextarea"
        //                         // placeholder="Required example textarea"
        //                         // invalid
        //                         // required
        //                         ></CFormControl>
        //                     </CCol>
        //                 </CRow>
        //                 <CRow className="mb-3">
        //                     <CFormLabel
        //                         htmlFor="inputPassword3"
        //                         className="col-sm-2 col-form-label"
        //                     >
        //                         Location Description
        //                     </CFormLabel>
        //                     <CCol sm="4">
        //                         <CFormControl
        //                             onChange={(e) =>
        //                                 setState({ ...state, location_desc_ar: e.target.value })
        //                             }
        //                             component="textarea"
        //                             value={state.location_desc_ar}
        //                             id="validationTextarea"
        //                         // placeholder="Required example textarea"
        //                         // invalid
        //                         // required
        //                         ></CFormControl>
        //                     </CCol>
        //                 </CRow>
        //                 <CRow className="mb-3">
        //                     <CFormLabel
        //                         htmlFor="inputPassword3"
        //                         className="col-sm-2 col-form-label"
        //                     >
        //                         Online?
        //                     </CFormLabel>
        //                     <CCol sm="4">
        //                         <CheckBox />{" "}
        //                         <span style={{ marginLeft: 20, fontSize: 12 }}>Online</span>
        //                     </CCol>
        //                     {/* <CFormCheck type="checkbox" id="gridCheck1" label="Example checkbox" /> */}
        //                 </CRow>
        //                 <CRow className="mb-3">
        //                     <CFormLabel
        //                         htmlFor="inputPassword3"
        //                         className="col-sm-2 col-form-label"
        //                     >
        //                         Background Image
        //                     </CFormLabel>
        //                     <CCol sm="4">
        //                         <CFormControl
        //                             onChange={(e) => {
        //                                 imageUpload(e.target.files[0]);
        //                             }}
        //                             type="file"
        //                             id="formFile"
        //                         />
        //                     </CCol>
        //                     {state.loading ? (
        //                         <CCol sm="2">
        //                             <CSpinner style={{ height: 25, width: 25 }} />
        //                         </CCol>
        //                     ) : state.img_background?.length > 0 ? (
        //                         <CCol sm="2">Uploaded</CCol>
        //                     ) : null}

        //                     {/* <CFormCheck type="checkbox" id="gridCheck1" label="Example checkbox" /> */}
        //                 </CRow>
        //                 <CRow className="mb-3">
        //                     <CFormLabel
        //                         htmlFor="inputPassword3"
        //                         className="col-sm-2 col-form-label"
        //                     >
        //                         Location
        //                     </CFormLabel>
        //                     <CCol sm="3">
        //                         <CRow className="mb-3">
        //                             <CFormLabel
        //                                 htmlFor="inputPassword3"
        //                                 className="col-sm-4 col-form-label"
        //                             >
        //                                 Lat:
        //                             </CFormLabel>
        //                             <CFormControl
        //                                 onChange={(e) =>
        //                                     setState({ ...state, latitude: e.target.value })
        //                                 }
        //                                 style={{ width: 180 }}
        //                                 // component="textarea"
        //                                 value={state.latitude}
        //                                 id="validationTextarea"
        //                             // placeholder="Required example textarea"
        //                             // invalid
        //                             // required
        //                             ></CFormControl>
        //                         </CRow>
        //                     </CCol>
        //                     <CCol sm="3">
        //                         <CRow className="mb-3">
        //                             <CFormLabel
        //                                 htmlFor="inputPassword3"
        //                                 className="col-sm-4 col-form-label"
        //                             >
        //                                 Lng:
        //                             </CFormLabel>
        //                             <CFormControl
        //                                 onChange={(e) =>
        //                                     setState({ ...state, longitude: e.target.value })
        //                                 }
        //                                 style={{ width: 180 }}
        //                                 // component="textarea"
        //                                 value={state.longitude}
        //                                 id="validationTextarea"
        //                             // placeholder="Required example textarea"
        //                             // invalid
        //                             // required
        //                             ></CFormControl>
        //                         </CRow>
        //                     </CCol>
        //                 </CRow>
        //             </CForm>
        //         </CCardBody>
        //     </CCard>


        // </>


    );
};

Category.propTypes = {
    AddExperience: PropTypes.func,
    token: PropTypes.string,
    isLoading: PropTypes.bool,
    history: PropTypes.object,
    categories: PropTypes.array,
    cities: PropTypes.array,
};

const mapStateToProp = (state) => ({
    isLoading: state.ExperienceReducer.isLoading,
    token: state.AuthReducer.token,
    categories: state.CategoryReducer.categories,
    cities: state.CityReducer.cities,
    allExperiences: state.ExperienceReducer.experiences
    // userData: state.AuthReducer.userData,
});

const mapDispatchToProps = {
    GetCategories: CategoryAction.GetAllCategories,
    GetCities: CityAction.GetAllCities,
    GetCategories: CategoryAction.GetAllCategories,
    AddExperience: MyexperienceAction.AddExperience,
};

export default connect(mapStateToProp, mapDispatchToProps)(Category);
