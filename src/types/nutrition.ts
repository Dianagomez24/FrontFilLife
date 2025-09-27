export interface Meal {
  nombre: string
  tipo: "desayuno" | "almuerzo" | "cena" | "snack"
  alimentos: string
  calorias: number
  notas?: string
}

export interface NutritionPlan {
  id?: number
  usuario_id?: number
  nombre: string
  descripcion: string
  comidas: Meal[]
  calorias_objetivo: number
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
