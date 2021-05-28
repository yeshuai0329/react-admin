import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducers/reducers'
import thunk from 'redux-thunk'

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(
      thunk
    )
  )
)

export default store
