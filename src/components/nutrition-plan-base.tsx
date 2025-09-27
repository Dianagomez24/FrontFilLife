"use client"
import type React from "react"
import { Apple, Plus } from "lucide-react"

interface NutritionPlanProps {
  user: {
    id: number
    nombre: string
    apellidos: string
    email: string
    hasHealthData: boolean
    hasExercisePlan: boolean
    hasNutritionPlan: boolean
  }
}

const NutritionPlan: React.FC<NutritionPlanProps> = ({ user }) => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#aeb99d] to-[#c4c9b5] rounded-2xl p-8 text-white text-center">
        <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Apple className="text-white" size={40} />
        </div>
        <h1 className="text-3xl font-bold mb-4">Plan de Nutrición</h1>
        <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
          Próximamente podrás crear tu plan de nutrición personalizado. Alimentación balanceada y deliciosa adaptada a
          tus objetivos y estilo de vida.
        </p>
        <div className="inline-flex items-center gap-2 bg-white/10 px-6 py-3 rounded-xl cursor-pointer hover:bg-white/20 transition">
          <Plus className="text-white" size={20} />
          <span className="font-semibold">Crear plan de ejercicio</span>
        </div>
      </div>
    </div>
  )
}

export default NutritionPlan
