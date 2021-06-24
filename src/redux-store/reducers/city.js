import { ActionType } from '../actions'

const initialState = {
  isLoading: false,
  cities: [],
  city: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_ALL_CITIES:
      return { ...state, isLoading: true }
    case ActionType.GET_ALL_CITIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      }
    case ActionType.GET_ALL_CITIES_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case ActionType.GET_CITY:
      return { ...state, isLoading: true, category: {} }
    case ActionType.GET_CITY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        city: action.payload,
      }
    case ActionType.GET_CITY_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case ActionType.CITY_ADD:
      return { ...state, isLoading: true }
    case ActionType.CITY_ADD_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case ActionType.CITY_ADD_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case ActionType.CITY_UPDATE:
      return { ...state, isLoading: true }
    case ActionType.CITY_UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case ActionType.CITY_UPDATE_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case ActionType.CITY_DELETE:
      return { ...state, isLoading: true }
    case ActionType.CITY_DELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case ActionType.CITY_DELETE_FAIL:
      return {
        ...state,
        isLoading: false,
      }

    default:
      return state
  }
}
