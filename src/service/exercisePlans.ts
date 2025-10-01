import axios from "./axiosInstance"
import type { ExercisePlan, CreateExercisePlanDto, UpdateExercisePlanDto } from "../types/exercise-plan"

export const exercisePlansService = {

  async create(planData: CreateExercisePlanDto) {
    const response = await axios.post("/plans/ejercicio", planData)

    return response.data
  },

  async getAll() {
    const response = await axios.get("/plans/ejercicio")
    return response.data
  },

  async getById(planId: number) {
    const response = await axios.get(`/plans/ejercicio/${planId}`)
    
    return response.data
  },

  async update(planId: number, planData: UpdateExercisePlanDto) {

    const response = await axios.put(`/plans/ejercicio/${planId}`, planData)
    return response.data
  },

  async delete(planId: number) {
    const response = await axios.delete(`/plans/ejercicio/${planId}`)
    return response.data
  }
  
}