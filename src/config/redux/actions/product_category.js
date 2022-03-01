import axios from "axios"
const API_URL = process.env.REACT_APP_API_URL

export const addProductCategory = () => {
  return (dispatch) => {
    axios.post(`${API_URL}/api/v1/product-category`)
      .then(result => {
        dispatch({type: 'SET_ALL_PRODUCT_CATEGORY', payload: result.data.data.result})
      })
      .catch(err => {
        console.log(err)
      })
  }
}