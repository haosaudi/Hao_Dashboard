import { POST, GET, DELETE, PUT } from 'src/utils/api_calls'
import { ActionType } from '.'
import { toast } from 'react-toastify'
export default class CategoryAction {
  static GetAllReviews = (token) => {
    return async (dispatch) => {
      console.log('get category data in Action', token)
      dispatch({ type: ActionType.GET_ALL_REVIEWS })
      await GET('review/admin', token).then((data) => {
        if (data) {
          console.log('GOT THE GetAllReviews ALL!!', data)
          dispatch({ type: ActionType.GET_ALL_REVIEWS_SUCCESS, payload: data.data })
        } else {
          dispatch({ type: ActionType.GET_ALL_REVIEWS_FAIL })
        }
      })
    }
  }
  static GetCategoryById = (id, token) => {
    return async (dispatch) => {
      console.log('get category by id data in Action', token)
      dispatch({ type: ActionType.GET_CATEGORY })
      await GET(`category/detail/${id}`, token).then((data) => {
        if (data) {
          console.log('GOT THE CATEGORY ID!!', data)
          dispatch({ type: ActionType.GET_CATEGORY_SUCCESS, payload: data.data })
        } else {
          dispatch({ type: ActionType.GET_CATEGORY_FAIL })
        }
      })
    }
  }
  static AddReviews = (data, token, history) => {
    return async (dispatch) => {
      console.log('post category data in Action', data)
      dispatch({ type: ActionType.REVIEWS_ADD })
      await POST('category', data, token).then((data) => {
        if (data) {
          console.log('ADD THE CATEGORY', data)
          toast('Reviws ADDED SUCCESSFULLY')
          dispatch({ type: ActionType.REVIEWS_ADD_SUCCESS })
          history.push('/reviews')
        } else {
          dispatch({ type: ActionType.REVIEWS_ADD_FAIL })
        }
      })
    }
  }
  static UpdateReviews = (id, data, token, history) => {
    return async (dispatch) => {
      console.log('update Reviews data in Action', data)
      dispatch({ type: ActionType.REVIEWS_UPDATE })
      await PUT(`review/${id}`, data, token).then((data) => {
        if (data) {
          console.log('UPDATE THE reviews', data)
          toast('REVIEWS UPDATED SUCCESSFULLY')
          dispatch({ type: ActionType.REVIEWS_UPDATE_SUCCESS })
          history.push('/reviews')
        } else {
          dispatch({ type: ActionType.REVIEWS_UPDATE_FAIL })
        }
      })
    }
  }
  static DeleteReviews = (id, token, history) => {
    console.log("REDUX ID ", id)
    return async (dispatch) => {
      console.log('delete REVIEWS_DELETE data in Action', id)
      dispatch({ type: ActionType.REVIEWS_DELETE })
      await DELETE(`review/${id}`, token).then((data) => {
        if (data) {
          console.log('DELETE THE REVIEWS_DELETE', data)
          toast('REVIEWS_DELETE DELETED SUCCESSFULLY')
          dispatch({ type: ActionType.REVIEWS_DELETE_SUCCESS })
        } else {
          dispatch({ type: ActionType.REVIEWS_DELETE_FAIL })
        }
      })
    }
  }
}
