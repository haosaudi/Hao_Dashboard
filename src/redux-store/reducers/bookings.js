import { ActionType } from "../actions";

const initialState = {
  isLoading: false,
  bookingsStats: [],
  finances: [],
  refunds: [],
  bookingStats: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_ALL_BOOKING:
      return { ...state, isLoading: true };
    case ActionType.GET_ALL_BOOKING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        bookingsStats: action.payload,
      };
    case ActionType.GET_ALL_BOOKING_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case ActionType.GET_ALL_BOOKING_REFUNDS:
      return { ...state, isLoading: true };
    case ActionType.GET_ALL_BOOKING_REFUNDS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        refunds: action.payload,
      };
    case ActionType.GET_ALL_BOOKING_REFUNDS_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case ActionType.GET_BOOKING:
      return { ...state, isLoading: true, bookingStats: {} };
    case ActionType.GET_BOOKING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        bookingsStats: action.payload,
      };
    case ActionType.GET_BOOKING_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case ActionType.GET_ALL_FINANCE:
      return { ...state, isLoading: true, bookingStats: {} };
    case ActionType.GET_ALL_FINANCE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        finances: action.payload,
      };
    case ActionType.GET_ALL_FINANCE_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case ActionType.BOOKING_ADD:
      return { ...state, isLoading: true };
    case ActionType.BOOKING_ADD_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case ActionType.BOOKING_ADD_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case ActionType.BOOKING_UPDATE:
      return { ...state, isLoading: true };
    case ActionType.BOOKING_UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case ActionType.BOOKING_UPDATE_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case ActionType.BOOKING_DELETE:
      return { ...state, isLoading: true };
    case ActionType.BOOKING_DELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case ActionType.BOOKING_DELETE_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};
