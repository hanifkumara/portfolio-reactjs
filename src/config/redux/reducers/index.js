import { combineReducers } from 'redux'
import outlet from './outlet'
import productCategory from './product_category'
import product from './product'
import business from './business'

const rootReducer = combineReducers({outlet, productCategory, product, business})

export default rootReducer