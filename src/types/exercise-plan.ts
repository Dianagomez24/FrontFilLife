export interface Exercise {
  nombre: string
  series: number
  repeticiones: string
  descanso: string
  notas?: string
}

export interface ExercisePlan {
  id?: number
  usuario_id?: number
  nombre: string
  descripcion: string
  ejercicios: Exercise[]
  duracion_minutos: number
  nivel_dificultad: "principiante" | "intermedio" | "avanzado"
  activo: boolean
  fecha_creacion?: string
  fecha_actualizacion?: string
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
