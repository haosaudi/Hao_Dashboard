import { POST, GET, DELETE, PUT } from "src/utils/api_calls";
import { ActionType } from "../actions";
import { toast } from "react-toastify";
export default class CategoryAction {
  static GetAllExperiences = (token) => {
    return async (dispatch) => {
      console.log("get experience data in Action", token);
      dispatch({ type: ActionType.GET_ALL_EXPERIENCES });
      await GET("experience/admin", token).then((data) => {
        if (data) {
          console.log("GOT THE EXPERIENCES ALL!!", data);
          dispatch({
            type: ActionType.GET_ALL_EXPERIENCES_SUCCESS,
            payload: data.data,
          });
        } else {
          dispatch({ type: ActionType.GET_ALL_EXPERIENCES_FAIL });
        }
      });
    };
  };
  static GetExperienceById = (id, token) => {
    return async (dispatch) => {
      console.log("get experience by id data in Action", token);
      dispatch({ type: ActionType.GET_EXPERIENCE });
      await GET(`experience/${id}`, token).then((data) => {
        if (data) {
          console.log("GOT THE EXPERIENCE ID!!", data);
          dispatch({
            type: ActionType.GET_EXPERIENCE_SUCCESS,
            payload: data.data,
          });
        } else {
          dispatch({ type: ActionType.GET_EXPERIENCE_FAIL });
        }
      });
    };
  };
  static AddExperience = (data, token, history) => {
    return async (dispatch) => {
      console.log("post experience data in Action", data);
      dispatch({ type: ActionType.EXPERIENCE_ADD });
      await POST("experience", data, token).then((data) => {
        if (data) {
          console.log("ADD THE EXPERIENCE", data);
          toast("EXPERIENCE ADDED SUCCESSFULLY");
          dispatch({ type: ActionType.EXPERIENCE_ADD_SUCCESS });
          history.push("/experience");
        } else {
          dispatch({ type: ActionType.EXPERIENCE_ADD_FAIL });
        }
      });
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
          history.push("/experience");
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
