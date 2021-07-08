import { POST } from 'src/utils/api_calls'
import { ActionType } from '../actions'
import { toast } from 'react-toastify'
export default class AuthAction {
  static Signin = (data) => {
    return async (dispatch) => {
      console.log('signin data in Action', data)
      dispatch({ type: ActionType.SIGNIN })
      await POST('login', data).then((data) => {
        if (data) {
          console.log('Signin Response data', data)
          if (data.data.role == 'SiteAdmin' || data.data.role == "Provider") {
            dispatch({ type: ActionType.SIGNIN_SUCCESS, payload: data })
            toast('LOGIN SUCCESSFULLY')
          } else {
            dispatch({ type: ActionType.SIGNIN_FAIL })
            toast('Only admin can access')
          }
        } else {
          dispatch({ type: ActionType.SIGNIN_FAIL })
        }
      })
    }
  }
  static Logout = () => {
    return (dispatch) => {
      dispatch({ type: ActionType.LOGOUT })
    }
  }
}
