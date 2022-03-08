import { combineReducers } from 'redux'
import outlet from './outlet'
import productCategory from './product_category'

const rootReducer = combineReducers({outlet, productCategory})

export default rootReducer