import { createBrowserRouter, RouterProvider } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import { AuthProvider } from "./context/AuthContext"

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Gestión de inventario y comunicación con cocina</h1>,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/profile",
    element: <h1>Perfil de usuario</h1>,
  },
])

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
    </AuthProvider>
  )
}

export default App