import React, { useEffect } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
const DefaultLayout = (props) => {
  useEffect(() => {
    if (props.token) {
    } else {
      props.history.push('/login')
    }
  }, [props.token])
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}
DefaultLayout.propTypes = {
  token: PropTypes.string,
  history: PropTypes.object,
}

const mapStateToProp = (state) => ({
  token: state.AuthReducer.token,
})

// const mapDispatchToProps = {
//   SignIn: AuthAction.Signin,
// }

export default connect(mapStateToProp, null)(DefaultLayout)
