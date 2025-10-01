import axios from "./axiosInstance"
import type { RegisterDto, LoginDto, ResendVerificationDto, VerifyEmailDto } from "../types/authTypes"

export const register = async (data: RegisterDto) => {
  const response = await axios.post("/auth/register", data)
  return response.data
}

export const login = async (data: LoginDto) => {
  const response = await axios.post("/auth/login", data)
  return response.data
}

export const resendVerification = async (data: ResendVerificationDto) => {
  const response = await axios.post("/auth/resend-verification", data)
  return response.data
}

export const verifyEmail = async (data: VerifyEmailDto) => {
  const response = await axios.post("/auth/verify-email", data)
  return response.data
}
