import { combineReducers, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const initialStateProfile = {
  firstName: 'Hanif',
  lastName: 'Kumara',
  age: '20'
}

const ProfileReducer = (state = initialStateProfile, action) => {
  return state
}

const initialStateProduct = {
  name: 'Semangka',
  berat: '4kg',
  harga: 'Rp. 25.000,00'
}

const ProductReducer = (state = initialStateProduct, action) => {
  return state
}

const store = createStore(ProductReducer)

export default store
