import PropTypes from 'prop-types'
import React, { useEffect, useState, createRef } from 'react'
import classNames from 'classnames'
import DatePicker from 'react-datepicker'
import GiftedChat from 'reactjs-simple-gifted-chat';

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
import { DocsLink } from 'src/reusable'
import { CategoryAction, ProviderMessagesAction } from 'src/redux-store/actions'
import { connect } from 'react-redux'
import { ImageUpload } from 'src/utils/api_calls'
import { missingFieldsCheckOut } from 'src/utils/globalFunction'
import { toast } from 'react-toastify'
import axios from 'axios'
const Category = (props) => {
  const [state, setState] = useState({
    name_ar: '',
    img: '',
    loading: false,
    messages: [],
    providerMessageDetails: [],
    isFetching: false
  })
  const [status, setStatus] = useState(false)
  useEffect(() => {
    // signup()
    if (props.token) {
      if (props.match?.params?.id) {
        props.GetMessageDetails(props.match?.params?.id, props.token)
      } else {
        // props.history.push('/providerMessagesDetails')
      }
    }
  }, [])


  useEffect(() => {
    if (props.providerMessagesDetails) {
      let { providerMessagesDetails } = props
      setState({
        ...state,
        // providerMessageDetails: providerMessagesDetails,

        providerMessageDetails: providerMessagesDetails.map((item, i) => {
          return {
            _id: 1,
            content: { text: 'Hello developer' },
            createdAt: new Date(),
            user: {
              _id: 30,
              name: 'React',
              avatar: 'https://facebook.github.io/react/img/logo_og.png',
            }
          }
        })
        // name_ar: providerMessagesDetails.name_ar,
        // img: providerMessagesDetails.img,
      })
      // console.log(providerMessagesDetails.status == 1)
      // setStatus(providerMessagesDetails.status == 1)
    }
  }, [props.providerMessagesDetails])

  const onSend = (message) => {
    const messages = state.mesages.slice(0)
    messages.splice(0, 0, { _id: 100, content: { text: message }, user: { _id: 1 }, displayTime: 'Now', createdAt: new Date() })
    setState({ messages });
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

            {/* <CCol style={{ alignItems: 'center', display: 'flex' }}>Edit Category</CCol> */}
            <CCol style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <CButton
                // onClick={EditCity}
                onClick={() => props.history.goBack()}
                disabled={state.loading || props.isLoading}
                style={{ color: 'white', fontSize: 12 }}
                color={'info'}
                shape="rounded-0"
              >
                Go Back
              </CButton>
              &nbsp; &nbsp;

            </CCol>
          </CRow>
        </CCardHeader>
        {
          console.log("hello details====", state.providerMessageDetails)
        }
        <GiftedChat
          messages={state.providerMessageDetails}
          messages={[]}
          onSend={onSend}
          user={{
            _id: 1,
            name: 'User'
          }}
          hasInputField
          loadEarlier={true}
          // onLoadEarlier={() => onLoadEarlier()}
          // isLoadingEarlier={state.isFetching}
          inverted={true}
          isTyping
          // alwaysShowSend
          sendButtonText="Send"
          placeholder="Type your message"
          renderAvatarOnTop
          showAvatarForEveryMessage={false}
          showUserAvatar
          showReceipientAvatar={false}
          avatarSize={70}
          // messageIdGenerator={uuidv3}
          renderAccessory={null}
          timezone="America/Los_Angeles"
          timeFormat="HH:mm"
          dateFormat="YYYY/MM/DD"
          maxInputLength="400"
          renderTextInput={props => {
            // By default GiftedChat uses textarea, override that here using react-textarea-autosize
            return <input {...props} minRows={1} maxRows={5} />
          }}
          textInputStyle={{ margin: 10 }}
          textStyle={{ fontSize: 15 }}
          imageStyle={{ width: 500 }}
          timeStyle={{ fontSize: 12 }}
          dateStyle={{ fontSize: 18 }}
          sendButtonStyle={{ backgroundColor: 'blue', fontSize: 16 }}
          sendButtonDisabledStyle={{ backgrounColor: 'gray' }}
          renderChatEmpty={() => <div>No Messages</div>}
        />


      </CCard>
    </>
  )
}

Category.propTypes = {
  UpdateCity: PropTypes.func,
  GetMessageDetails: PropTypes.func,
  token: PropTypes.string,
  isLoading: PropTypes.bool,
  history: PropTypes.object,
  match: PropTypes.object,
  providerMessagesDetails: PropTypes.object,
}

const mapStateToProp = (state) => ({
  isLoading: state.ProviderMessagesReducer.isLoading,
  token: state.AuthReducer.token,
  providerMessagesDetails: state.ProviderMessagesReducer.providerMessagesDetails,
})

const mapDispatchToProps = {
  GetMessageDetails: ProviderMessagesAction.GetMessageDetails,
  // UpdateCity: ProviderMessagesAction.UpdateCity,
}

export default connect(mapStateToProp, mapDispatchToProps)(Category)
