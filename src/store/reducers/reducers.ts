import { combineReducers } from 'redux'
import lang from './langReducer/langReducer'
import config from './configReducer/configReducer'

export default combineReducers({
  config,
  lang
})
