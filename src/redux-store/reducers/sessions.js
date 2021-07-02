import { ActionType } from '../actions'

const initialState = {
  isLoading: false,
  sessions: [],
  sessionDetails: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_ALL_SESSIONS:
      return { ...state, isLoading: true }
    case ActionType.GET_ALL_SESSIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        sessions: action.payload,
      }
    case ActionType.GET_ALL_SESSIONS_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case ActionType.GET_SESSIONS:

      return { ...state, isLoading: true, sessionDetails: {} }


    case ActionType.GET_SESSIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        sessionDetails: action.payload,
      }
    case ActionType.GET_SESSIONS_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case ActionType.SESSIONS_ADD:
      return { ...state, isLoading: true }
    case ActionType.SESSIONS_ADD_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case ActionType.SESSIONS_ADD_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case ActionType.SESSIONS_UPDATE:
      return { ...state, isLoading: true }
    case ActionType.SESSIONS_UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case ActionType.SESSIONS_UPDATE_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case ActionType.SESSIONS_DELETE:
      return { ...state, isLoading: true }
    case ActionType.SESSIONS_DELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case ActionType.SESSIONS_DELETE_FAIL:
      return {
        ...state,
        isLoading: false,
      }

    default:
      return state
  }
}
