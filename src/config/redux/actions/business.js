import axios from 'axios'
const API_URL = process.env.REACT_APP_API_URL

export const getBusiness = () => {
  return (dispatch) => {
    axios.get(`${API_URL}/api/v1/business/my-business`)
      .then(result => {
        console.log("result business", result.data.data.data)
        dispatch({type: 'SET_BUSINESS', payload: result.data.data.data})
      })
      .catch(err => {
        console.log("err getBusiness", err)
      })
  }
}