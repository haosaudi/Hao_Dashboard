import { POST, GET, DELETE, PUT } from 'src/utils/api_calls'
import { ActionType } from '../actions'
import { toast } from 'react-toastify'
export default class CouponAction {
  static GetAllCoupons = (token) => {
    return async (dispatch) => {
      console.log('get category data in Action', token)
      dispatch({ type: ActionType.GET_ALL_COUPONS })
      await GET('coupon/admin', token).then((data) => {
        if (data) {
          console.log('GOT THE CITGET_ALL_COUPONS ALL!!', data)
          dispatch({ type: ActionType.GET_ALL_COUPONS_SUCCESS, payload: data.data })
        } else {
          dispatch({ type: ActionType.GET_ALL_COUPONS_FAIL })
        }
      })
    }
  }
  static GetCouponById = (id, token) => {
    return async (dispatch) => {
      console.log('get coupon by id data in Action', token)
      dispatch({ type: ActionType.GET_COUPON })
      await GET(`coupon/detail/${id}`, token).then((data) => {
        if (data) {
          console.log('GOT THE COUGET_COUPON ID!!', data)
          dispatch({ type: ActionType.GET_COUPON_SUCCESS, payload: data.data })
        } else {
          dispatch({ type: ActionType.GET_COUPON_FAIL })
        }
      })
    }
  }
  static AddCoupon = (data, token, history) => {
    return async (dispatch) => {
      console.log('post coupon data in Action', data)
      dispatch({ type: ActionType.COUPON_ADD })
      await POST('coupon', data, token).then((data) => {
        if (data) {
          console.log('ADD THE COUPON', data)
          toast('COUPON ADDED SUCCESSFULLY')
          dispatch({ type: ActionType.COUPON_ADD_SUCCESS })
          history.push('/coupon')
        } else {
          dispatch({ type: ActionType.COUPON_ADD_FAIL })
        }
      })
    }
  }
  static UpdateCategory = (id, data, token, history) => {
    return async (dispatch) => {
      console.log('update coupon data in Action', data)
      dispatch({ type: ActionType.COUPON_UPDATE })
      await PUT(`coupon/${id}`, data, token).then((data) => {
        if (data) {
          console.log('UPDATE THE COUPON', data)
          toast('COUPON UPDATED SUCCESSFULLY')
          dispatch({ type: ActionType.COUPON_UPDATE_SUCCESS })
          history.push('/coupon')
        } else {
          dispatch({ type: ActionType.COUPON_UPDATE_FAIL })
        }
      })
    }
  }
  static DeleteCoupon = (id, token, history) => {
    return async (dispatch) => {
      console.log('delete coupon data in Action', id)
      dispatch({ type: ActionType.COUPON_DELETE })
      await DELETE(`coupon/${id}`, token).then((data) => {
        if (data) {
          console.log('DELETE THE COUPON', data)
          toast('COUPON DELETED SUCCESSFULLY')
          dispatch({ type: ActionType.COUPON_DELETE_SUCCESS })
        } else {
          dispatch({ type: ActionType.COUPON_DELETE_FAIL })
        }
      })
    }
  }
}
