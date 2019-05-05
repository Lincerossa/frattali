import { combineReducers } from 'redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import auth from './auth/reducer'
import canvas from './canvas/reducer'
import paintings from './paintings/reducer'

const rootReducer = combineReducers({
  auth,
  canvas,
  paintings,
})

const persistConfig = {
  key: 'auth',
  storage,
  blacklist: ['canvas'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
  persistedReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

export const persistor = persistStore(store)
