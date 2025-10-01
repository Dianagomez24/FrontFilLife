"use client"

import { X, Edit, Utensils, Target, Apple } from "lucide-react"
import type { NutritionPlan } from "../types/nutrition"

interface NutritionPlanDetailsModalProps {
  plan: NutritionPlan
  isOpen: boolean
  onClose: () => void
  onEdit: (plan: NutritionPlan) => void
}

export function NutritionPlanDetailsModal({ plan, isOpen, onClose, onEdit }: NutritionPlanDetailsModalProps) {
  if (!isOpen) return null

  const totalCalories = plan.comidas.reduce((total, comida) => {
    const comidaCalorias = comida.alimentos.reduce((sum, alimento) => sum + (alimento.calorias || 0), 0)
    return total + comidaCalorias
  }, 0)

  const totalProteinas = plan.comidas.reduce((total, comida) => {
    return total + comida.alimentos.reduce((sum, alimento) => sum + (alimento.proteinas || 0), 0)
  }, 0)

  const totalCarbohidratos = plan.comidas.reduce((total, comida) => {
    return total + comida.alimentos.reduce((sum, alimento) => sum + (alimento.carbohidratos || 0), 0)
  }, 0)

  const totalGrasas = plan.comidas.reduce((total, comida) => {
    return total + comida.alimentos.reduce((sum, alimento) => sum + (alimento.grasas || 0), 0)
  }, 0)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white rounded-t-2xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#aeb99d] to-[#c4c9b5] rounded-full flex items-center justify-center">
              <Apple className="text-white" size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#2d3319]">{plan.nombre}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="nivel-badge nivel-principiante">
                  {plan.caloriasObjetivo || totalCalories} cal/día
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Target className="text-[#aeb99d]" size={20} />
              <div>
                <p className="text-sm text-gray-600">Calorías objetivo</p>
                <p className="font-semibold text-[#2d3319]">{plan.caloriasObjetivo || totalCalories} cal</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Utensils className="text-[#aeb99d]" size={20} />
              <div>
                <p className="text-sm text-gray-600">Comidas</p>
                <p className="font-semibold text-[#2d3319]">{plan.comidas.length} comidas</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Apple className="text-[#aeb99d]" size={20} />
              <div>
                <p className="text-sm text-gray-600">Total calorías</p>
                <p className="font-semibold text-[#2d3319]">{totalCalories} cal</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Utensils className="text-[#aeb99d]" size={20} />
              <div>
                <p className="text-sm text-gray-600">Estado</p>
                <p className={`font-semibold ${plan.activo ? 'text-green-600' : 'text-gray-600'}`}>
                  {plan.activo ? 'Activo' : 'Inactivo'}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-600 font-medium">Proteínas</p>
              <p className="text-2xl font-bold text-blue-700">{totalProteinas}g</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-600 font-medium">Carbohidratos</p>
              <p className="text-2xl font-bold text-green-700">{totalCarbohidratos}g</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm text-yellow-600 font-medium">Grasas</p>
              <p className="text-2xl font-bold text-yellow-700">{totalGrasas}g</p>
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
              Comidas ({plan.comidas.length})
            </h3>
            <div className="space-y-6">
              {plan.comidas.map((comida, index) => {
                const comidaCalorias = comida.alimentos.reduce((sum, alimento) => sum + (alimento.calorias || 0), 0)

                const comidaProteinas = comida.alimentos.reduce((sum, alimento) => sum + (alimento.proteinas || 0), 0)

                const comidaCarbohidratos = comida.alimentos.reduce((sum, alimento) => sum + (alimento.carbohidratos || 0), 0)



                const comidaGrasas = comida.alimentos.reduce((sum, alimento) => sum + (alimento.grasas || 0), 0)

                return (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-[#2d3319] text-lg">
                          {index + 1}. {comida.nombre}
                        </h4>
                        {comida.horario && (
                          <p className="text-gray-600 text-sm mt-1">⏰ {comida.horario}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[#2d3319]">{comidaCalorias} cal</p>
                        <p className="text-sm text-gray-600">


                          P: {comidaProteinas}g • C: {comidaCarbohidratos}g • G: {comidaGrasas}g
                        </p>


                      </div>

                    </div>


                    {comida.notas && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-1">Notas:</p>
                        <p className="text-gray-700 text-sm">{comida.notas}</p>
                      </div>
                    )}

                    <div>
                      <h5 className="font-medium text-[#2d3319] mb-3">Alimentos:</h5>
                      <div className="space-y-3">
                        {comida.alimentos.map((alimento, alimentoIndex) => (
                          <div key={alimentoIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                            <div>
                              <p className="font-medium text-[#2d3319]">{alimento.nombre}</p>
                              {alimento.cantidad && (
                                <p className="text-sm text-gray-600">{alimento.cantidad}</p>
                              )}
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-[#2d3319]">
                                {alimento.calorias || 0} cal
                              </p>
                              <p className="text-xs text-gray-600">
                                {alimento.proteinas || 0}g P • {alimento.carbohidratos || 0}g C • {alimento.grasas || 0}g G
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
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