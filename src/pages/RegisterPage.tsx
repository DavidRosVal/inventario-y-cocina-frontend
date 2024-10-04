import { useForm } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { registerFormSchema } from "../schemas/formSchema.ts"
import { useAuth } from "../hooks/useAuth.ts"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function RegisterPage() {
  const { signUp, errors, usuario } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (usuario?.rol !== 'Administrador') {
      navigate('/profile')
    }
  })
  

  // 1. Define your form.
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      nombre: "",
      apellido: "",
      email: "",
      password: "",
      rol: undefined
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    signUp(values)
  }

  return (
    <div className="h-full bg-primary flex justify-center items-center relative overflow-hidden">
      {/* Elipse superior */}
      <div className="absolute top-[-80px] left-[-80px]">
        <div className="relative w-[500px] h-[550px] ">
          <div className="absolute top-0 left-0 bg-none h-[350px] w-[350px] rounded-full border-[40px] border-secondary" />
          <div className="absolute bottom-0 right-4 bg-none h-[350px] w-[350px] rounded-full border-[40px] border-secondary" />
        </div>
      </div>
      {/* Elipse inferior */}
      <div className="absolute bottom-[-80px] right-[-80px]">
        <div className="relative w-[500px] h-[550px] ">
          <div className="absolute top-0 left-0 bg-none h-[350px] w-[350px] rounded-full border-[40px] border-secondary" />
          <div className="absolute bottom-0 right-4 bg-none h-[350px] w-[350px] rounded-full border-[40px] border-secondary" />
        </div>
      </div>
      {/* logo y formulario */}
      <div className="z-10 flex flex-col items-center ">
        <div className="h-20 w-20 rounded-full overflow-hidden mb-8">
          <img src="/logo-restobar.jpg" alt="Logo" className="h-full w-full object-cover" />
        </div>
        <Card className="w-[500px] mb-10 py-5 px-14">
          <CardHeader>
            <CardTitle className="text-xl text-center">Registro de Usuario</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} >
                <div className="space-y-3">
                  <FormField
                    control={form.control}
                    name="nombre"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input placeholder="ej. John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="apellido"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Apellido</FormLabel>
                        <FormControl>
                          <Input placeholder="ej. Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Correo electrónico</FormLabel>
                        <FormControl>
                          <Input placeholder="ej. johndoe@ejemplo.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contraseña</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="ej. johndoe123" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="rol"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rol que desempeña</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar rol" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Adminstrador">Administrador</SelectItem>
                            <SelectItem value="Cocinero">Cocinero</SelectItem>
                            <SelectItem value="Mozo/Cajero">Mozo/Cajero</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button className="w-full mt-8" type="submit">Submit</Button>
                <div className="mt-2">
                  {errors.map((err, i) => (
                    <FormMessage key={i}>{err}</FormMessage>
                  ))}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      
    </div>
  )
}

export default RegisterPage