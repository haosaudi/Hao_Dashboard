import { ActionType } from "../actions";

const initialState = {
  isLoading: false,
  designs: [],
  design: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_ALL_EMAIL_DESIGN:
      return { ...state, isLoading: true };
    case ActionType.GET_ALL_EMAIL_DESIGN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        designs: action.payload,
      };
    case ActionType.GET_ALL_EMAIL_DESIGN_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case ActionType.GET_EMAIL_DESIGN:
      return { ...state, isLoading: true, category: {} };
    case ActionType.GET_EMAIL_DESIGN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        design: action.payload,
      };
    case ActionType.GET_EMAIL_DESIGN_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case ActionType.EMAIL_DESIGN_sADD:
      return { ...state, isLoading: true };
    case ActionType.EMAIL_DESIGN_sADD_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case ActionType.EMAIL_DESIGN_sADD_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case ActionType.EMAIL_DESIGN_sUPDATE:
      return { ...state, isLoading: true };
    case ActionType.EMAIL_DESIGN_sUPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case ActionType.EMAIL_DESIGN_sUPDATE_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case ActionType.EMAIL_DESIGN_sDELETE:
      return { ...state, isLoading: true };
    case ActionType.EMAIL_DESIGN_sDELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case ActionType.EMAIL_DESIGN_sDELETE_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};
