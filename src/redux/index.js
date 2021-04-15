import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import auth from './reducers/auth'

const composedEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const enhancers = composedEnhancers(applyMiddleware(thunk))

const rootReducer = combineReducers({ auth })

const store = createStore(rootReducer, enhancers)

export default store
