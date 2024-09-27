import axios from 'axios'
import { VITE_API_URL } from '../config'
import { z } from 'zod'
import { loginFormSchema, registerFormSchema } from '../schemas/formSchema'

export const registerRequest = (usuario: z.infer<typeof registerFormSchema>) => axios.post(`${VITE_API_URL}/auth/register`, usuario)

export const loginRequest = (usuario: z.infer<typeof loginFormSchema>) => axios.post(`${VITE_API_URL}/auth/login`, usuario)