import { combineReducers } from 'redux'
import outlet from './outlet'
import productCategory from './product_category'
import product from './product'
import business from './business'
import incomingStock from './incomingStock'
import outcomingStock from './outcomingStock'
import inventory from './inventory'

const rootReducer = combineReducers({outlet, productCategory, product, business, incomingStock, outcomingStock, inventory})

export default rootReducer 