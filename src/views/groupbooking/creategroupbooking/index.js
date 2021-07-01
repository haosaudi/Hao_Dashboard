import PropTypes from 'prop-types'
import React, { useEffect, useState, createRef } from 'react'
import classNames from 'classnames'
import DatePicker from 'react-datepicker'
import TimePicker from 'react-time-picker';
import 'react-datepicker/dist/react-datepicker.css'
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
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { CategoryAction, GroupBookingAction } from 'src/redux-store/actions'
import { connect } from 'react-redux'
import { ImageUpload } from 'src/utils/api_calls'
import { missingFieldsCheckOut } from 'src/utils/globalFunction'
import { toast } from 'react-toastify'

const Category = (props) => {
  const [state, setState] = useState({
    // name_ar: '',
    // description_ar: '',
    // img: '',
    // loading: false,
    name: "AbdulMoiz",
    mobile: "03172874198 ",
    email: "moiz@gmail.com",
    organisation: "Oraganized",
    course_id: 18,
    proposed_date: '',
    proposed_time: "",
    qty: "1",
    gender: "Male",
    location: "it is min",
    note: "i will be always in your heart"
  })
  const [status, setStatus] = useState(false)
  // useEffect(() => {
  //   if (props.token) {
  //     props.GetCategories(props.token)
  //   }
  // }, [])

  const CreateGroupBooking = async () => {
    let data = state
    delete data.loading
    let message = missingFieldsCheckOut(data)
    let isMissed = message.length > 0
    if (isMissed) {
      toast.warn(`Please fill all Fields ${message}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } else {
      console.log("check values", data)
      // props.CreateGroupBooking(
      //   { ...data, slug: state.name_ar, status: status ? 1 : 0 },
      //   props.token,
      //   props.history,
      // )
    }
  }
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader
        // style={{
        //   fontWeight: 'bold',
        //   display: 'flex',
        //   flexWrap: 'wrap',
        //   justifyContent: 'space-between',
        // }}
        >
          <CRow>
            <CCol style={{ alignItems: 'center', display: 'flex' }}>Add Category</CCol>
            <CCol style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <CButton
                onClick={CreateGroupBooking}
                disabled={state.loading || props.isLoading}
                style={{ color: 'white', fontSize: 12 }}
                color={'info'}
                shape="rounded-0"
              >
                Add
              </CButton>
              &nbsp; &nbsp;
              <CButton
                onClick={() => props.history.push('/category')}
                style={{ color: 'grey', fontSize: 12 }}
                color={'light'}
                shape="rounded-0"
              >
                Cancel
              </CButton>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>

          <CRow>
            <CCol >proposed date  </CCol>
            <CCol>
              <DatePicker selected={state?.proposed_date} onChange={(date) => setState({ ...state, proposed_date: date })} />
            </CCol>
            <CCol></CCol>
          </CRow>
          <CRow>
            <CCol >proposed Time  </CCol>
            <CCol>
              <TimePicker
                onChange={(date) => setState({ ...state, proposed_time: date })}
              // value={value}
              />

            </CCol>
            <CCol></CCol>
          </CRow>
          <CRow>
            <CCol>  organisation  </CCol>
            <CCol>
              <CFormControl
                onChange={(text) => setState({ ...state, organisation: text })}
                component="textarea"
                id="validationTextarea"
                placeholder="Required example textarea"
              // invalid
              // required
              ></CFormControl>
            </CCol>
            <CCol></CCol>
          </CRow>

          <CForm>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                Name
              </CFormLabel>
              <CCol sm="4">
                <CFormControl
                  onChange={(e) => setState({ ...state, name: e.target.value })}
                  placeholder="Category Name"
                  type="email"
                  id="inputEmail3"
                />
                {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputPassword3" className="col-sm-2 col-form-label">
                course_id
              </CFormLabel>
              <CCol sm="4">
                <CFormControl
                  onChange={(e) => setState({ ...state, course_id: e.target.value })}
                  component="textarea"
                  id="validationTextarea"
                // placeholder="Required example textarea"
                // invalid
                // required
                ></CFormControl>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputPassword3" className="col-sm-2 col-form-label">
                qty
              </CFormLabel>
              <CCol sm="4">
                <CFormControl
                  onChange={(e) => setState({ ...state, qty: e.target.value })}
                  component="textarea"
                  id="validationTextarea"
                // placeholder="Required example textarea"
                // invalid
                // required
                ></CFormControl>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputPassword3" className="col-sm-2 col-form-label">
                gender
              </CFormLabel>
              <CCol sm="4">
                <CFormControl
                  onChange={(e) => setState({ ...state, gender: e.target.value })}
                  component="textarea"
                  id="validationTextarea"
                // placeholder="Required example textarea"
                // invalid
                // required
                ></CFormControl>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputPassword3" className="col-sm-2 col-form-label">
                location
              </CFormLabel>
              <CCol sm="4">
                <CFormControl
                  onChange={(e) => setState({ ...state, location: e.target.value })}
                  component="textarea"
                  id="validationTextarea"
                // placeholder="Required example textarea"
                // invalid
                // required
                ></CFormControl>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputPassword3" className="col-sm-2 col-form-label">
                note
              </CFormLabel>
              <CCol sm="4">
                <CFormControl
                  onChange={(e) => setState({ ...state, note: e.target.value })}
                  component="textarea"
                  id="validationTextarea"
                // placeholder="Required example textarea"
                // invalid
                // required
                ></CFormControl>
              </CCol>
            </CRow>
            {/* <CRow className="mb-3">
              <CFormLabel htmlFor="inputPassword3" className="col-sm-2 col-form-label">
                Enabled
              </CFormLabel>
              <CCol sm="4">
                <CFormCheck
                  onChange={(e) => {
                    setStatus(e.target.checked)
                  }}
                  type="checkbox"
                  id="gridCheck1"
                  label=""
                />
              </CCol>
              <CFormCheck type="checkbox" id="gridCheck1" label="Example checkbox" />
            </CRow>
            */}


          </CForm>


        </CCardBody>
      </CCard>
    </>
  )
}

Category.propTypes = {
  CreateGroupBooking: PropTypes.func,
  token: PropTypes.string,
  isLoading: PropTypes.bool,
  history: PropTypes.object,
  categories: PropTypes.array,
}

const mapStateToProp = (state) => ({
  isLoading: state.AuthReducer.isLoading,
  token: state.AuthReducer.token,
  categories: state.CategoryReducer.categories,
  // userData: state.AuthReducer.userData,
})

const mapDispatchToProps = {
  // GetCategories: GroupBookingAction.GetAllCategories,
  CreateGroupBooking: GroupBookingAction.CreateGroupBooking,
}

export default connect(mapStateToProp, mapDispatchToProps)(Category)
