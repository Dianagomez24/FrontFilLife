"use client"
import { Target, Utensils, CheckCircle, Trash2, Eye } from "lucide-react"
import type { NutritionPlan } from "../types/nutrition"

interface NutritionPlanCardProps {
  plan: NutritionPlan
  onToggleStatus: (planId: number) => void
  onDelete: (planId: number) => void
  onViewDetails: (plan: NutritionPlan) => void
}

export function NutritionPlanCard({ plan, onToggleStatus, onDelete, onViewDetails }: NutritionPlanCardProps) {
  const totalCalories = plan.comidas.reduce((total, comida) => {
    const comidaCalorias = comida.alimentos.reduce((sum, alimento) => sum + (alimento.calorias || 0), 0)
    return total + comidaCalorias
  }, 0)

  return (
    <div className={`plan-card ${plan.activo ? 'active' : ''} card-hover`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-[#2d3319] text-lg mb-1">{plan.nombre}</h3>
          <span className="nivel-badge nivel-principiante">
            {plan.caloriasObjetivo || totalCalories} cal/día
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onViewDetails(plan)}
            className="btn btn-secondary btn-sm"
            title="Ver detalles"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => onToggleStatus(plan.id!)}
            className={`btn btn-sm ${
              plan.activo ? "btn-primary" : "btn-secondary"
            }`}
            title={plan.activo ? "Desactivar plan" : "Activar plan"}
          >
            <CheckCircle size={16} />
          </button>
          <button
            onClick={() => onDelete(plan.id!)}
            className="btn btn-danger btn-sm"
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
          <span>{plan.caloriasObjetivo || totalCalories} calorías objetivo</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-[#2d3319]">
          <Utensils size={16} className="text-[#aeb99d]" />
          <span>{plan.comidas.length} comidas</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="text-xs text-[#bcc591]">Creado: {new Date(plan.fechaCreacion!).toLocaleDateString()}</div>
      </div>
    </div>
  )
}