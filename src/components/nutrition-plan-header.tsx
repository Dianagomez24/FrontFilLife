"use client"

import { Apple } from "lucide-react"

interface NutritionPlanHeaderProps {
  onCreateClick: () => void
}

export function NutritionPlanHeader({ onCreateClick }: NutritionPlanHeaderProps) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#2d3319] mb-2">Planes de Nutrición</h1>
          <p className="text-[#bcc591]">Crea y gestiona tus planes nutricionales personalizados</p>
        </div>
        <button
          onClick={onCreateClick}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#aeb99d] to-[#c4c9b5] text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all font-semibold"
        >
          <Apple size={20} />
          Crear Plan Nutricional
        </button>
      </div>
    </div>
  )
}