import { ActionType } from "../actions";

const initialState = {
  isLoading: false,
  gifts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_ALL_GIFTS:
      return { ...state, isLoading: true };
    case ActionType.GET_ALL_GIFTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        gifts: action.payload,
      };
    case ActionType.GET_ALL_GIFTS_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};
