import { ActionType } from '../actions'

const initialState = {
  isLoading: false,
  providerMessages: [],
  providerMessagesDetails: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_ALL_PROVIDERMESSAGES:
      return { ...state, isLoading: true }
    case ActionType.GET_ALL_PROVIDERMESSAGES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        providerMessages: action.payload,
      }
    case ActionType.GET_ALL_PROVIDERMESSAGES_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case ActionType.GET_PROVIDERMESSAGES:
      return { ...state, isLoading: true, providerMessagesDetails: [] }
    case ActionType.GET_PROVIDERMESSAGES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        providerMessagesDetails: action.payload,
      }
    case ActionType.GET_PROVIDERMESSAGES_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case ActionType.PROVIDERMESSAGES_ADD:
      return { ...state, isLoading: true }
    case ActionType.PROVIDERMESSAGES_ADD_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case ActionType.PROVIDERMESSAGES_ADD_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case ActionType.PROVIDERMESSAGES_UPDATE:
      return { ...state, isLoading: true }
    case ActionType.PROVIDERMESSAGES_UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case ActionType.PROVIDERMESSAGES_UPDATE_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case ActionType.PROVIDERMESSAGES_DELETE:
      return { ...state, isLoading: true }
    case ActionType.PROVIDERMESSAGES_DELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case ActionType.PROVIDERMESSAGES_DELETE_FAIL:
      return {
        ...state,
        isLoading: false,
      }

    default:
      return state
  }
}
