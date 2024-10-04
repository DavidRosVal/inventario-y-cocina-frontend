import axios from './axios'
import { z } from 'zod'
import { loginFormSchema, registerFormSchema } from '../schemas/formSchema'

export const registerRequest = async (usuario: z.infer<typeof registerFormSchema>) => await axios.post('/api/auth/register', usuario)

export const loginRequest = async (usuario: z.infer<typeof loginFormSchema>) => await axios.post('/api/auth/login', usuario)

export const logoutRequest = async () => await axios.post('/api/auth/logout')

export const verifyTokenRequest = async () => await axios.get('/api/auth/verify')