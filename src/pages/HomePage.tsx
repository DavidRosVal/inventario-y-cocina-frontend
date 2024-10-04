import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { useAuth } from "../hooks/useAuth"

function HomePage() {
  const { usuario } = useAuth()
  return (
    <div className="h-screen">
      dashboard
      {!usuario && (
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <h1 className="text-4xl font-bold">Bienvenido a Villa 29</h1>
          <p className="text-lg text-center text-muted-foreground">
            Inicia sesión para acceder a la plataforma de gestión de inventario y comunicación con el área de cocina
          </p>
          <div>
            <Link to="/login" >
              <Button className=" mt-5 p-8 text-xl">Iniciar Sesión</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default HomePage