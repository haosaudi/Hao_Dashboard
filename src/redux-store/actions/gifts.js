import { POST, GET, DELETE, PUT } from "src/utils/api_calls";
import { ActionType } from "../actions";
import { toast } from "react-toastify";
export default class GiftsAction {
  static GetAllGifts = (token) => {
    return async (dispatch) => {
      console.log("get gifts data in Action", token);
      dispatch({ type: ActionType.GET_ALL_GIFTS });
      await GET("giftCard", token).then((data) => {
        if (data) {
          dispatch({
            type: ActionType.GET_ALL_GIFTS_SUCCESS,
            payload: data.data,
          });
        } else {
          dispatch({ type: ActionType.GET_ALL_GIFTS_FAIL });
        }
      });
    };
  };
}
