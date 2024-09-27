import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Restobar Villa 29</h1>} />  
        <Route path="/login" element={<LoginPage />} />  
        <Route path="/register" element={<RegisterPage />} />  
        <Route path="/profile" element={<h1>Perfil de Usuario</h1>} />  
      </Routes>    
    </BrowserRouter>
  )
}

export default App