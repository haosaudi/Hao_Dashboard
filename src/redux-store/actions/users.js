import { POST, GET, DELETE, PUT } from "src/utils/api_calls";
import { ActionType } from "../actions";
import { toast } from "react-toastify";
export default class CategoryAction {
  static GetAllUsers = (token) => {
    return async (dispatch) => {
      console.log("get category data in Action", token);
      dispatch({ type: ActionType.GET_ALL_USERS });
      await GET("user?limit=50", token).then((data) => {
        if (data) {
          console.log("GOT THE USERS ALL!!", data);
          dispatch({
            type: ActionType.GET_ALL_USERS_SUCCESS,
            payload: data.data,
          });
        } else {
          dispatch({ type: ActionType.GET_ALL_USERS_FAIL });
        }
      });
    };
  };
  static GetAllProviders = (token) => {
    return async (dispatch) => {
      console.log("get category data in Action", token);
      dispatch({ type: ActionType.GET_ALL_PROVIDERS });
      await GET("user/providers?limit=50", token).then((data) => {
        if (data) {
          console.log("GOT THE PROVIDERS ALL!!", data);
          dispatch({
            type: ActionType.GET_ALL_PROVIDERS_SUCCESS,
            payload: data.data,
          });
        } else {
          dispatch({ type: ActionType.GET_ALL_PROVIDERS_FAIL });
        }
      });
    };
  };
  static GetUserById = (id, token) => {
    return async (dispatch) => {
      console.log("get user by id data in Action", token);
      dispatch({ type: ActionType.GET_USER });
      await GET(`user/detail/${id}`, token).then((data) => {
        if (data) {
          console.log("GOT THE USER ID!!", data);
          dispatch({ type: ActionType.GET_USER_SUCCESS, payload: data.data });
        } else {
          dispatch({ type: ActionType.GET_USER_FAIL });
        }
      });
    };
  };
  static AddUser = (data, token, history) => {
    return async (dispatch) => {
      console.log("post user data in Action", data);
      dispatch({ type: ActionType.USER_ADD });
      await POST("category", data, token).then((data) => {
        if (data) {
          console.log("ADD THE USER", data);
          toast("USER ADDED SUCCESSFULLY");
          dispatch({ type: ActionType.USER_ADD_SUCCESS });
          history.push("/userManagement");
        } else {
          dispatch({ type: ActionType.USER_ADD_FAIL });
        }
      });
    };
  };
  static UpdateUser = (data, token, history, isProvider) => {
    return async (dispatch) => {
      console.log("update user data in Action", data);
      dispatch({ type: ActionType.USER_UPDATE });
      await PUT(`user/admin`, data, token).then((data) => {
        if (data) {
          console.log("UPDATE THE USER", data);
          toast("USER UPDATED SUCCESSFULLY");
          dispatch({ type: ActionType.USER_UPDATE_SUCCESS });
          history.push(isProvider ? "/providerManagement" : "/userManagement");
        } else {
          dispatch({ type: ActionType.USER_UPDATE_FAIL });
        }
      });
    };
  };
  static DeleteUser = (id, token, history) => {
    return async (dispatch) => {
      console.log("delete user data in Action", id);
      dispatch({ type: ActionType.USER_DELETE });
      await DELETE(`user/${id}`, token).then((data) => {
        if (data) {
          console.log("DELETE THE USER", data);
          toast("USER DELETED SUCCESSFULLY");
          dispatch({ type: ActionType.USER_DELETE_SUCCESS });
        } else {
          dispatch({ type: ActionType.USER_DELETE_FAIL });
        }
      });
    };
  };
}
