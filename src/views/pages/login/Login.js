import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormControl,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { AuthAction } from 'src/redux-store/actions'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'

const Login = (props) => {
  const [state, setState] = useState({ email: '', password: '' })
  const login = () => {
    // console.log('SAHI BAAT HY!!', props)
    if (state.email !== '' && state.password !== '') {
      props.SignIn({ email: state.email, password: state.password })
    } else {
      toast.warn('Please fill all Fields', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }
  useEffect(() => {
    if (props.token && props.token !== '') {
      props.history.push('/')
    }
  }, [props.token])
  const onChange = (value, name) => {
    setState({ ...state, [name]: value })
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                      <CFormControl
                        onChange={(e) => {
                          onChange(e.target.value, 'email')
                        }}
                        placeholder="Username"
                        autoComplete="username"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                      <CFormControl
                        onChange={(e) => {
                          onChange(e.target.value, 'password')
                        }}
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        {props.isLoading ? (
                          <CButton disabled>
                            <CSpinner
                              component="span"
                              size="sm"
                              variant="grow"
                              aria-hidden="true"
                            />
                            Loading...
                          </CButton>
                        ) : (
                          <CButton onClick={login} color="primary" className="px-4">
                            Login
                          </CButton>
                        )}
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              {/* <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

Login.propTypes = {
  SignIn: PropTypes.func,
  token: PropTypes.string,
  isLoading: PropTypes.bool,
  history: PropTypes.object,
}

const mapStateToProp = (state) => ({
  isLoading: state.AuthReducer.isLoading,
  token: state.AuthReducer.token,
  // userData: state.AuthReducer.userData,
})

const mapDispatchToProps = {
  SignIn: AuthAction.Signin,
}

export default connect(mapStateToProp, mapDispatchToProps)(Login)
