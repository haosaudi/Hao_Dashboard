import { ActionType } from '../actions'

const initialState = {
  isLoading: false,
  categories: [],
  category: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_ALL_CATEGORIES:
      return { ...state, isLoading: true }
    case ActionType.GET_ALL_CATEGORIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        categories: action.payload,
      }
    case ActionType.GET_ALL_CATEGORIES_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case ActionType.GET_CATEGORY:
      return { ...state, isLoading: true, category: {} }
    case ActionType.GET_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        category: action.payload,
      }
    case ActionType.GET_CATEGORY_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case ActionType.CATEGORY_ADD:
      return { ...state, isLoading: true }
    case ActionType.CATEGORY_ADD_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case ActionType.CATEGORY_ADD_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case ActionType.CATEGORY_UPDATE:
      return { ...state, isLoading: true }
    case ActionType.CATEGORY_UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case ActionType.CATEGORY_UPDATE_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case ActionType.CATEGORY_DELETE:
      return { ...state, isLoading: true }
    case ActionType.CATEGORY_DELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case ActionType.CATEGORY_DELETE_FAIL:
      return {
        ...state,
        isLoading: false,
      }

    default:
      return state
  }
}
