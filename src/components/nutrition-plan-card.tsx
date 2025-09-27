"use client"
import type React from "react"
import { Target, Utensils, CheckCircle, Trash2 } from "lucide-react"
import type { NutritionPlan } from "../types/nutrition"

interface NutritionPlanCardProps {
  plan: NutritionPlan
  onToggleStatus: (planId: number) => void
  onDelete: (planId: number) => void
}

const NutritionPlanCard: React.FC<NutritionPlanCardProps> = ({ plan, onToggleStatus, onDelete }) => {
  return (
    <div
      className={`border-2 rounded-xl p-6 transition-all hover:shadow-lg ${
        plan.activo ? "border-[#aeb99d] bg-[#aeb99d]/5" : "border-gray-200 bg-gray-50"
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-[#2d3319] text-lg mb-1">{plan.nombre}</h3>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {plan.calorias_objetivo} cal/día
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
          <Target size={16} className="text-[#aeb99d]" />
          <span>{plan.calorias_objetivo} calorías objetivo</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-[#2d3319]">
          <Utensils size={16} className="text-[#aeb99d]" />
          <span>{plan.comidas.length} comidas</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="text-xs text-[#bcc591]">Creado: {new Date(plan.fecha_creacion!).toLocaleDateString()}</div>
      </div>
    </div>
  )
}

export default NutritionPlanCard
