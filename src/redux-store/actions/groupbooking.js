import { POST, GET, DELETE, PUT } from 'src/utils/api_calls'
import { ActionType } from '.'
import { toast } from 'react-toastify'
export default class BookingAction {
  static GetAllGroupBooking = (token) => {
    return async (dispatch) => {
      console.log('get GetAllGroupBooking data in Action', token)
      dispatch({ type: ActionType.GET_ALL_GROUPBOOKING })
      await GET('groupBooking', token).then((data) => {
        if (data) {
          console.log('GOT THE GetAllGroupGROUPBooking ALL!!', data)
          dispatch({ type: ActionType.GET_ALL_GROUPBOOKING_SUCCESS, payload: data.data })
        } else {
          dispatch({ type: ActionType.GET_ALL_GROUPBOOKING_FAIL })
        }
      })
    }
  }
  static GetAllGroupBookingStats = (token) => {
    return async (dispatch) => {
      console.log('get GetAllGroupBookingStats data in Action')
      dispatch({ type: ActionType.GROUPBOOKINGSTATS_CREATE })

      await GET('booking/details', token).then((data) => {
        if (data) {

          console.log('GOT THE GetAllGroupBookingStats ALL!!', data.data)

          dispatch({ type: ActionType.GROUPBOOKINGSTATS_CREATE_SUCCESS, payload: data.data })
        } else {
          // dispatch({ type: ActionType.GROUPBOOKINGSTATS_CREATE_FAIL })
        }
      })
    }
  }
  static GetBookingById = (id, token) => {
    return async (dispatch) => {
      console.log('get Booking by id data in Action', token)
      dispatch({ type: ActionType.GET_GROUPBOOKING })
      await GET(`groupBooking/detail/${id}`, token).then((data) => {
        if (data) {
          console.log('GOT THE GROUPBOOKING ID!!', data)
          dispatch({ type: ActionType.GET_GROUPBOOKING_SUCCESS, payload: data?.data })
        } else {
          dispatch({ type: ActionType.GET_GROUPBOOKING_FAIL })
        }
      })
    }
  }
  static RejectGroupBooking = (id, token, history) => {
    return async (dispatch) => {
      // console.log('update RejectGroupBooking data in Action', data)
      dispatch({ type: ActionType.GROUPBOOKING_APPROVED })
      await POST(`groupBooking/accept/${id}`, null, token).then((data) => {
        if (data) {
          history.push("/groupbooking")
          console.log('UPDATE THE BOOKING', data)
          toast('APPROVED  SUCCESSFULLY')
          dispatch({ type: ActionType.GROUPBOOKING_APPROVED_SUCCESS })
          history.push('/bookings')
        } else {
          dispatch({ type: ActionType.GROUPBOOKING_UPDATE_FAIL })
        }
      })
    }
  }
  static ApprovedGroupBooking = (id, data, token, history) => {
    return async (dispatch) => {

      // console.log('update RejectGroupBooking data in Action', data)
      dispatch({ type: ActionType.GROUPBOOKING_REJECT })
      await POST(`groupBooking/accept/${id}`, data, token).then((data) => {
        if (data) {
          console.log('UPDATE THE BOOKING', data)
          toast('APPROVED  SUCCESSFULLY')
          history.push('/groupbooking')
        } else {
          dispatch({ type: ActionType.GROUPBOOKING_UPDATE_FAIL })
        }
      })
    }
  }
  static CreateGroupBooking = (data, token, history) => {
    return async (dispatch) => {

      // console.log('update RejectGroupBooking data in Action', data)
      dispatch({ type: ActionType.GROUPBOOKING_CREATE })
      await POST(`groupBooking`, data, token).then((data) => {
        if (data) {
          console.log('UPDATE THE BOOKING', data)
          toast('CREATED  SUCCESSFULLY')
          dispatch({ type: ActionType.GROUPBOOKING_CREATE_SUCCESS })

          history.push('/groupbooking')
        } else {
          dispatch({ type: ActionType.GROUPBOOKING_CREATE_FAIL })
        }
      })
    }
  }


  static UpdateBooking = (id, data, token, history) => {
    return async (dispatch) => {
      console.log('update BOOKING data in Action', data)
      dispatch({ type: ActionType.GROUPBOOKING_UPDATE })
      await PUT(`booking/${id}`, data, token).then((data) => {
        if (data) {
          console.log('UPDATE THE GROUPBOOKING', data)
          toast('GROUPBOOKING UPDATED SUCCESSFULLY')
          dispatch({ type: ActionType.GROUPBOOKING_UPDATE_SUCCESS })
          // history.push('/gr')
        } else {
          dispatch({ type: ActionType.GROUPBOOKING_UPDATE_FAIL })
        }
      })
    }
  }

}
