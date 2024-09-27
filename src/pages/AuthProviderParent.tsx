
import { Outlet } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";

function AuthProviderParent() {

  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  )

}

export default AuthProviderParent