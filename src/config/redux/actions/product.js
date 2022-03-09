import axios from "axios"
const API_URL = process.env.REACT_APP_API_URL

export const getAllProduct = () => {
  return (dispatch) => {
    axios.get(`${API_URL}/api/v1/product/by-business`)
      .then(result => {
        console.log("result all product", result.data.data.result)
        dispatch({type: 'SET_ALL_PRODUCT', payload: result.data.data.result})
      })
  }
}