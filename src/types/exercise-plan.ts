export interface Exercise {
  nombre: string
  series?: number
  repeticiones?: number
  peso?: number
  duracion?: number
  descanso?: number
  notas?: string
}

export interface ExercisePlan {
  id?: number
  usuarioId?: number
  nombre: string
  descripcion?: string
  ejercicios: Exercise[]
  duracionMinutos?: number
  nivelDificultad?: "PRINCIPIANTE" | "INTERMEDIO" | "AVANZADO"
  activo?: boolean
  fechaCreacion?: string
  fechaActualizacion?: string
}

export interface CreateExercisePlanDto {
  nombre: string
  descripcion?: string
  ejercicios: Exercise[]
  duracionMinutos?: number
  nivelDificultad?: "PRINCIPIANTE" | "INTERMEDIO" | "AVANZADO"
}

export interface UpdateExercisePlanDto {
  nombre?: string
  descripcion?: string
  ejercicios?: Exercise[]
  duracionMinutos?: number
  nivelDificultad?: "PRINCIPIANTE" | "INTERMEDIO" | "AVANZADO"
  activo?: boolean
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