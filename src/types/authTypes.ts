export interface RegisterDto {
  nombre: string
  apellidos: string
  email: string
  password: string
}
export interface LoginDto {
  email: string
  password: string
}

export interface ResendVerificationDto {
  email: string
}

export interface VerifyEmailDto {
  token: string
}
