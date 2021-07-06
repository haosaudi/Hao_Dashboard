import { POST, GET, DELETE, PUT } from "src/utils/api_calls";
import { ActionType } from ".";
import { toast } from "react-toastify";
export default class BookingAction {
  static GetAllBookings = (token) => {
    return async (dispatch) => {
      console.log("get BOOKING data in Action", token);
      dispatch({ type: ActionType.GET_ALL_BOOKING });
      await GET("booking", token).then((data) => {
        if (data) {
          console.log("GOT THE BOOKINGS ALL!!", data);
          dispatch({
            type: ActionType.GET_ALL_BOOKING_SUCCESS,
            payload: data.data,
          });
        } else {
          dispatch({ type: ActionType.GET_ALL_BOOKING_FAIL });
        }
      });
    };
  };
  static GetAllRefundsBookings = (token) => {
    return async (dispatch) => {
      console.log("get REFUNDS data in Action", token);
      dispatch({ type: ActionType.GET_ALL_BOOKING_REFUNDS });
      await GET("booking/refunds", token).then((data) => {
        if (data) {
          console.log("GOT THE REFUNDS ALL!!", data);
          dispatch({
            type: ActionType.GET_ALL_BOOKING_REFUNDS_SUCCESS,
            payload: data.data,
          });
        } else {
          dispatch({ type: ActionType.GET_ALL_BOOKING_REFUNDS_FAIL });
        }
      });
    };
  };
  static GetAllFinance = (token, data) => {
    return async (dispatch) => {
      console.log("get FINANCE data in Action", token);
      dispatch({ type: ActionType.GET_ALL_FINANCE });
      await POST("booking/finance", data, token).then((data) => {
        if (data) {
          console.log("GOT THE FINANCE ALL!!", data);
          dispatch({
            type: ActionType.GET_ALL_FINANCE_SUCCESS,
            payload: data.data,
          });
        } else {
          dispatch({ type: ActionType.GET_ALL_FINANCE_FAIL });
        }
      });
    };
  };
  static GetBookingById = (id, token) => {
    return async (dispatch) => {
      console.log("get Booking by id data in Action", token);
      dispatch({ type: ActionType.GET_BOOKING });
      await GET(`Booking/detail/${id}`, token).then((data) => {
        if (data) {
          console.log("GOT THE BOOKING ID!!", data);
          dispatch({
            type: ActionType.GET_BOOKING_SUCCESS,
            payload: data.data,
          });
        } else {
          dispatch({ type: ActionType.GET_BOOKING_FAIL });
        }
      });
    };
  };

  static UpdateBooking = (id, data, token, history) => {
    return async (dispatch) => {
      console.log("update BOOKING data in Action", data);
      dispatch({ type: ActionType.BOOKING_UPDATE });
      await PUT(`booking/${id}`, data, token).then((data) => {
        if (data) {
          console.log("UPDATE THE BOOKING", data);
          toast("BOOKING UPDATED SUCCESSFULLY");
          dispatch({ type: ActionType.BOOKING_UPDATE_SUCCESS });
          history.push("/bookings");
        } else {
          dispatch({ type: ActionType.BOOKING_UPDATE_FAIL });
        }
      });
    };
  };
}
