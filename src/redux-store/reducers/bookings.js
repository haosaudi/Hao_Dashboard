import { ActionType } from '../actions'

const initialState = {
  isLoading: false,
  bookingsStats: [],
  bookingStats: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_ALL_BOOKING:
      return { ...state, isLoading: true }
    case ActionType.GET_ALL_BOOKING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        bookingsStats: action.payload,
      }
    case ActionType.GET_ALL_BOOKING_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case ActionType.GET_BOOKING:
      return { ...state, isLoading: true, bookingStats: {} }
    case ActionType.GET_BOOKING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        bookingsStats: action.payload,
      }
    case ActionType.GET_BOOKING_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case ActionType.BOOKING_ADD:
      return { ...state, isLoading: true }
    case ActionType.BOOKING_ADD_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case ActionType.BOOKING_ADD_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case ActionType.BOOKING_UPDATE:
      return { ...state, isLoading: true }
    case ActionType.BOOKING_UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case ActionType.BOOKING_UPDATE_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case ActionType.BOOKING_DELETE:
      return { ...state, isLoading: true }
    case ActionType.BOOKING_DELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case ActionType.BOOKING_DELETE_FAIL:
      return {
        ...state,
        isLoading: false,
      }

    default:
      return state
  }
}
