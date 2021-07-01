import { ActionType } from "../actions";

const initialState = {
  isLoading: false,
  users: [],
  user: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_ALL_USERS:
      return { ...state, isLoading: true };
    case ActionType.GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: action.payload,
      };
    case ActionType.GET_ALL_USERS_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case ActionType.GET_USER:
      return { ...state, isLoading: true, user: {} };
    case ActionType.GET_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };
    case ActionType.GET_USER_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case ActionType.USER_ADD:
      return { ...state, isLoading: true };
    case ActionType.USER_ADD_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case ActionType.USER_ADD_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case ActionType.USER_UPDATE:
      return { ...state, isLoading: true };
    case ActionType.USER_UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case ActionType.USER_UPDATE_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case ActionType.USER_DELETE:
      return { ...state, isLoading: true };
    case ActionType.USER_DELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case ActionType.USER_DELETE_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};
