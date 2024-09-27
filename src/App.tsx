import { createBrowserRouter, RouterProvider } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import HomePage from "./pages/HomePage"
import ProfilePage from "./pages/ProfilePage"
import ProtectedRoute from "./pages/ProtectedRoute"
import AuthProviderParent from "./pages/AuthProviderParent"

const router = createBrowserRouter([
  {
    element: <AuthProviderParent />,
    children: [
      // rutas públicas
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      // rutas privadas
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/profile",
            element: <ProfilePage />,
          },
          {
            path: "/register",
            element: <RegisterPage />,
          },
          
        ]
      }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
  )
}

export default App