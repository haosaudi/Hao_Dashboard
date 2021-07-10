

import PropTypes from 'prop-types'
import React, { useEffect, useState, createRef } from 'react'
import classNames from 'classnames'
import DatePicker from 'react-datepicker'
import GiftedChat from 'reactjs-simple-gifted-chat';
// import { GiftedChat } from 'react-web-gifted-chat';
import { Chat } from "@progress/kendo-react-conversational-ui";


//  




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
  const [messages, setMessages] = React.useState([]);

  const addNewMessage = (event) => {
    // console.log("Event============", event,props.)


    setState({ ...state, providerMessageDetails: [...state.providerMessageDetails, event.message] });
    _ApiCallSendMessage(event)



  };

  const _ApiCallSendMessage = (event) => {
    console.log("Event============", event)
    let data = {
      chat_id: props.match?.params?.id,
      message: event?.message?.text,
    }
    props.SendMessages(data, props.token)
    console.log("Event============data", data)


  }


  const MessageTemplate = (props) => {
    return (
      <div className="k-bubble">
        <div>{props.item.text}</div>
      </div>
    );
  };


  const user = {
    id: String(props.userData.id),
    name: props.userData.first_name,
    avatarUrl: props.userData.profile_img,
  };

  useEffect(() => {
    console.log("USER", props.userData)
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
        providerMessageDetails: providerMessagesDetails.map((item, i) => {
          return {
            author: { id: item.message_by, name: item.first_name, avatarUrl: item.profile_img },
            // selectionIndex: i,
            text: item.message,
            timestamp: new Date(item.created_at)
          }
        })

      })


    }
  }, [props.providerMessagesDetails])


  return (
    <>
      <Chat
        user={user}
        messages={state.providerMessageDetails}
        onMessageSend={addNewMessage}
        width={'100%'}

        messageTemplate={MessageTemplate}
      />
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
  userData: state.AuthReducer.userData,
  providerMessagesDetails: state.ProviderMessagesReducer.providerMessagesDetails,
})

const mapDispatchToProps = {
  GetMessageDetails: ProviderMessagesAction.GetMessageDetails,
  SendMessages: ProviderMessagesAction.SendMessages,
  // UpdateCity: ProviderMessagesAction.UpdateCity,
}

export default connect(mapStateToProp, mapDispatchToProps)(Category)
