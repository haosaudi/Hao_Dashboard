import { ActionType } from "../actions";

const initialState = {
  isLoading: false,
  requests: [],
  request: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_ALL_REQUESTS:
      return { ...state, isLoading: true };
    case ActionType.GET_ALL_REQUESTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        requests: action.payload,
      };
    case ActionType.GET_ALL_REQUESTS_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case ActionType.GET_REQUEST:
      return { ...state, isLoading: true, category: {} };
    case ActionType.GET_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        request: action.payload,
      };
    case ActionType.GET_REQUEST_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case ActionType.REQUEST_ADD:
      return { ...state, isLoading: true };
    case ActionType.REQUEST_ADD_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case ActionType.REQUEST_ADD_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case ActionType.REQUEST_UPDATE:
      return { ...state, isLoading: true };
    case ActionType.REQUEST_UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case ActionType.REQUEST_UPDATE_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case ActionType.REQUEST_DELETE:
      return { ...state, isLoading: true };
    case ActionType.REQUEST_DELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case ActionType.REQUEST_DELETE_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};
