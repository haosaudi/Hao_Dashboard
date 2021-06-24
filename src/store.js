import { createStore, combineReducers, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import middlewares from './middleware'
import storage from 'redux-persist/lib/storage'
import Reducer from './redux-store/reducers'

export const rootReducer = combineReducers(Reducer)

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['navigation'], // uncomment this line if you want to use persist for navigation
  timeout: null,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, {}, applyMiddleware(...middlewares))
const persistor = persistStore(store)

export { store, persistor }

// import { createStore } from 'redux'

// const initialState = {
//   sidebarShow: false,
// }

// const changeState = (state = initialState, { type, ...rest }) => {
//   switch (type) {
//     case 'set':
//       return { ...state, ...rest }
//     default:
//       return state
//   }
// }

// const store = createStore(changeState)
// export default store
