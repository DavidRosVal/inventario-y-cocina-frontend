import { createContext, useEffect, useState } from "react";
import { loginRequest, logoutRequest, registerRequest, verifyTokenRequest } from "../api/auth";
import { z } from "zod";
import { loginFormSchema, registerFormSchema } from "../schemas/formSchema";
//import { AxiosResponse } from "axios"; */
import Cookies from 'js-cookie'
import { useLocation } from "react-router-dom";



type Usuario = {
  id_usuario: string
  nombre: string
  apellido: string
  email: string,
  rol: string
} | null

type AuthContextType = {
  signUp: (values: z.infer<typeof registerFormSchema>) => void
  signIn: (values: z.infer<typeof loginFormSchema>) => void
  signOut: () => void
  usuario: Usuario
  errors: string[]
}
export const AuthContext = createContext<AuthContextType>( {} as AuthContextType )

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const [usuario, setUsuario] = useState<Usuario>(null)
  const [errors, setErrors] = useState<string[]>([])

  const signUp = async (values: z.infer<typeof registerFormSchema>) => {
    try {
      const res = await registerRequest(values)
      if (res.status === 200) {
          console.log('Usuario creado correctamente')
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) { // ignore any error type
      console.log(error)
      setErrors([error.response.data.error])
    }
    
  }

  const signIn = async (values: z.infer<typeof loginFormSchema>) => {
    try {
      const res = await loginRequest(values)
      setUsuario(res.data.usuario)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error)
      setErrors([error.response.data.error])
    }
  }

  const signOut = async () => {
    try {
      const res = await logoutRequest()
      if (res.status === 200) {
        setUsuario(null)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([])
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [errors])

  useEffect(() => {
    if (Cookies.get('token')) {
      console.log('el token existe', location.pathname)
      getUserByToken()
      return
    }
    return console.log('el token no existe')
  }, [location.pathname])
  
  async function getUserByToken() {
    try {
      const res = await verifyTokenRequest()
      console.log('Usuario obtenido', res.data)
      setUsuario(res.data)
    } catch (error) {
      console.log(error)
  }}

  return (
    <AuthContext.Provider value={{
      signUp,
      signIn,
      signOut,
      usuario,
      errors, 

    }}>
      {children}
    </AuthContext.Provider>
  )
}