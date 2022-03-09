import { combineReducers } from 'redux'
import outlet from './outlet'
import productCategory from './product_category'
import product from './product'

const rootReducer = combineReducers({outlet, productCategory, product})

export default rootReducer