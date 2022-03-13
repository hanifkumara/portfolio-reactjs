import axios from "axios"
const API_URL = process.env.REACT_APP_API_URL

export const getAllInventory = (name = '') => {
  return (dispatch) => {
    axios.get(`${API_URL}/api/v1/product/inventory/by-business?name=${name}`)
      .then(result => {
        console.log("result all product", result.data.data.result)
        dispatch({type: 'SET_ALL_INVENTORY', payload: result.data.data.result})
      })
      .catch(err => {
        console.log("err getAllInventory", err)
      })
  }
}