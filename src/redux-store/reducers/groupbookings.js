import { ActionType } from '../actions'

const initialState = {
  isLoading: false,
  groupbookings: [],
  groupbooking: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_ALL_GROUPBOOKING:
      return { ...state, isLoading: true }
    case ActionType.GET_ALL_GROUPBOOKING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        groupbookings: action.payload,
      }
    case ActionType.GET_ALL_GROUPBOOKING_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case ActionType.GET_GROUPBOOKING:
      return { ...state, isLoading: true, groupbooking: {} }
    case ActionType.GET_GROUPBOOKING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        groupbooking: action.payload,
      }
    case ActionType.GET_GROUPBOOKING_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case ActionType.GROUPBOOKING_ADD:
      return { ...state, isLoading: true }
    case ActionType.GROUPBOOKING_ADD_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case ActionType.GROUPBOOKING_ADD_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case ActionType.GROUPBOOKING_UPDATE:
      return { ...state, isLoading: true }
    case ActionType.GROUPBOOKING_UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case ActionType.GROUPBOOKING_UPDATE_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case ActionType.GROUPBOOKING_DELETE:
      return { ...state, isLoading: true }
    case ActionType.GROUPBOOKING_DELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case ActionType.GROUPBOOKING_DELETE_FAIL:
      return {
        ...state,
        isLoading: false,
      }

    default:
      return state
  }
}
