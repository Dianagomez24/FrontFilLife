
import { useState, useEffect } from "react"
import { Apple, Plus, Save, ArrowLeft } from "lucide-react"
import type { NutritionPlan, UpdateNutritionPlanDto, Comida, Alimento } from "../types/nutrition"
import { MealForm } from "./meal-form"

interface EditNutritionPlanFormProps {
  plan: NutritionPlan
  onSubmit: (planId: number, planData: UpdateNutritionPlanDto) => void
  onCancel: () => void
}

export function EditNutritionPlanForm({ plan, onSubmit, onCancel }: EditNutritionPlanFormProps) {
  const [formData, setFormData] = useState<UpdateNutritionPlanDto>({
    nombre: plan.nombre,
    descripcion: plan.descripcion,
    comidas: plan.comidas,
    caloriasObjetivo: plan.caloriasObjetivo,
    activo: plan.activo,
  })

  useEffect(() => {
    setFormData({
      nombre: plan.nombre,
      descripcion: plan.descripcion,
      comidas: plan.comidas,
      caloriasObjetivo: plan.caloriasObjetivo,
      activo: plan.activo,
    })
  }, [plan])

  const handleInputChange = (field: keyof UpdateNutritionPlanDto, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleMealChange = (index: number, field: keyof Comida, value: any) => {
    const newComidas = [...(formData.comidas || [])]
    newComidas[index] = { ...newComidas[index], [field]: value }
    setFormData((prev) => ({ ...prev, comidas: newComidas }))
  }

  const handleAlimentoChange = (mealIndex: number, alimentoIndex: number, field: keyof Alimento, value: any) => {
    const newComidas = [...(formData.comidas || [])]
    newComidas[mealIndex].alimentos[alimentoIndex] = { 
      ...newComidas[mealIndex].alimentos[alimentoIndex], 
      [field]: value 
    }
    setFormData((prev) => ({ ...prev, comidas: newComidas }))
  }

  const addMeal = () => {
    setFormData((prev) => ({
      ...prev,
      comidas: [...(prev.comidas || []), { nombre: "", horario: "", alimentos: [{ nombre: "", cantidad: "" }], notas: "" }],
    }))
  }

  const removeMeal = (index: number) => {
    if (formData.comidas && formData.comidas.length > 1) {
      setFormData((prev) => ({
        ...prev,
        comidas: prev.comidas!.filter((_, i) => i !== index),
      }))
    }
  }

  const addAlimento = (mealIndex: number) => {
    const newComidas = [...(formData.comidas || [])]
    newComidas[mealIndex].alimentos.push({ nombre: "", cantidad: "" })
    setFormData((prev) => ({ ...prev, comidas: newComidas }))
  }

  const removeAlimento = (mealIndex: number, alimentoIndex: number) => {
    const newComidas = [...(formData.comidas || [])]
    if (newComidas[mealIndex].alimentos.length > 1) {
      newComidas[mealIndex].alimentos.splice(alimentoIndex, 1)
      setFormData((prev) => ({ ...prev, comidas: newComidas }))
    }
  }

  const handleSubmit = () => {
    const comidasValidas = formData.comidas?.every(comida => 
      comida.nombre.trim() && comida.alimentos.every(alimento => alimento.nombre.trim())
    )
    if (!comidasValidas) {
      alert('Por favor, complete al menos el nombre de cada comida y de cada alimento')
      return
    }

    onSubmit(plan.id!, formData)
  }

  const isFormValid = () => {
    return (
      formData.nombre?.trim() &&
      formData.comidas?.every(comida => comida.nombre.trim() && comida.alimentos.every(alimento => alimento.nombre.trim()))
    )
  }

  const getTotalCalories = () => {
    return formData.comidas?.reduce((total, comida) => {
      const comidaCalorias = comida.alimentos.reduce((sum, alimento) => sum + (alimento.calorias || 0), 0)
      return total + comidaCalorias
    }, 0) || 0
  }

  return (
    <div className="container">
      <div className="card">

        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onCancel}
            className="btn btn-secondary btn-sm"
          >
            <ArrowLeft size={16} />
            Volver
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#aeb99d] to-[#c4c9b5] rounded-full flex items-center justify-center">
              
              <Apple className="text-white" size={20} />
            </div>
            <div>
              <h2 className="page-title">Editar Plan de Nutrición</h2>
              <p className="page-subtitle">Modifica tu plan alimentario personalizado</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">


          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group">
              <label className="form-label">Nombre del Plan *</label>
              <input
                type="text"

                className="form-input"
                placeholder="Ej: Plan Mediterráneo"
                value={formData.nombre || ''}

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
            <label className="form-label">Estado</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="activo"
                  checked={formData.activo === true}
                  onChange={() => handleInputChange("activo", true)}
                  className="w-4 h-4 text-[#aeb99d] focus:ring-[#aeb99d] border-gray-300"
                />
                <span className="text-[#2d3319] font-medium">Activo</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="activo"
                  checked={formData.activo === false}
                  onChange={() => handleInputChange("activo", false)}
                  className="w-4 h-4 text-[#aeb99d] focus:ring-[#aeb99d] border-gray-300"
                />
                <span className="text-[#2d3319] font-medium">Inactivo</span>
              </label>
            </div>
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
              {formData.comidas?.map((comida, index) => (
                <MealForm
                  key={index}
                  meal={comida}
                  index={index}

                  onMealChange={handleMealChange}
                  onRemoveMeal={removeMeal}
                  onAlimentoChange={handleAlimentoChange}

                  onAddAlimento={addAlimento}
                  onRemoveAlimento={removeAlimento}
                  canRemove={(formData.comidas?.length || 0) > 1}
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
            <Save size={20} />
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  )
}