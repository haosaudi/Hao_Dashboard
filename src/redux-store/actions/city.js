import { POST, GET, DELETE, PUT } from 'src/utils/api_calls'
import { ActionType } from '../actions'
import { toast } from 'react-toastify'
export default class CategoryAction {
  static GetAllCities = (token) => {
    return async (dispatch) => {
      console.log('get category data in Action', token)
      dispatch({ type: ActionType.GET_ALL_CITIES })
      await GET('city/admin', token).then((data) => {
        if (data) {
          console.log('GOT THE CITGET_ALL_CITIES ALL!!', data)
          dispatch({ type: ActionType.GET_ALL_CITIES_SUCCESS, payload: data.data })
        } else {
          dispatch({ type: ActionType.GET_ALL_CITIES_FAIL })
        }
      })
    }
  }
  static GetCityById = (id, token) => {
    return async (dispatch) => {
      console.log('get city by id data in Action', token)
      dispatch({ type: ActionType.GET_CITY })
      await GET(`city/detail/${id}`, token).then((data) => {
        if (data) {
          console.log('GOT THE CITY ID!!', data)
          dispatch({ type: ActionType.GET_CITY_SUCCESS, payload: data.data })
        } else {
          dispatch({ type: ActionType.GET_CITY_FAIL })
        }
      })
    }
  }
  static AddCity = (data, token, history) => {
    return async (dispatch) => {
      console.log('post city data in Action', data)
      dispatch({ type: ActionType.CITY_ADD })
      await POST('city', data, token).then((data) => {
        if (data) {
          console.log('ADD THE CITY', data)
          toast('City ADDED SUCCESSFULLY')
          dispatch({ type: ActionType.CITY_ADD_SUCCESS })
          history.push('/city')
        } else {
          dispatch({ type: ActionType.CITY_ADD_FAIL })
        }
      })
    }
  }
  static UpdateCity = (id, data, token, history) => {
    return async (dispatch) => {
      console.log('update city data in Action', data)
      dispatch({ type: ActionType.CITY_UPDATE })
      await PUT(`city/${id}`, data, token).then((data) => {
        if (data) {
          console.log('UPDATE THE CITY', data)
          toast('CITY UPDATED SUCCESSFULLY')
          dispatch({ type: ActionType.CITY_UPDATE_SUCCESS })
          history.push('/city')
        } else {
          dispatch({ type: ActionType.CITY_UPDATE_FAIL })
        }
      })
    }
  }
  static DeleteCity = (id, token, history) => {
    return async (dispatch) => {
      console.log('delete city data in Action', id)
      dispatch({ type: ActionType.CITY_DELETE })
      await DELETE(`city/${id}`, token).then((data) => {
        if (data) {
          console.log('DELETE THE CITY', data)
          toast('CITY DELETED SUCCESSFULLY')
          dispatch({ type: ActionType.CITY_DELETE_SUCCESS })
        } else {
          dispatch({ type: ActionType.CITY_DELETE_FAIL })
        }
      })
    }
  }
}
