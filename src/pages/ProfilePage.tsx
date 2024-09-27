import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { z } from "zod"
import { Form } from "../components/ui/form"
import { Button } from "../components/ui/button"
import { useAuth } from "../hooks/useAuth"
import { useEffect, useState } from "react"

const logOutFormSchema = z.object({})

function ProfilePage() {
  const { signOut, usuario } = useAuth()
  const navigate = useNavigate()

  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if (usuario?.rol === 'Administrador') {
      setIsAdmin(true)
    }
  }, [usuario?.rol])
  
  // 1. Define your form.
  const form = useForm<z.infer<typeof logOutFormSchema>>({
    resolver: zodResolver(logOutFormSchema),
    defaultValues: {},
  })
 
  // 2. Define a submit handler.
  async function onSubmit() {
    await signOut()
    navigate('/login')
  }

  return (
    <div className="h-screen py-10 px-20 relative">
      <div className="flex justify-between">
        <h1 className="text-5xl font-semibold mb-30">Bienvenido(a), {usuario?.nombre}</h1>
        <Form {...form}>
          <form className="m-0 " onSubmit={form.handleSubmit(onSubmit)} >
            <Button className="p-5 h-full py-2 bg-secondary text-primary hover:bg-popover" type="submit">Cerrar Sesión</Button>
          </form>
        </Form>
      </div>
      <p className="text-primary font-semibold mt-3">{usuario?.rol}</p>
      {isAdmin && (
        <div className="h-full flex justify-center">
          <Link to="/register" className="flex justify-center items-center">
            <Button className="p-10 text-2xl wrap">Registrar nuevo usuario</Button>
          </Link>
        </div>
      )}
      
      
    </div>
  )
}

export default ProfilePage