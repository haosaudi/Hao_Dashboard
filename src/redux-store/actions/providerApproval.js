import { POST, GET, DELETE, PUT } from "src/utils/api_calls";
import { ActionType } from "../actions";
import { toast } from "react-toastify";
export default class CategoryAction {
  static GetAllProviderRequests = (token) => {
    return async (dispatch) => {
      console.log("get Provider Request data in Action", token);
      dispatch({ type: ActionType.GET_ALL_REQUESTS });
      await GET("request", token).then((data) => {
        if (data) {
          console.log("GOT THE GET_ALL_REQUESTS ALL!!", data);
          dispatch({
            type: ActionType.GET_ALL_REQUESTS_SUCCESS,
            payload: data.data,
          });
        } else {
          dispatch({ type: ActionType.GET_ALL_REQUESTS_FAIL });
        }
      });
    };
  };
  static GetProviderRequestById = (id, token) => {
    return async (dispatch) => {
      console.log("get providerRequests by id data in Action", token);
      dispatch({ type: ActionType.GET_REQUEST });
      await GET(`request/${id}`, token).then((data) => {
        if (data) {
          console.log("GOT THE REQUEST ID!!", data);
          dispatch({
            type: ActionType.GET_REQUEST_SUCCESS,
            payload: data.data,
          });
        } else {
          dispatch({ type: ActionType.GET_REQUEST_FAIL });
        }
      });
    };
  };
  static AddProviderRequest = (data, token, history) => {
    return async (dispatch) => {
      console.log("post request data in Action", data);
      dispatch({ type: ActionType.REQUEST_ADD });
      await POST("request", data, token).then((data) => {
        if (data) {
          console.log("ADD THE REQUEST", data);
          toast("REQUEST ADDED SUCCESSFULLY");
          dispatch({ type: ActionType.REQUEST_ADD_SUCCESS });
          history.push("/request");
        } else {
          dispatch({ type: ActionType.REQUEST_ADD_FAIL });
        }
      });
    };
  };
  static UpdateProviderRequest = (id, data, token, history) => {
    return async (dispatch) => {
      console.log("update request data in Action", data);
      dispatch({ type: ActionType.REQUEST_UPDATE });
      await PUT(`request/${id}`, data, token).then((data) => {
        if (data) {
          console.log("UPDATE THE REQUEST", data);
          toast("REQUEST UPDATED SUCCESSFULLY");
          dispatch({ type: ActionType.REQUEST_UPDATE_SUCCESS });
          history.push("/request");
        } else {
          dispatch({ type: ActionType.REQUEST_UPDATE_FAIL });
        }
      });
    };
  };
  static DeleteProviderRequest = (id, token, history) => {
    return async (dispatch) => {
      console.log("delete request data in Action", id);
      dispatch({ type: ActionType.REQUEST_DELETE });
      await DELETE(`request/${id}`, token).then((data) => {
        if (data) {
          console.log("DELETE THE REQUEST", data);
          toast("REQUEST DELETED SUCCESSFULLY");
          dispatch({ type: ActionType.REQUEST_DELETE_SUCCESS });
        } else {
          dispatch({ type: ActionType.REQUEST_DELETE_FAIL });
        }
      });
    };
  };
}
