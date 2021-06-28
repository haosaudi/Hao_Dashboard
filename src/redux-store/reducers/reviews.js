import { ActionType } from '../actions'

const initialState = {
  isLoading: false,
  reviews: [],
  review: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_ALL_REVIEWS:
      return { ...state, isLoading: true }
    case ActionType.GET_ALL_REVIEWS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        reviews: action.payload,
      }
    case ActionType.GET_ALL_REVIEWS_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case ActionType.GET_REVIEWS:
      return { ...state, isLoading: true, review: {} }
    case ActionType.GET_REVIEWS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        review: action.payload,
      }
    case ActionType.GET_REVIEWS_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case ActionType.REVIEWS_ADD:
      return { ...state, isLoading: true }
    case ActionType.REVIEWS_ADD_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case ActionType.REVIEWS_ADD_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case ActionType.REVIEWS_UPDATE:
      return { ...state, isLoading: true }
    case ActionType.REVIEWS_UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case ActionType.REVIEWS_UPDATE_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case ActionType.REVIEWS_DELETE:
      return { ...state, isLoading: true }
    case ActionType.REVIEWS_DELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case ActionType.REVIEWS_DELETE_FAIL:
      return {
        ...state,
        isLoading: false,
      }

    default:
      return state
  }
}
