import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = () => {
  const temp_token = localStorage.getItem('token')
  return temp_token && temp_token.length ? <Outlet/> : <Navigate to="/auth/login"/> 
}

export default ProtectedRoute