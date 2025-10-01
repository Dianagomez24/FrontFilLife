import axios from "./axiosInstance"
import type { NutritionPlan, CreateNutritionPlanDto, UpdateNutritionPlanDto } from "../types/nutrition"

export const nutritionPlansService = {

  async create(planData: CreateNutritionPlanDto) {
    const response = await axios.post("/plans/nutricion", planData)

    return response.data
  },

  async getAll() {
    const response = await axios.get("/plans/nutricion")
    return response.data
  },

  async getById(planId: number) {
    const response = await axios.get(`/plans/nutricion/${planId}`)
    return response.data
  },

  async update(planId: number, planData: UpdateNutritionPlanDto) {
    const response = await axios.put(`/plans/nutricion/${planId}`, planData)
    return response.data
  },

  async delete(planId: number) {
    const response = await axios.delete(`/plans/nutricion/${planId}`)
    
    return response.data
  }
}