"use client"
import { Trash2, Plus } from "lucide-react"
import type { Comida, Alimento } from "../types/nutrition"

interface MealFormProps {
  meal: Comida
  index: number
  onMealChange: (index: number, field: keyof Comida, value: any) => void
  onRemoveMeal: (index: number) => void
  onAlimentoChange: (mealIndex: number, alimentoIndex: number, field: keyof Alimento, value: any) => void
  onAddAlimento: (mealIndex: number) => void
  onRemoveAlimento: (mealIndex: number, alimentoIndex: number) => void
  canRemove: boolean
}

export function MealForm({ 
  meal, 
  index, 
  onMealChange, 
  onRemoveMeal, 
  onAlimentoChange, 
  onAddAlimento, 
  onRemoveAlimento, 
  canRemove 
}: MealFormProps) {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-[#2d3319]">Comida {index + 1}</h4>
        {canRemove && (
          <button 
            type="button" 
            onClick={() => onRemoveMeal(index)} 
            className="btn btn-danger btn-sm"
          >
            <Trash2 size={16} />
            Eliminar Comida
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="form-group">
          <label className="form-label">Nombre de la comida *</label>
          <input
            type="text"
            className="form-input"
            placeholder="Ej: Desayuno"
            value={meal.nombre}
            onChange={(e) => onMealChange(index, "nombre", e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Horario</label>
          <input
            type="text"
            className="form-input"
            placeholder="Ej: 8:00 AM"
            value={meal.horario || ''}
            onChange={(e) => onMealChange(index, "horario", e.target.value)}
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Notas (opcional)</label>
        <input
          type="text"
          className="form-input"
          placeholder="Notas sobre esta comida"
          value={meal.notas || ''}
          onChange={(e) => onMealChange(index, "notas", e.target.value)}
        />
      </div>

      <div className="form-group">
        <div className="flex items-center justify-between mb-4">
          <label className="form-label">Alimentos *</label>
          <button
            type="button"
            onClick={() => onAddAlimento(index)}
            className="btn btn-primary btn-sm"
          >
            <Plus size={16} />
            Agregar Alimento
          </button>
        </div>

        <div className="space-y-3">
          {meal.alimentos.map((alimento, alimentoIndex) => (
            <div key={alimentoIndex} className="card">
              <div className="flex items-center justify-between mb-3">
                <h5 className="font-medium text-[#2d3319] text-sm">Alimento {alimentoIndex + 1}</h5>
                {meal.alimentos.length > 1 && (
                  <button 
                    type="button" 
                    onClick={() => onRemoveAlimento(index, alimentoIndex)} 
                    className="btn btn-danger btn-sm"
                  >
                    <Trash2 size={14} />
                    Eliminar
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="form-group">
                  <label className="form-label">Nombre *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Ej: Manzana"
                    value={alimento.nombre}
                    onChange={(e) => onAlimentoChange(index, alimentoIndex, "nombre", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Cantidad</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Ej: 1 unidad"
                    value={alimento.cantidad || ''}
                    onChange={(e) => onAlimentoChange(index, alimentoIndex, "cantidad", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Calorías</label>
                  <input
                    type="number"
                    min="0"
                    className="form-input"
                    placeholder="0"
                    value={alimento.calorias || ''}
                    onChange={(e) => onAlimentoChange(index, alimentoIndex, "calorias", Number.parseInt(e.target.value) || undefined)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Proteínas (g)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    className="form-input"
                    placeholder="0"
                    value={alimento.proteinas || ''}
                    onChange={(e) => onAlimentoChange(index, alimentoIndex, "proteinas", Number.parseFloat(e.target.value) || undefined)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Carbohidratos (g)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    className="form-input"
                    placeholder="0"
                    value={alimento.carbohidratos || ''}
                    onChange={(e) => onAlimentoChange(index, alimentoIndex, "carbohidratos", Number.parseFloat(e.target.value) || undefined)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Grasas (g)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    className="form-input"
                    placeholder="0"
                    value={alimento.grasas || ''}
                    onChange={(e) => onAlimentoChange(index, alimentoIndex, "grasas", Number.parseFloat(e.target.value) || undefined)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}