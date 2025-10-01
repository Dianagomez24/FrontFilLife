export interface Alimento {
  nombre: string
  cantidad?: string
  calorias?: number
  proteinas?: number
  carbohidratos?: number
  grasas?: number
}

export interface Comida {
  nombre: string
  horario?: string
  alimentos: Alimento[]
  notas?: string
}

export interface NutritionPlan {
  id?: number
  usuarioId?: number
  nombre: string
  descripcion?: string
  comidas: Comida[]
  caloriasObjetivo?: number
  activo?: boolean
  fechaCreacion?: string
  fechaActualizacion?: string
}

export interface CreateNutritionPlanDto {
  nombre: string
  descripcion?: string
  comidas: Comida[]
  caloriasObjetivo?: number
}

export interface UpdateNutritionPlanDto {
  nombre?: string
  descripcion?: string
  comidas?: Comida[]
  caloriasObjetivo?: number
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