import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import thunk from 'redux-thunk'
import rootReducer from './reducers/index'

const store = createStore(rootReducer,applyMiddleware(thunk, logger))

export default store
