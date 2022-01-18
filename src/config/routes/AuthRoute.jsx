import { Navigate, Outlet } from "react-router-dom"

const AuthRoute = () => {
  const temp_token = localStorage.getItem('token')
  return temp_token && temp_token.length ? <Navigate to="/main/dashboard"/>  : <Outlet/>
}

export default AuthRoute