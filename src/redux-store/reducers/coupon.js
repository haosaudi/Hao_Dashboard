import { ActionType } from '../actions'

const initialState = {
  isLoading: false,
  coupons: [],
  coupon: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_ALL_COUPONS:
      return { ...state, isLoading: true }
    case ActionType.GET_ALL_COUPONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        coupons: action.payload,
      }
    case ActionType.GET_ALL_COUPONS_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case ActionType.GET_COUPON:
      return { ...state, isLoading: true, category: {} }
    case ActionType.GET_COUPON_SUCCESS:
      return {
        ...state,
        isLoading: false,
        coupon: action.payload,
      }
    case ActionType.GET_COUPON_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case ActionType.COUPON_ADD:
      return { ...state, isLoading: true }
    case ActionType.COUPON_ADD_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case ActionType.COUPON_ADD_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case ActionType.COUPON_UPDATE:
      return { ...state, isLoading: true }
    case ActionType.COUPON_UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case ActionType.COUPON_UPDATE_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case ActionType.COUPON_DELETE:
      return { ...state, isLoading: true }
    case ActionType.COUPON_DELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case ActionType.COUPON_DELETE_FAIL:
      return {
        ...state,
        isLoading: false,
      }

    default:
      return state
  }
}
