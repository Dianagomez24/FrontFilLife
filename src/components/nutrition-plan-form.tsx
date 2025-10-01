"use client"
import { useState } from "react"
import { Apple, Plus, CheckCircle } from "lucide-react"
import { useNutritionPlans } from "../hooks/use-nutrition-plans"
import type { CreateNutritionPlanDto, Comida, Alimento } from "../types/nutrition"
import { MealForm } from "./meal-form"

interface NutritionPlanFormProps {
  onCancel: () => void
  onSubmit: (plan: CreateNutritionPlanDto) => void
}

export function NutritionPlanForm({ onCancel, onSubmit }: NutritionPlanFormProps) {
  const [formData, setFormData] = useState<CreateNutritionPlanDto>({
    nombre: "",
    descripcion: "",
    comidas: [{ nombre: "", horario: "", alimentos: [{ nombre: "", cantidad: "" }], notas: "" }],
    caloriasObjetivo: 2000,
  })

  const handleInputChange = (field: keyof CreateNutritionPlanDto, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleMealChange = (index: number, field: keyof Comida, value: any) => {
    const newComidas = [...formData.comidas]
    newComidas[index] = { ...newComidas[index], [field]: value }
    setFormData((prev) => ({ ...prev, comidas: newComidas }))
  }

  const handleAlimentoChange = (mealIndex: number, alimentoIndex: number, field: keyof Alimento, value: any) => {
    const newComidas = [...formData.comidas]
    newComidas[mealIndex].alimentos[alimentoIndex] = { 
      ...newComidas[mealIndex].alimentos[alimentoIndex], 
      [field]: value 
    }
    setFormData((prev) => ({ ...prev, comidas: newComidas }))
  }

  const addMeal = () => {
    setFormData((prev) => ({
      ...prev,
      comidas: [...prev.comidas, { nombre: "", horario: "", alimentos: [{ nombre: "", cantidad: "" }], notas: "" }],
    }))
  }

  const removeMeal = (index: number) => {
    if (formData.comidas.length > 1) {
      setFormData((prev) => ({
        ...prev,
        comidas: prev.comidas.filter((_, i) => i !== index),
      }))
    }
  }

  const addAlimento = (mealIndex: number) => {
    const newComidas = [...formData.comidas]
    newComidas[mealIndex].alimentos.push({ nombre: "", cantidad: "" })
    setFormData((prev) => ({ ...prev, comidas: newComidas }))
  }

  const removeAlimento = (mealIndex: number, alimentoIndex: number) => {
    const newComidas = [...formData.comidas]
    if (newComidas[mealIndex].alimentos.length > 1) {
      newComidas[mealIndex].alimentos.splice(alimentoIndex, 1)
      setFormData((prev) => ({ ...prev, comidas: newComidas }))
    }
  }

  const handleSubmit = () => {
    const comidasValidas = formData.comidas.every(comida => 
      comida.nombre.trim() && comida.alimentos.every(alimento => alimento.nombre.trim())
    )
    if (!comidasValidas) {
      alert('Por favor, complete al menos el nombre de cada comida y de cada alimento')
      return
    }

    onSubmit(formData)
  }

  const isFormValid = () => {
    return (
      formData.nombre.trim() &&
      formData.comidas.every(comida => comida.nombre.trim() && comida.alimentos.every(alimento => alimento.nombre.trim()))
    )
  }

  const getTotalCalories = () => {
    return formData.comidas.reduce((total, comida) => {
      const comidaCalorias = comida.alimentos.reduce((sum, alimento) => sum + (alimento.calorias || 0), 0)
      return total + comidaCalorias
    }, 0)
  }

  return (
    <div className="container">
      <div className="card">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-[#aeb99d] to-[#c4c9b5] rounded-full flex items-center justify-center mx-auto mb-4">
            <Apple className="text-white" size={24} />
          </div>
          <h2 className="page-title">Crear Plan de Nutrición</h2>
          <p className="page-subtitle">Diseña tu plan alimentario personalizado</p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group">
              <label className="form-label">Nombre del Plan *</label>
              <input
                type="text"
                className="form-input"
                placeholder="Ej: Plan nutricional para volumen"
                value={formData.nombre}
                onChange={(e) => handleInputChange("nombre", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Calorías Objetivo</label>
              <input
                type="number"
                min="800"
                max="5000"
                className="form-input"
                placeholder="2000"
                value={formData.caloriasObjetivo || ''}
                onChange={(e) => handleInputChange("caloriasObjetivo", Number.parseInt(e.target.value))}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Descripción</label>
            <textarea
              className="form-textarea"
              rows={3}
              placeholder="Describe el objetivo y características de tu plan nutricional"
              value={formData.descripcion || ''}
              onChange={(e) => handleInputChange("descripcion", e.target.value)}
            />
          </div>

          <div className="form-group">
            <div className="flex items-center justify-between mb-4">
              <label className="form-label">Comidas *</label>
              <div className="flex items-center gap-4">
                <div className="text-sm text-[#2d3319]">
                  Total estimado: <span className="font-semibold">{getTotalCalories()} cal</span>
                </div>
                <button
                  type="button"
                  onClick={addMeal}
                  className="btn btn-primary btn-sm"
                >
                  <Plus size={16} />
                  Agregar Comida
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {formData.comidas.map((comida, index) => (
                <MealForm
                  key={index}
                  meal={comida}
                  index={index}
                  onMealChange={handleMealChange}
                  onRemoveMeal={removeMeal}
                  onAlimentoChange={handleAlimentoChange}
                  onAddAlimento={addAlimento}
                  onRemoveAlimento={removeAlimento}
                  canRemove={formData.comidas.length > 1}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8 pt-6 border-t border-gray-100">
          <button
            onClick={onCancel}
            className="btn btn-secondary order-2 sm:order-1"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isFormValid()}
            className={`btn btn-lg order-1 sm:order-2 ${
              isFormValid() ? "btn-primary" : ""
            }`}
          >
            <CheckCircle size={20} />
            Guardar Plan
          </button>
        </div>
      </div>
    </div>
  )
}