import { POST, GET, DELETE, PUT } from "src/utils/api_calls";
import { ActionType } from ".";
import { toast } from "react-toastify";
export default class BookingAction {
  static GetAllEmailDesigns = (token) => {
    return async (dispatch) => {
      console.log("get Email Design data in Action", token);
      dispatch({ type: ActionType.GET_ALL_EMAIL_DESIGN });
      await GET("email/design", token).then((data) => {
        if (data) {
          console.log("GOT THE EMAIL DESIGNS ALL!!", data);
          dispatch({
            type: ActionType.GET_ALL_EMAIL_DESIGN_SUCCESS,
            payload: data.data,
          });
        } else {
          dispatch({ type: ActionType.GET_ALL_EMAIL_DESIGN_FAIL });
        }
      });
    };
  };
  static GetEmailDesignById = (id, token) => {
    return async (dispatch) => {
      console.log("get EMAIL DESIGN by id data in Action", token);
      dispatch({ type: ActionType.GET_EMAIL_DESIGN });
      await GET(`email/design/detail/${id}`, token).then((data) => {
        if (data) {
          console.log("GOT THE EMAIL DESIGN ID!!", data);
          dispatch({
            type: ActionType.GET_EMAIL_DESIGN_SUCCESS,
            payload: data.data,
          });
        } else {
          dispatch({ type: ActionType.GET_EMAIL_DESIGN_FAIL });
        }
      });
    };
  };
  static AddEmailDesign = (data, token, history) => {
    return async (dispatch) => {
      console.log("post email Design data in Action", data);
      dispatch({ type: ActionType.EMAIL_DESIGN_ADD });
      await POST("email/design", data, token).then((data) => {
        if (data) {
          console.log("ADD THE EMAIL DESIGN", data);
          toast("EMAIL DESIGN ADDED SUCCESSFULLY");
          dispatch({ type: ActionType.EMAIL_DESIGN_ADD_SUCCESS });
          history.goBack();
        } else {
          dispatch({ type: ActionType.EMAIL_DESIGN_ADD_FAIL });
        }
      });
    };
  };
  static UpdateEmailDesign = (id, data, token, history) => {
    return async (dispatch) => {
      console.log("update email design data in Action", data);
      dispatch({ type: ActionType.EMAIL_DESIGN_UPDATE });
      await PUT(`email/design/${id}`, data, token).then((data) => {
        if (data) {
          console.log("UPDATE THE EMAIL DESIGN", data);
          toast("EMAIL DESIGN UPDATED SUCCESSFULLY");
          dispatch({ type: ActionType.EMAIL_DESIGN_UPDATE_SUCCESS });
          history.goBack();
        } else {
          dispatch({ type: ActionType.EMAIL_DESIGN_UPDATE_FAIL });
        }
      });
    };
  };
  static DeleteEmailDesign = (id, token, history) => {
    return async (dispatch) => {
      console.log("delete email design data in Action", id);
      dispatch({ type: ActionType.EMAIL_DESIGN_DELETE });
      await DELETE(`email/design/${id}`, token).then((data) => {
        if (data) {
          console.log("DELETE THE EMAIL DESIGN", data);
          toast("EMAIL DESIGN DELETED SUCCESSFULLY");
          dispatch({ type: ActionType.EMAIL_DESIGN_DELETE_SUCCESS });
        } else {
          dispatch({ type: ActionType.EMAIL_DESIGN_DELETE_FAIL });
        }
      });
    };
  };
}
