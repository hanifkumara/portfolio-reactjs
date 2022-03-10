import axios from "axios"
const API_URL = process.env.REACT_APP_API_URL

export const getAllProductCategory = () => {
  return (dispatch) => {
    axios.get(`${API_URL}/api/v1/product-category/by-business`)
      .then(result => {
        console.log("result all product category", result.data.data.result)
        dispatch({type: 'SET_ALL_PRODUCT_CATEGORY', payload: result.data.data.result})
      })
  }
}

export const addProductCategory = () => {
  return (dispatch) => {
    axios.post(`${API_URL}/api/v1/product-category`)
      .then(result => {
        console.log("result create product category", result.data.data.result)
        dispatch({type: 'SET_ALL_PRODUCT_CATEGORY', payload: result.data.data.result})
      })
      .catch(err => {
        console.log(err)
      })
  }
}