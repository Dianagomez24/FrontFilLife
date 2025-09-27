"use client"

import { useState } from "react"
import type { ExercisePlan, User } from "../types/exercise-plan"

export function useExercisePlans(user: User) {
  const [activePlans, setActivePlans] = useState<ExercisePlan[]>([
    // Mock data - replace with real data from database
    {
      id: 1,
      usuario_id: user.id,
      nombre: "Rutina de Fuerza",
      descripcion: "Plan enfocado en desarrollo de fuerza muscular",
      ejercicios: [
        { nombre: "Sentadillas", series: 4, repeticiones: "8-10", descanso: "2 min" },
        { nombre: "Press de banca", series: 4, repeticiones: "6-8", descanso: "2-3 min" },
        { nombre: "Peso muerto", series: 3, repeticiones: "5-6", descanso: "3 min" },
      ],
      duracion_minutos: 60,
      nivel_dificultad: "intermedio",
      activo: true,
      fecha_creacion: "2024-01-15",
      fecha_actualizacion: "2024-01-15",
    },
  ])

  const createPlan = (plan: ExercisePlan) => {
    const newPlan: ExercisePlan = {
      ...plan,
      id: Date.now(), // Mock ID - replace with real database ID
      usuario_id: user.id,
      fecha_creacion: new Date().toISOString().split("T")[0],
      fecha_actualizacion: new Date().toISOString().split("T")[0],
    }

    setActivePlans((prev) => [...prev, newPlan])
    console.log("Plan de ejercicio guardado:", newPlan)
    return newPlan
  }

  const togglePlanStatus = (planId: number) => {
    setActivePlans((prev) => prev.map((plan) => (plan.id === planId ? { ...plan, activo: !plan.activo } : plan)))
  }

  const deletePlan = (planId: number) => {
    setActivePlans((prev) => prev.filter((plan) => plan.id !== planId))
  }

  return {
    activePlans,
    createPlan,
    togglePlanStatus,
    deletePlan,
  }
}
