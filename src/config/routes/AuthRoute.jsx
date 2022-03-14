import { Navigate, Outlet } from "react-router-dom"

const AuthRoute = () => {
  const temp_token = localStorage.getItem('token')
  console.log("temp_token", temp_token)
  return temp_token && temp_token.length ? <Navigate to="/main/account"/>  : <Outlet/>
}

export default AuthRoute