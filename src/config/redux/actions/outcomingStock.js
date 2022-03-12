import axios from "axios"
const API_URL = process.env.REACT_APP_API_URL

export const getAllOutcomingStock = () => {
  return (dispatch) => {
    axios.get(`${API_URL}/api/v1/outcoming-stock`)
      .then(result => {
        console.log("result all outcoming stock", result.data.data)
        dispatch({type: 'SET_ALL_OUTCOMING_STOCK', payload: result.data.data})
      })
  }
}