"use client"
import type React from "react"
import { useState } from "react"
import type { NutritionPlan, User } from "../types/nutrition"
import NutritionPlanHeader from "../components/nutrition-plan-header"
import NutritionPlanForm from "../components/nutrition-plan-form"
import NutritionPlansList from "../components/nutrition-plans-list"

interface NutritionPlanFormProps {
  user: User
  onPlanCreated?: (plan: NutritionPlan) => void
}

const NutritionPlanFormContainer: React.FC<NutritionPlanFormProps> = ({ user, onPlanCreated }) => {
  const [showForm, setShowForm] = useState(false)
  const [activePlans, setActivePlans] = useState<NutritionPlan[]>([
    // Mock data - replace with real data from database
    {
      id: 1,
      usuario_id: user.id,
      nombre: "Plan Mediterráneo",
      descripcion: "Dieta balanceada basada en la cocina mediterránea",
      comidas: [
        { nombre: "Avena con frutas", tipo: "desayuno", alimentos: "Avena, plátano, fresas, nueces", calorias: 350 },
        {
          nombre: "Ensalada griega",
          tipo: "almuerzo",
          alimentos: "Lechuga, tomate, pepino, queso feta, aceitunas",
          calorias: 450,
        },
        { nombre: "Salmón a la plancha", tipo: "cena", alimentos: "Salmón, brócoli, arroz integral", calorias: 500 },
      ],
      calorias_objetivo: 2000,
      activo: true,
      fecha_creacion: "2024-01-15",
      fecha_actualizacion: "2024-01-15",
    },
  ])

  const handleCreatePlan = () => {
    setShowForm(true)
  }

  const handleCancelForm = () => {
    setShowForm(false)
  }

  const handleSubmitPlan = (plan: NutritionPlan) => {
    setActivePlans((prev) => [...prev, plan])
    console.log("Plan de nutrición guardado:", plan)
    setShowForm(false)
    onPlanCreated?.(plan)
  }

  const togglePlanStatus = (planId: number) => {
    setActivePlans((prev) => prev.map((plan) => (plan.id === planId ? { ...plan, activo: !plan.activo } : plan)))
  }

  const deletePlan = (planId: number) => {
    setActivePlans((prev) => prev.filter((plan) => plan.id !== planId))
  }

  if (showForm) {
    return <NutritionPlanForm user={user} onCancel={handleCancelForm} onSubmit={handleSubmitPlan} />
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <NutritionPlanHeader onCreatePlan={handleCreatePlan} />
      <NutritionPlansList plans={activePlans} onToggleStatus={togglePlanStatus} onDelete={deletePlan} />
    </div>
  )
}

export default NutritionPlanFormContainer
