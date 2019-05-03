import { combineReducers } from 'redux'

import auth from './auth/reducer'
import canvas from './canvas/reducer'

export default combineReducers({
  auth,
  canvas,
})
