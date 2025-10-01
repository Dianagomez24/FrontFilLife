import { useState, useEffect } from "react"
import { nutritionPlansService } from "../service/nutritionPlans"
import type { NutritionPlan, CreateNutritionPlanDto, UpdateNutritionPlanDto } from "../types/nutrition"

export function useNutritionPlans() {
  const [activePlans, setActivePlans] = useState<NutritionPlan[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadPlans()
  }, [])

  const loadPlans = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await nutritionPlansService.getAll()
      setActivePlans(response.planes || [])
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al cargar los planes")
      console.error("Error loading nutrition plans:", err)
    } finally {
      setLoading(false)
    }
  }

  const createPlan = async (planData: CreateNutritionPlanDto) => {
    try {
      setError(null)
      const response = await nutritionPlansService.create(planData)
      await loadPlans()
      return response.plan
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al crear el plan")
      console.error("Error creating nutrition plan:", err)
      throw err
    }
  }

  const updatePlan = async (planId: number, planData: UpdateNutritionPlanDto) => {
    try {
      setError(null)
      const response = await nutritionPlansService.update(planId, planData)
      await loadPlans() 
      return response
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al actualizar el plan")
      console.error("Error updating nutrition plan:", err)
      throw err
    }
  }

  const togglePlanStatus = async (planId: number, currentStatus: boolean) => {
    try {
      setError(null)
      await nutritionPlansService.update(planId, { activo: !currentStatus })
      await loadPlans() 
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al actualizar el plan")
      console.error("Error updating nutrition plan:", err)
      throw err
    }
  }

  const deletePlan = async (planId: number) => {
    try {
      setError(null)
      await nutritionPlansService.delete(planId)
      await loadPlans()
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al eliminar el plan")
      console.error("Error deleting nutrition plan:", err)
      throw err
    }
  }

  return {
    activePlans,
    loading,
    error,
    createPlan,
    updatePlan,
    togglePlanStatus,
    deletePlan,
    refetch: loadPlans
  }
}