import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, registerRequest } from "../api/auth";
import { z } from "zod";
import { loginFormSchema, registerFormSchema } from "../schemas/formSchema";

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
  isAuthenticated: boolean
  usuario: Usuario
  errors: string[]
}
export const AuthContext = createContext<AuthContextType>( {} as AuthContextType )

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
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
      setIsAuthenticated(true)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error)
      setErrors([error.response.data.error])
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
  

  return (
    <AuthContext.Provider value={{
      signUp,
      signIn,
      usuario,
      isAuthenticated, 
      errors
    }}>
      {children}
    </AuthContext.Provider>
  )
}