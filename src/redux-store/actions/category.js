import { POST, GET, DELETE, PUT } from 'src/utils/api_calls'
import { ActionType } from '../actions'
import { toast } from 'react-toastify'
export default class CategoryAction {
  static GetAllCategories = (token) => {
    return async (dispatch) => {
      console.log('get category data in Action', token)
      dispatch({ type: ActionType.GET_ALL_CATEGORIES })
      await GET('category/admin', token).then((data) => {
        if (data) {
          console.log('GOT THE CATEGORIES ALL!!', data)
          dispatch({ type: ActionType.GET_ALL_CATEGORIES_SUCCESS, payload: data.data })
        } else {
          dispatch({ type: ActionType.GET_ALL_CATEGORIES_FAIL })
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
  static AddCategory = (data, token, history) => {
    return async (dispatch) => {
      console.log('post category data in Action', data)
      dispatch({ type: ActionType.CATEGORY_ADD })
      await POST('category', data, token).then((data) => {
        if (data) {
          console.log('ADD THE CATEGORY', data)
          toast('CATEGORY ADDED SUCCESSFULLY')
          dispatch({ type: ActionType.CATEGORY_ADD_SUCCESS })
          history.push('/category')
        } else {
          dispatch({ type: ActionType.CATEGORY_ADD_FAIL })
        }
      })
    }
  }
  static UpdateCategory = (id, data, token, history) => {
    return async (dispatch) => {
      console.log('update category data in Action', data)
      dispatch({ type: ActionType.CATEGORY_UPDATE })
      await PUT(`category/${id}`, data, token).then((data) => {
        if (data) {
          console.log('UPDATE THE CATEGORY', data)
          toast('CATEGORY UPDATED SUCCESSFULLY')
          dispatch({ type: ActionType.CATEGORY_UPDATE_SUCCESS })
          history.push('/category')
        } else {
          dispatch({ type: ActionType.CATEGORY_UPDATE_FAIL })
        }
      })
    }
  }
  static DeleteCategory = (id, token, history) => {
    return async (dispatch) => {
      console.log('delete category data in Action', id)
      dispatch({ type: ActionType.CATEGORY_DELETE })
      await DELETE(`category/${id}`, token).then((data) => {
        if (data) {
          console.log('DELETE THE CATEGORY', data)
          toast('CATEGORY DELETED SUCCESSFULLY')
          dispatch({ type: ActionType.CATEGORY_DELETE_SUCCESS })
        } else {
          dispatch({ type: ActionType.CATEGORY_DELETE_FAIL })
        }
      })
    }
  }
}
