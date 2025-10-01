"use client"

import { Clock, Target, CheckCircle, Trash2, Eye } from "lucide-react"
import type { ExercisePlan } from "../types/exercise-plan"

interface PlanCardProps {
  plan: ExercisePlan
  onToggleStatus: (planId: number) => void
  onDelete: (planId: number) => void
  onViewDetails: (plan: ExercisePlan) => void
}

export function PlanCard({ plan, onToggleStatus, onDelete, onViewDetails }: PlanCardProps) {
  const nivelDisplay = plan.nivelDificultad?.toLowerCase() || 'principiante'
  
  return (
    <div className={`plan-card ${plan.activo ? 'active' : ''} card-hover`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-[#2d3319] text-lg mb-1">{plan.nombre}</h3>
          <span
            className={`nivel-badge ${
              nivelDisplay === "principiante"
                ? "nivel-principiante"
                : nivelDisplay === "intermedio"
                  ? "nivel-intermedio"
                  : "nivel-avanzado"
            }`}
          >
            {nivelDisplay.charAt(0).toUpperCase() + nivelDisplay.slice(1)}
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
          <Clock size={16} className="text-[#959581]" />
          <span>{plan.duracionMinutos} minutos</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-[#2d3319]">
          <Target size={16} className="text-[#959581]" />
          <span>{plan.ejercicios.length} ejercicios</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="text-xs text-[#bcc591]">Creado: {new Date(plan.fechaCreacion!).toLocaleDateString()}</div>
      </div>
    </div>
  )
}