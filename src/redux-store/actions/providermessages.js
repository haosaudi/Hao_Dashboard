import { POST, GET, DELETE, PUT } from 'src/utils/api_calls'
import { ActionType } from '.'
import { toast } from 'react-toastify'
export default class CategoryAction {
  static GetAllProviderMessages = (token) => {
    return async (dispatch) => {
      console.log('get category data in Action', token)
      dispatch({ type: ActionType.GET_ALL_PROVIDERMESSAGES })
      await GET('chats/getMyChats', token).then((data) => {
        if (data) {
          console.log('GOT THE CITGET_ALL_PROVIDERMESSAGES ALL!!', data)
          dispatch({ type: ActionType.GET_ALL_PROVIDERMESSAGES_SUCCESS, payload: data.data })
        } else {
          dispatch({ type: ActionType.GET_ALL_PROVIDERMESSAGES_FAIL })
        }
      })
    }
  }
  static GetMessageDetails = (id, token) => {
    return async (dispatch) => {
      console.log('get city by id data in Action', token)
      dispatch({ type: ActionType.GET_PROVIDERMESSAGES })
      await GET(`messages/getMessages/${id}`, token).then((data) => {
        if (data) {
          console.log('GOT THE CITY ID!!', data)
          dispatch({ type: ActionType.GET_PROVIDERMESSAGES_SUCCESS, payload: data.data })
        } else {
          dispatch({ type: ActionType.GET_PROVIDERMESSAGES_FAIL })
        }
      })
    }
  }


}
