"use client"
import type React from "react"
import { Trash2 } from "lucide-react"
import type { Meal } from "../types/nutrition"

interface MealFormProps {
  meal: Meal
  index: number
  onMealChange: (index: number, field: keyof Meal, value: any) => void
  onRemoveMeal: (index: number) => void
  canRemove: boolean
}

const MealForm: React.FC<MealFormProps> = ({ meal, index, onMealChange, onRemoveMeal, canRemove }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-[#2d3319]">Comida {index + 1}</h4>
        {canRemove && (
          <button
            type="button"
            onClick={() => onRemoveMeal(index)}
            className="text-red-500 hover:text-red-700 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-medium text-[#2d3319] mb-1">Nombre *</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#aeb99d] bg-white"
            placeholder="Ej: Avena con frutas"
            value={meal.nombre}
            onChange={(e) => onMealChange(index, "nombre", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#2d3319] mb-1">Tipo *</label>
          <select
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#aeb99d] bg-white"
            value={meal.tipo}
            onChange={(e) => onMealChange(index, "tipo", e.target.value as any)}
          >
            <option value="desayuno">Desayuno</option>
            <option value="almuerzo">Almuerzo</option>
            <option value="cena">Cena</option>
            <option value="snack">Snack</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-[#2d3319] mb-1">Calorías *</label>
          <input
            type="number"
            min="1"
            max="2000"
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#aeb99d] bg-white"
            placeholder="350"
            value={meal.calorias}
            onChange={(e) => onMealChange(index, "calorias", Number.parseInt(e.target.value))}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#2d3319] mb-1">Alimentos *</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#aeb99d] bg-white"
            placeholder="Avena, plátano, fresas"
            value={meal.alimentos}
            onChange={(e) => onMealChange(index, "alimentos", e.target.value)}
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-xs font-medium text-[#2d3319] mb-1">Notas (opcional)</label>
        <input
          type="text"
          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#aeb99d] bg-white"
          placeholder="Preparación, consejos, etc."
          value={meal.notas || ""}
          onChange={(e) => onMealChange(index, "notas", e.target.value)}
        />
      </div>
    </div>
  )
}

export default MealForm
