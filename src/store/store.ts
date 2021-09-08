import { createStore, applyMiddleware, compose, Store } from 'redux'
import reducer from './reducers/reducers'
import thunk from 'redux-thunk'
import { RootState, IAction } from 'typings/store'

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store: Store<RootState, IAction> = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(
      thunk
    )
  )
)

export default store
