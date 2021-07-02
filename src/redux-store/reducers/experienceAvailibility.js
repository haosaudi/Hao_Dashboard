import { ActionType } from "../actions";

const initialState = {
  isLoading: false,
  experienceAvailibilties: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_ALL_AVAILIBILITY_REMINDER:
      return { ...state, isLoading: true };
    case ActionType.GET_ALL_AVAILIBILITY_REMINDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        experienceAvailibilties: action.payload,
      };
    case ActionType.GET_ALL_AVAILIBILITY_REMINDER_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};
