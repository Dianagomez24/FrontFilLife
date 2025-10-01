export interface UpdateUserDto {
  nombre?: string
  apellidos?: string
  email?: string
}

export interface UserProfile {
  id: number
  nombre: string
  apellidos: string
  email: string
  datosFisicos?: DatosFisicos
}

export interface DatosFisicos {
  id: number
  usuarioId: number
  edad: number
  sexo: "M" | "F" | "Otro"
  peso: number
  altura: number
  nivelActividad: "Sedentario" | "Ligero" | "Moderado" | "Intenso"
  objetivo?: string
  experiencia?: "Principiante" | "Intermedio" | "Avanzado"
  limitaciones?: string
}

export interface User {
  id: number
  nombre: string
  apellidos: string
  email: string
  hasHealthData: boolean
  hasExercisePlan: boolean
  hasNutritionPlan: boolean
}