import { ActionType } from "../../actions";

const initialState = {
    isLoading: false,
    experiences: [],
    experience: {},
    mySessions: [],
    attendees:[],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ActionType.GET_ALL_EXPERIENCES:
            return { ...state, isLoading: true };
        case ActionType.GET_ALL_PROVIDER_EXPERIENCES_SUCCESS:
            console.log("action type===", action.payload)
            return {
                ...state,
                isLoading: false,
                experiences: action.payload,
            };
        case ActionType.GET_MY_EXPERIENCE_SESSION:
            return {
                ...state,
                mySessions: action.payload,
            };
        case ActionType.GET_ALL_EXPERIENCES_FAIL:
            return {
                ...state,
                isLoading: false,
            };
        case ActionType.GET_EXPERIENCE:
            return { ...state, isLoading: true, category: {} };
        case ActionType.GET_PROVIDER_EXPERIENCE_SUCCESS:
            console.log("GET_PROVIDER_EXPERIENCE_SUCCESS")
            return {
                ...state,
                isLoading: false,
                experience: action.payload,
            };
        case ActionType.GET_EXPERIENCE_FAIL:
            return {
                ...state,
                isLoading: false,
            };
        case ActionType.EXPERIENCE_ADD:
            return { ...state, isLoading: true };
        case ActionType.EXPERIENCE_ADD_SUCCESS:
            return {
                ...state,
                isLoading: false,
            };
        case ActionType.EXPERIENCE_ADD_FAIL:
            return {
                ...state,
                isLoading: false,
            };
        case ActionType.EXPERIENCE_UPDATE:
            return { ...state, isLoading: true };
        case ActionType.EXPERIENCE_UPDATE_SUCCESS:
            return {
                ...state,
                isLoading: false,
            };
        case ActionType.EXPERIENCE_UPDATE_FAIL:
            return {
                ...state,
                isLoading: false,
            };
        case ActionType.EXPERIENCE_DELETE:
            return { ...state, isLoading: true };
        case ActionType.EXPERIENCE_DELETE_SUCCESS:
            return {
                ...state,
                isLoading: false,
            };
        case ActionType.EXPERIENCE_DELETE_FAIL:
            return {
                ...state,
                isLoading: false,
            };
    
        case ActionType.GET_ATTENDEES:
            return {
                ...state,
                isLoading:true
            }
        case ActionType.GET_ATTENDEES_SUCCESS:
            return {
                ...state,
                attendees:action.payload,
                isLoading:false
            }
        case ActionType.GET_ATTENDEES_FAIL:
            return {
                ...state,
                attendees:action.payload,
                isLoading:false
            }
        default:
            return state;
    }
};
