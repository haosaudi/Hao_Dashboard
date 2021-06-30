import { POST, GET, DELETE, PUT } from 'src/utils/api_calls'
import { ActionType } from '.'
import { toast } from 'react-toastify'
export default class BookingAction {
  static GetAllBookings = (token) => {
    return async (dispatch) => {
      console.log('get BOOKING data in Action', token)
      dispatch({ type: ActionType.GET_ALL_BOOKING })
      await GET('booking', token).then((data) => {
        if (data) {
          console.log('GOT THE BOOKINGS ALL!!', data)
          dispatch({ type: ActionType.GET_ALL_BOOKING_SUCCESS, payload: data.data })
        } else {
          dispatch({ type: ActionType.GET_ALL_BOOKING_FAIL })
        }
      })
    }
  }
  static GetBookingById = (id, token) => {
    return async (dispatch) => {
      console.log('get Booking by id data in Action', token)
      dispatch({ type: ActionType.GET_BOOKING })
      await GET(`Booking/detail/${id}`, token).then((data) => {
        if (data) {
          console.log('GOT THE BOOKING ID!!', data)
          dispatch({ type: ActionType.GET_BOOKING_SUCCESS, payload: data.data })
        } else {
          dispatch({ type: ActionType.GET_BOOKING_FAIL })
        }
      })
    }
  }

  static UpdateBooking = (id, data, token, history) => {
    return async (dispatch) => {
      console.log('update BOOKING data in Action', data)
      dispatch({ type: ActionType.BOOKING_UPDATE })
      await PUT(`booking/${id}`, data, token).then((data) => {
        if (data) {
          console.log('UPDATE THE BOOKING', data)
          toast('BOOKING UPDATED SUCCESSFULLY')
          dispatch({ type: ActionType.BOOKING_UPDATE_SUCCESS })
          history.push('/bookings')
        } else {
          dispatch({ type: ActionType.BOOKING_UPDATE_FAIL })
        }
      })
    }
  }


}
