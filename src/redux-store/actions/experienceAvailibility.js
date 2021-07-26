import { POST, GET, DELETE, PUT } from "src/utils/api_calls";
import { ActionType } from "../actions";
import { toast } from "react-toastify";
export default class CategoryAction {
  static GetAllExperiencesReminders = (token) => {
    return async (dispatch) => {
      console.log("get category data in Action", token);
      dispatch({ type: ActionType.GET_ALL_AVAILIBILITY_REMINDER });
      await GET("sessions/reminders/admin", token).then((data) => {
        if (data) {
          dispatch({
            type: ActionType.GET_ALL_AVAILIBILITY_REMINDER_SUCCESS,
            payload: data.data,
          });
        } else {
          dispatch({ type: ActionType.GET_ALL_AVAILIBILITY_REMINDER_FAIL });
        }
      });
    };
  };
}
