import { POST, GET, DELETE, PUT } from "src/utils/api_calls";
import { ActionType } from ".";
import { toast } from "react-toastify";
export default class BookingAction {
  static GetAllSessions = (token) => {
    return async (dispatch) => {
      console.log("get GetAllGroupBooking data in Action", token);
      dispatch({ type: ActionType.GET_ALL_SESSIONS });
      await GET("session?limit=9999", token).then((data) => {
        if (data) {
          console.log("GOT THE GetAllGroupGROUPBooking ALL!!", data);
          dispatch({
            type: ActionType.GET_ALL_SESSIONS_SUCCESS,
            payload: data.data,
          });
        } else {
          dispatch({ type: ActionType.GET_ALL_SESSIONS_FAIL });
        }
      });
    };
  };

  static GetSessionsById = (id, token) => {
    return async (dispatch) => {
      console.log("get Sessions by id data in Action=p==", token);
      dispatch({ type: ActionType.GET_SESSIONS });
      await GET(`session/detail/${id}`, token).then((data) => {
        if (data) {
          console.log("GOT THE GROUPBOOKING ID!!", data);
          dispatch({
            type: ActionType.GET_SESSIONS_SUCCESS,
            payload: data?.data,
          });
        } else {
          dispatch({ type: ActionType.GET_SESSIONS_FAIL });
        }
      })
    }
  }


  static Attendees = (id, token) => {
    return async (dispatch) => {
      dispatch({ type: ActionType.GET_ATTENDEES })
      await GET(`session/detail/${id}`, token).then((data) => {
        if (data) {
          dispatch({ type: ActionType.GET_ATTENDEES_SUCCESS, payload: data?.data })
        } else {
          dispatch({ type: ActionType.GET_ATTENDEES_FAIL })
        }
      })
    }
  }



  static RejectGroupBooking = (id, token, history) => {
    return async (dispatch) => {
      // console.log('update RejectGroupBooking data in Action', data)
      dispatch({ type: ActionType.GROUPBOOKING_APPROVED });
      await POST(`groupBooking/accept/${id}`, null, token).then((data) => {
        if (data) {
          history.push("/groupbooking");
          console.log("UPDATE THE BOOKING", data);
          toast("APPROVED  SUCCESSFULLY");
          dispatch({ type: ActionType.GROUPBOOKING_APPROVED_SUCCESS });
          history.push("/bookings");
        } else {
          dispatch({ type: ActionType.GROUPBOOKING_UPDATE_FAIL });
        }
      });
    };
  };
  static ApprovedGroupBooking = (id, data, token, history) => {
    return async (dispatch) => {
      // console.log('update RejectGroupBooking data in Action', data)
      dispatch({ type: ActionType.GROUPBOOKING_REJECT });
      await POST(`groupBooking/accept/${id}`, data, token).then((data) => {
        if (data) {
          console.log("UPDATE THE BOOKING", data);
          toast("APPROVED  SUCCESSFULLY");
          history.push("/groupbooking");
        } else {
          dispatch({ type: ActionType.GROUPBOOKING_UPDATE_FAIL });
        }
      });
    };
  };
  static CreateGroupBooking = (data, token, history) => {
    return async (dispatch) => {
      // console.log('update RejectGroupBooking data in Action', data)
      dispatch({ type: ActionType.GROUPBOOKING_CREATE });
      await POST(`groupBooking`, data, token).then((data) => {
        if (data) {
          console.log("UPDATE THE BOOKING", data);
          toast("CREATED  SUCCESSFULLY");
          dispatch({ type: ActionType.GROUPBOOKING_CREATE_SUCCESS });

          history.push("/groupbooking");
        } else {
          dispatch({ type: ActionType.GROUPBOOKING_CREATE_FAIL });
        }
      });
    };
  };

  static UpdateBooking = (id, data, token, history) => {
    return async (dispatch) => {
      console.log("update BOOKING data in Action", data);
      dispatch({ type: ActionType.GROUPBOOKING_UPDATE });
      await PUT(`booking/${id}`, data, token).then((data) => {
        if (data) {
          console.log("UPDATE THE GROUPBOOKING", data);
          toast("GROUPBOOKING UPDATED SUCCESSFULLY");
          dispatch({ type: ActionType.GROUPBOOKING_UPDATE_SUCCESS });
          // history.push('/gr')
        } else {
          dispatch({ type: ActionType.GROUPBOOKING_UPDATE_FAIL });
        }
      });
    };
  };
  static UpdateSession = (id, data, token, history) => {
    return async (dispatch) => {
      console.log("update BOOKING data in Action", data);
      dispatch({ type: ActionType.SESSIONS_UPDATE });
      await PUT(`session/${id}`, data, token).then((data) => {
        if (data) {
          console.log("UPDATE THE SESSION", data);
          toast("SESSIONS UPDATED SUCCESSFULLY");
          dispatch({ type: ActionType.SESSIONS_UPDATE_SUCCESS });
          history.goBack();
          // history.push('/gr')
        } else {
          dispatch({ type: ActionType.SESSIONS_UPDATE_FAIL });
        }
      });
    };
  };
  static DeleteSession = (id, token, history) => {
    console.log("REDUX ID ", id);
    return async (dispatch) => {
      console.log("delete SESSIONS_DELETE data in Action", id);
      dispatch({ type: ActionType.SESSIONS_DELETE });
      await DELETE(`session/${id}`, token).then((data) => {
        if (data) {
          console.log("DELETE THE SESSIONS_DELETE", data);
          toast("SESSIONS_DELETE DELETED SUCCESSFULLY");
          dispatch({ type: ActionType.SESSIONS_DELETE_SUCCESS });
        } else {
          dispatch({ type: ActionType.SESSIONS_DELETE_FAIL });
        }
      });
    };
  };
}
