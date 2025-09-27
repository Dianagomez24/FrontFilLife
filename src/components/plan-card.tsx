"use client"

import { Clock, Target, CheckCircle, Trash2 } from "lucide-react"
import type { ExercisePlan } from "../types/exercise-plan"

interface PlanCardProps {
  plan: ExercisePlan
  onToggleStatus: (planId: number) => void
  onDelete: (planId: number) => void
}

export function PlanCard({ plan, onToggleStatus, onDelete }: PlanCardProps) {
  return (
    <div
      className={`border-2 rounded-xl p-6 transition-all hover:shadow-lg ${
        plan.activo ? "border-[#959581] bg-[#959581]/5" : "border-gray-200 bg-gray-50"
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-[#2d3319] text-lg mb-1">{plan.nombre}</h3>
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
              plan.nivel_dificultad === "principiante"
                ? "bg-green-100 text-green-800"
                : plan.nivel_dificultad === "intermedio"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
            }`}
          >
            {plan.nivel_dificultad.charAt(0).toUpperCase() + plan.nivel_dificultad.slice(1)}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onToggleStatus(plan.id!)}
            className={`p-2 rounded-lg transition-colors ${
              plan.activo ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
            }`}
            title={plan.activo ? "Desactivar plan" : "Activar plan"}
          >
            <CheckCircle size={16} />
          </button>
          <button
            onClick={() => onDelete(plan.id!)}
            className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
            title="Eliminar plan"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <p className="text-[#bcc591] text-sm mb-4 line-clamp-2">{plan.descripcion}</p>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-[#2d3319]">
          <Clock size={16} className="text-[#959581]" />
          <span>{plan.duracion_minutos} minutos</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-[#2d3319]">
          <Target size={16} className="text-[#959581]" />
          <span>{plan.ejercicios.length} ejercicios</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="text-xs text-[#bcc591]">Creado: {new Date(plan.fecha_creacion!).toLocaleDateString()}</div>
      </div>
    </div>
  )
}
