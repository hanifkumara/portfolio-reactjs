import axios from 'axios'
const API_URL = process.env.REACT_APP_API_URL

export const getAllOutlet = (name = '') => {
  return (dispatch) => {
    axios.get(`${API_URL}/api/v1/outlet/by-business?name=${name}`)
      .then(result => {
        console.log("result outlet", result.data.data.result)
        dispatch({type: 'SET_ALL_OUTLET', payload: result.data.data.result})
      })
      .catch(err => {
        console.log("err getAllOutlet", err)
      })
  }
}