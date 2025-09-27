"use client"

import type React from "react"
import { Dumbbell, Plus } from "lucide-react"

interface ExercisePlanProps {
  user: {
    id: number
    nombre: string
    apellidos: string
    email: string
    hasHealthData: boolean
    hasExercisePlan: boolean
    hasNutritionPlan: boolean
  }
  onCreatePlan: () => void
}

const ExercisePlan: React.FC<ExercisePlanProps> = ({ user, onCreatePlan }) => {
  // Si el usuario no tiene un plan de ejercicio
  if (!user.hasExercisePlan) {
    return (
      <div className="space-y-8">
        <div className="bg-gradient-to-r from-[#959581] to-[#aeb99d] rounded-2xl p-8 text-white text-center">
          <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Dumbbell className="text-white" size={40} />
          </div>
          <h1 className="text-3xl font-bold mb-4">No tienes ningún plan de ejercicio activo</h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
            Aquí podrás ver tus rutinas y seguimiento cuando tengas un plan disponible.
          </p>
          <button
            onClick={onCreatePlan}
            className="bg-white text-[#2d3319] px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105 flex items-center gap-2 justify-center mx-auto"
          >
            <Plus size={20} />
            Crear Plan Personalizado
          </button>
        </div>
      </div>
    )
  }

  // Si ya tiene un plan
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-8 shadow-sm border border-[#c4c9b5]/20 text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-[#959581] to-[#aeb99d] rounded-full flex items-center justify-center mx-auto mb-6">
          <Dumbbell className="text-white" size={32} />
        </div>
        <h3 className="text-2xl font-bold text-[#2d3319] mb-4">¡Tu Plan está Listo!</h3>
        <p className="text-[#bcc591]">
          Tu plan de ejercicio personalizado está activo. Puedes ver tus rutinas y seguir tu progreso en esta sección.
        </p>
      </div>
    </div>
  )
}

export default ExercisePlan
