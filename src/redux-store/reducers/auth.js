import { ActionType } from '../actions'

const initialState = {
  isLoading: false,
  userData: {},
  token: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    // ========SignUp Reducer=====

    case ActionType.LOGOUT:
      return { ...initialState }
    case ActionType.SIGNIN:
      return { ...state, isLoading: true }
    case ActionType.SIGNIN_SUCCESS:
      // console.log('  action.payload.token', action.payload.token)
      return {
        ...state,
        isLoading: false,
        userData: action.payload.data,
        token: action.payload.token,
      }
    case ActionType.SIGNIN_FAIL:
      return {
        ...state,
        isLoading: false,
        token: false,
        userData: {},
      }

    default:
      return state
  }
}
