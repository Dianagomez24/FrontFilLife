import { useExercisePlans } from "./use-exercise-plans"
import { useNutritionPlans } from "./use-nutrition-plans"

export interface DashboardStats {
  totalExercisePlans: number
  totalNutritionPlans: number
  activeExercisePlans: number
  activeNutritionPlans: number
  totalExercises: number
  totalMeals: number
  totalCalories: number
  progressPercentage: number
}

export function useDashboardStats() {
  const { activePlans: exercisePlans, loading: exerciseLoading } = useExercisePlans()
  const { activePlans: nutritionPlans, loading: nutritionLoading } = useNutritionPlans()

  const activeExercisePlans = exercisePlans.filter(plan => plan.activo).length
  const activeNutritionPlans = nutritionPlans.filter(plan => plan.activo).length
  
  const totalExercises = exercisePlans.reduce((total, plan) => total + plan.ejercicios.length, 0)
  const totalMeals = nutritionPlans.reduce((total, plan) => total + plan.comidas.length, 0)
  
  const totalCalories = nutritionPlans.reduce((total, plan) => {
    return total + plan.comidas.reduce((mealTotal, comida) => {
      return mealTotal + comida.alimentos.reduce((alimentoTotal, alimento) => {
        return alimentoTotal + (alimento.calorias || 0)
      }, 0)
    }, 0)
  }, 0)

  const totalPlans = exercisePlans.length + nutritionPlans.length
  const progressPercentage = totalPlans > 0 ? Math.min((totalPlans / 10) * 100, 100) : 0

  const stats: DashboardStats = {
    totalExercisePlans: exercisePlans.length,
    totalNutritionPlans: nutritionPlans.length,
    activeExercisePlans,
    activeNutritionPlans,
    totalExercises,
    totalMeals,
    totalCalories,
    progressPercentage
  }

  return {
    stats,
    exercisePlans,
    nutritionPlans,
    loading: exerciseLoading || nutritionLoading
  }
}