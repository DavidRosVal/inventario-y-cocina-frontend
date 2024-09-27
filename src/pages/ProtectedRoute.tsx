import { Navigate, Outlet } from "react-router-dom";
import Cookies from 'js-cookie'

function ProtectedRoute() {

  if (!Cookies.get('token')) return <Navigate to="/login" />

  return <Outlet />

}

export default ProtectedRoute