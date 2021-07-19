import { POST, GET, DELETE, PUT } from "src/utils/api_calls";
import { ActionType } from "../../actions";
import { toast } from "react-toastify";
export default class CategoryAction {
    static GetProviderAllExperiences = (token) => {
        return async (dispatch) => {
            console.log("get GetProviderAllExperiences data in Action", token);
            // dispatch({ type: ActionType.GET_ALL_PROVIDER_EXPERIENCES });
            await GET("experience/provider", token).then((data) => {
                if (data) {
                    console.log("GOT THE EXPERIENCES ALL!!", data?.data);
                    dispatch({
                        type: ActionType.GET_ALL_PROVIDER_EXPERIENCES_SUCCESS,
                        payload: data.data,
                    });
                } else {
                    // dispatch({ type: ActionType.GET_ALL_PROVIDER_EXPERIENCES_FAIL });
                }
            });
        };
    };
    static GetExperienceById = (id, token) => {
        return async (dispatch) => {
            console.log("get experience by id data in Action", token);
            dispatch({ type: ActionType.GET_PROVIDER_EXPERIENCE });
            await GET(`experience/${id}`, token).then((data) => {
                if (data) {
                    console.log("GOT THE EXPERIENCE ID!!------", data.data);
                    dispatch({
                        type: ActionType.GET_PROVIDER_EXPERIENCE_SUCCESS,
                        payload: data.data,
                    });
                } else {
                    dispatch({ type: ActionType.GET_PROVIDER_EXPERIENCE_FAIL });
                }
            });
        };
    };
    static AddExperience = (data, token, history) => {
        return async (dispatch) => {
            console.log("post experience data in Action", data);
            dispatch({ type: ActionType.PROVIDER_EXPERIENCE_ADD });
            await POST("experience", data, token).then((data) => {
                if (data) {
                    console.log("ADD THE EXPERIENCE", data);
                    toast("EXPERIENCE ADDED SUCCESSFULLY");
                    dispatch({ type: ActionType.PROVIDER_EXPERIENCE_ADD_SUCCESS });
                    history.push("/myexperience");
                } else {
                    dispatch({ type: ActionType.PROVIDER_EXPERIENCE_ADD_FAIL });
                }
            });
        };
    };


    static CreateSession = (data, token, history) => {
        return async (dispatch) => {
            console.log("post experience data in Action", data);
            dispatch({ type: ActionType.PROVIDER_EXPERIENCE_ADD });
            await POST("session", data, token).then((data) => {
                if (data) {
                    toast("EXPERIENCE ADDED SUCCESSFULLY");
                    dispatch({ type: ActionType.PROVIDER_EXPERIENCE_ADD_SUCCESS });
                    history.goBack()
                    // history.push("/myexperience");
                } else {
                    dispatch({ type: ActionType.PROVIDER_EXPERIENCE_ADD_FAIL });
                }
            });
        };
    }

    static ShowMySessions = (data) => {
        return async (dispatch) => {
            dispatch({ type: ActionType.GET_MY_EXPERIENCE_SESSION, payload: data });
        };
    };

    static UpdateExperience = (id, data, token, history) => {
        return async (dispatch) => {
            console.log("update experience data in Action", data);
            dispatch({ type: ActionType.EXPERIENCE_UPDATE });
            await PUT(`experience/${id}`, data, token).then((data) => {
                if (data) {
                    console.log("UPDATE THE EXPERIENCE", data);
                    toast("EXPERIENCE UPDATED SUCCESSFULLY");
                    dispatch({ type: ActionType.EXPERIENCE_UPDATE_SUCCESS });
                    history.push("/myexperience");
                } else {
                    dispatch({ type: ActionType.EXPERIENCE_UPDATE_FAIL });
                }
            });
        };
    };
    static CreateExpeirence = (id, data, token, history) => {
        return async (dispatch) => {
            console.log("update experience data in Action", data);
            dispatch({ type: ActionType.EXPERIENCE_UPDATE });
            await POST(`experience/${id}`, data, token).then((data) => {
                if (data) {
                    console.log("UPDATE THE EXPERIENCE", data);
                    toast("EXPERIENCE UPDATED SUCCESSFULLY");
                    dispatch({ type: ActionType.EXPERIENCE_UPDATE_SUCCESS });
                    history.push("/myexperience");
                } else {
                    dispatch({ type: ActionType.EXPERIENCE_UPDATE_FAIL });
                }
            });
        };
    };
    static DeleteExperience = (id, token, history) => {
        return async (dispatch) => {
            console.log("delete experience data in Action", id);
            dispatch({ type: ActionType.EXPERIENCE_DELETE });
            await DELETE(`experience/${id}`, token).then((data) => {
                if (data) {
                    console.log("DELETE THE EXPERIENCE", data);
                    toast("EXPERIENCE DELETED SUCCESSFULLY");
                    dispatch({ type: ActionType.EXPERIENCE_DELETE_SUCCESS });
                } else {
                    dispatch({ type: ActionType.EXPERIENCE_DELETE_FAIL });
                }
            });
        };
    };
}
