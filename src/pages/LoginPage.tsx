import { useForm } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { loginFormSchema } from "../schemas/formSchema"

import { useAuth } from "../hooks/useAuth.ts"
import { useNavigate } from "react-router-dom"

function LoginPage() {
  const { signIn, errors } = useAuth()
  const navigate = useNavigate()

  // 1. Define your form.
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    await signIn(values)
    navigate('/profile')
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
        <Card className="w-[450px] mb-10 pt-8 pb-10 px-14">
          <CardHeader>
            <CardTitle className="text-xl text-center">Inicio de Sesión</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} >
                <div className="space-y-7">
                  
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
                </div>
                <Button className="w-full mt-8" type="submit">Iniciar Sesión</Button>
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

export default LoginPage