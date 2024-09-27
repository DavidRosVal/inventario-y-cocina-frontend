import axios from './axios'
import { z } from 'zod'
import { loginFormSchema, registerFormSchema } from '../schemas/formSchema'

export const registerRequest = (usuario: z.infer<typeof registerFormSchema>) => axios.post('/api/auth/register', usuario)

export const loginRequest = (usuario: z.infer<typeof loginFormSchema>) => axios.post('/api/auth/login', usuario)

export const logoutRequest = () => axios.post('/api/auth/logout')

export const verifyTokenRequest = () => axios.get('/api/auth/verify')