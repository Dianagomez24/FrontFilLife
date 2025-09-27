"use client"

import { Dumbbell, Plus } from "lucide-react"

interface ExercisePlanHeaderProps {
  onCreateClick: () => void
}

export function ExercisePlanHeader({ onCreateClick }: ExercisePlanHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-[#959581] to-[#aeb99d] rounded-2xl p-8 text-white text-center">
      <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <Dumbbell className="text-white" size={40} />
      </div>
      <h1 className="text-3xl font-bold mb-4">Planes de Ejercicio</h1>
      <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
        Crea y gestiona tus rutinas personalizadas de entrenamiento
      </p>
      <button
        onClick={onCreateClick}
        className="bg-white text-[#2d3319] px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105 flex items-center gap-2 justify-center mx-auto"
      >
        <Plus size={20} />
        Crear Nuevo Plan
      </button>
    </div>
  )
}
