"use client"

import { X, Edit, Clock, Target, Dumbbell } from "lucide-react"
import type { ExercisePlan } from "../types/exercise-plan"

interface PlanDetailsModalProps {
  plan: ExercisePlan
  isOpen: boolean
  onClose: () => void
  onEdit: (plan: ExercisePlan) => void
}

export function PlanDetailsModal({ plan, isOpen, onClose, onEdit }: PlanDetailsModalProps) {
  if (!isOpen) return null

  const nivelDisplay = plan.nivelDificultad?.toLowerCase() || 'principiante'

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">

        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white rounded-t-2xl">
          <div className="flex items-center gap-4">

            <div className="w-12 h-12 bg-gradient-to-br from-[#959581] to-[#aeb99d] rounded-full flex items-center justify-center">
              <Dumbbell className="text-white" size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#2d3319]">{plan.nombre}</h2>
              <div className="flex items-center gap-2 mt-1">
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
                <span className={`text-sm font-medium ${plan.activo ? 'text-green-600' : 'text-gray-500'}`}>
                  {plan.activo ? '• Activo' : '• Inactivo'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(plan)}
              className="btn btn-primary btn-sm"
              title="Editar plan"
            >
              <Edit size={16} />
              Editar
            </button>
            <button
              onClick={onClose}
              className="btn btn-secondary btn-sm"
              title="Cerrar"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Clock className="text-[#959581]" size={20} />
              <div>
                <p className="text-sm text-gray-600">Duración</p>
                <p className="font-semibold text-[#2d3319]">{plan.duracionMinutos} minutos</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">

              <Target className="text-[#959581]" size={20} />

              <div>
                <p className="text-sm text-gray-600">Ejercicios</p>
                <p className="font-semibold text-[#2d3319]">{plan.ejercicios.length} ejercicios</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Dumbbell className="text-[#959581]" size={20} />
              <div>
                <p className="text-sm text-gray-600">Estado</p>
                <p className={`font-semibold ${plan.activo ? 'text-green-600' : 'text-gray-600'}`}>
                  {plan.activo ? 'Activo' : 'Inactivo'}
                </p>
              </div>
            </div>
          </div>

          {plan.descripcion && (
            <div>
              <h3 className="text-lg font-semibold text-[#2d3319] mb-3">Descripción</h3>
              <p className="text-gray-700 leading-relaxed">{plan.descripcion}</p>
            </div>
          )}

          <div>
            <h3 className="text-lg font-semibold text-[#2d3319] mb-4">

              Ejercicios ({plan.ejercicios.length})
            </h3>
            <div className="space-y-4">
              {plan.ejercicios.map((ejercicio, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-[#2d3319] text-lg">
                      {index + 1}. {ejercicio.nombre}
                    </h4>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    <div>
                      <p className="text-sm text-gray-600">Series</p>

                      <p className="font-medium text-[#2d3319]">{ejercicio.series || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Repeticiones</p>
                      <p className="font-medium text-[#2d3319]">{ejercicio.repeticiones || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Descanso</p>
                      <p className="font-medium text-[#2d3319]">

                        {ejercicio.descanso ? `${ejercicio.descanso}s` : '-'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Peso</p>
                      <p className="font-medium text-[#2d3319]">
                        {ejercicio.peso ? `${ejercicio.peso}kg` : '-'}
                      </p>
                    </div>
                  </div>

                  {ejercicio.duracion && (
                    <div className="mb-3">
                      <p className="text-sm text-gray-600">Duración</p>

                      <p className="font-medium text-[#2d3319]">{ejercicio.duracion} segundos</p>
                    </div>
                  )}

                  {ejercicio.notas && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Notas</p>
                      <p className="text-gray-700 text-sm">{ejercicio.notas}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            
            <p className="text-sm text-gray-600">
              Creado: {new Date(plan.fechaCreacion!).toLocaleDateString('es-ES', {

                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}