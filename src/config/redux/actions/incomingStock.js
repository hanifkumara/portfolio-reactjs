import axios from "axios"
const API_URL = process.env.REACT_APP_API_URL

export const getAllIncomingStock = () => {
  return (dispatch) => {
    axios.get(`${API_URL}/api/v1/incoming-stock`)
      .then(result => {
        console.log("result all incoming stock", result.data.data)
        dispatch({type: 'SET_ALL_INCOMING_STOCK', payload: result.data.data})
      })
  }
}