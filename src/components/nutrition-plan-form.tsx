"use client"
import type React from "react"
import { useState } from "react"
import { Apple, Plus, CheckCircle } from "lucide-react"
import type { NutritionPlan, Meal, User } from "../types/nutrition"
import MealForm from "./meal-form"

interface NutritionPlanFormProps {
  user: User
  onCancel: () => void
  onSubmit: (plan: NutritionPlan) => void
}

const NutritionPlanForm: React.FC<NutritionPlanFormProps> = ({ user, onCancel, onSubmit }) => {
  const [formData, setFormData] = useState<NutritionPlan>({
    nombre: "",
    descripcion: "",
    comidas: [{ nombre: "", tipo: "desayuno", alimentos: "", calorias: 0, notas: "" }],
    calorias_objetivo: 2000,
    activo: true,
  })

  const handleInputChange = (field: keyof NutritionPlan, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleMealChange = (index: number, field: keyof Meal, value: any) => {
    const newComidas = [...formData.comidas]
    newComidas[index] = { ...newComidas[index], [field]: value }
    setFormData((prev) => ({ ...prev, comidas: newComidas }))
  }

  const addMeal = () => {
    setFormData((prev) => ({
      ...prev,
      comidas: [...prev.comidas, { nombre: "", tipo: "desayuno", alimentos: "", calorias: 0, notas: "" }],
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

  const handleSubmit = () => {
    const newPlan: NutritionPlan = {
      ...formData,
      id: Date.now(), // Mock ID - replace with real database ID
      usuario_id: user.id,
      fecha_creacion: new Date().toISOString().split("T")[0],
      fecha_actualizacion: new Date().toISOString().split("T")[0],
    }

    onSubmit(newPlan)
  }

  const isFormValid = () => {
    return (
      formData.nombre.trim() &&
      formData.descripcion.trim() &&
      formData.calorias_objetivo > 0 &&
      formData.comidas.every((comida: { nombre: string; alimentos: string; calorias: number }) => comida.nombre.trim() && comida.alimentos.trim() && comida.calorias > 0)
    )
  }

  const getTotalCalories = () => {
    return formData.comidas.reduce((total: any, comida: { calorias: any }) => {
        return total + comida.calorias
    }, 0)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-[#aeb99d] to-[#c4c9b5] rounded-full flex items-center justify-center mx-auto mb-4">
            <Apple className="text-white" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-[#2d3319] mb-2">Crear Plan de Nutrición</h2>
          <p className="text-[#bcc591]">Diseña tu plan alimentario personalizado</p>
        </div>

        <div className="space-y-6">
          {/* Información básica del plan */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-[#2d3319] mb-2">Nombre del Plan *</label>
              <input
                type="text"
                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#aeb99d] focus:ring-2 focus:ring-[#aeb99d]/20 bg-white"
                placeholder="Ej: Plan Mediterráneo"
                value={formData.nombre}
                onChange={(e) => handleInputChange("nombre", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#2d3319] mb-2">Calorías Objetivo *</label>
              <input
                type="number"
                min="1000"
                max="5000"
                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#aeb99d] focus:ring-2 focus:ring-[#aeb99d]/20 bg-white"
                placeholder="2000"
                value={formData.calorias_objetivo}
                onChange={(e) => handleInputChange("calorias_objetivo", Number.parseInt(e.target.value))}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#2d3319] mb-2">Descripción *</label>
            <textarea
              className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#aeb99d] focus:ring-2 focus:ring-[#aeb99d]/20 bg-white"
              rows={3}
              placeholder="Describe el objetivo y características de tu plan nutricional"
              value={formData.descripcion}
              onChange={(e) => handleInputChange("descripcion", e.target.value)}
            />
          </div>

          {/* Lista de comidas */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-semibold text-[#2d3319]">Comidas *</label>
              <div className="flex items-center gap-4">
                <div className="text-sm text-[#2d3319]">
                  Total: <span className="font-semibold">{getTotalCalories()} cal</span>
                </div>
                <button
                  type="button"
                  onClick={addMeal}
                  className="flex items-center gap-2 px-4 py-2 bg-[#aeb99d] text-white rounded-lg hover:bg-[#c4c9b5] transition-colors"
                >
                  <Plus size={16} />
                  Agregar Comida
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {formData.comidas.map((comida: unknown, index: number) => (
                <MealForm
                  key={index}
                  meal={comida}
                  index={index}
                  onMealChange={handleMealChange}
                  onRemoveMeal={removeMeal}
                  canRemove={formData.comidas.length > 1}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
          <button
            onClick={onCancel}
            className="px-6 py-3 text-[#2d3319] hover:bg-gray-50 rounded-xl font-semibold transition-all"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isFormValid()}
            className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all ${
              isFormValid()
                ? "bg-gradient-to-r from-[#aeb99d] to-[#c4c9b5] text-white hover:shadow-lg hover:scale-105"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
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

export default NutritionPlanForm
