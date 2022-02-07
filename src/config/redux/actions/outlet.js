import axios from 'axios'
import { Navigate, Outlet } from "react-router-dom"
const API_URL = process.env.REACT_APP_API_URL

export const getAllOutlet = () => {
  return (dispatch) => {
    axios.get(`${API_URL}/api/v1/outlet`)
      .then(result => {
        console.log("result outlet", result.data.data.result)
        dispatch({type: 'SET_ALL_OUTLET', payload: result.data.data.result})
      })
  }
}