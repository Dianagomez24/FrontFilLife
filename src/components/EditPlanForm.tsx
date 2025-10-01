"use client"

import { useState, useEffect } from "react"
import { Dumbbell, Plus, Save, ArrowLeft } from "lucide-react"
import { ExerciseItem } from "./exercise-item"
import type { ExercisePlan, UpdateExercisePlanDto, Exercise } from "../types/exercise-plan"

interface EditPlanFormProps {
  plan: ExercisePlan
  onSubmit: (planId: number, planData: UpdateExercisePlanDto) => void
  onCancel: () => void
}

export function EditPlanForm({ plan, onSubmit, onCancel }: EditPlanFormProps) {
  const [formData, setFormData] = useState<UpdateExercisePlanDto>({
    nombre: plan.nombre,
    descripcion: plan.descripcion,
    ejercicios: plan.ejercicios,
    duracionMinutos: plan.duracionMinutos,
    nivelDificultad: plan.nivelDificultad,
    activo: plan.activo,
  })

  useEffect(() => {
    setFormData({
      nombre: plan.nombre,
      descripcion: plan.descripcion,
      ejercicios: plan.ejercicios,
      duracionMinutos: plan.duracionMinutos,
      nivelDificultad: plan.nivelDificultad,
      activo: plan.activo,
    })
  }, [plan])

  const handleInputChange = (field: keyof UpdateExercisePlanDto, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleExerciseChange = (index: number, field: keyof Exercise, value: any) => {
    const newEjercicios = [...(formData.ejercicios || [])]
    newEjercicios[index] = { ...newEjercicios[index], [field]: value }
    setFormData((prev) => ({ ...prev, ejercicios: newEjercicios }))
  }

  const addExercise = () => {
    setFormData((prev) => ({
      ...prev,
      ejercicios: [...(prev.ejercicios || []), { nombre: "", series: 1, repeticiones: 8, descanso: 60, notas: "" }],
    }))
  }

  const removeExercise = (index: number) => {
    if (formData.ejercicios && formData.ejercicios.length > 1) {
      setFormData((prev) => ({
        ...prev,
        ejercicios: prev.ejercicios!.filter((_, i) => i !== index),
      }))
    }
  }

  const handleSubmit = () => {
    const ejerciciosValidos = formData.ejercicios!.every(ej => ej.nombre.trim() !== '')
    if (!ejerciciosValidos) {
      alert('Por favor, complete al menos el nombre de cada ejercicio')
      return
    }

    onSubmit(plan.id!, formData)
  }

  const isFormValid = () => {
    return (
      formData.nombre!.trim() &&
      formData.ejercicios!.every((ej) => ej.nombre.trim())
    )
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
            <div className="w-12 h-12 bg-gradient-to-br from-[#959581] to-[#aeb99d] rounded-full flex items-center justify-center">
              <Dumbbell className="text-white" size={20} />
            </div>
            <div>
              <h2 className="page-title">Editar Plan de Ejercicio</h2>
              <p className="page-subtitle">Modifica tu rutina personalizada</p>
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
                placeholder="Ej: Rutina de Fuerza"
                value={formData.nombre}
                onChange={(e) => handleInputChange("nombre", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Duración (minutos)</label>
              <input
                type="number"
                min="15"
                max="180"
                className="form-input"
                placeholder="60"
                value={formData.duracionMinutos}
                onChange={(e) => handleInputChange("duracionMinutos", Number.parseInt(e.target.value))}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Descripción</label>
            <textarea
              className="form-textarea"
              rows={3}
              placeholder="Describe el objetivo y características de tu plan"
              value={formData.descripcion}
              onChange={(e) => handleInputChange("descripcion", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Nivel de Dificultad</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { value: "PRINCIPIANTE", label: "Principiante", desc: "Ideal para comenzar" },
                { value: "INTERMEDIO", label: "Intermedio", desc: "Con experiencia previa" },
                { value: "AVANZADO", label: "Avanzado", desc: "Nivel experto" },
              ].map((nivel) => (
                <label key={nivel.value} className="cursor-pointer">
                  <input
                    type="radio"
                    name="nivelDificultad"
                    value={nivel.value}
                    checked={formData.nivelDificultad === nivel.value}
                    onChange={(e) => handleInputChange("nivelDificultad", e.target.value as any)}
                    className="sr-only"
                  />
                  <div
                    className={`p-4 border-2 rounded-xl text-center transition-all ${
                      formData.nivelDificultad === nivel.value
                        ? "border-[#959581] bg-[#959581]/5"
                        : "border-gray-200 hover:border-[#aeb99d]"
                    }`}
                  >
                    <div className="font-semibold text-[#2d3319]">{nivel.label}</div>
                    <div className="text-sm text-[#bcc591] mt-1">{nivel.desc}</div>
                  </div>
                </label>
              ))}
            </div>
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
                  className="w-4 h-4 text-[#959581] focus:ring-[#959581] border-gray-300"
                />
                <span className="text-[#2d3319] font-medium">Activo</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="activo"
                  checked={formData.activo === false}
                  onChange={() => handleInputChange("activo", false)}
                  className="w-4 h-4 text-[#959581] focus:ring-[#959581] border-gray-300"
                />
                <span className="text-[#2d3319] font-medium">Inactivo</span>
              </label>
            </div>
          </div>

          <div className="form-group">
            <div className="flex items-center justify-between mb-4">
              <label className="form-label">Ejercicios *</label>
              <button
                type="button"
                onClick={addExercise}
                className="btn btn-primary btn-sm"
              >
                <Plus size={16} />
                Agregar Ejercicio
              </button>
            </div>

            <div className="space-y-4">
              {formData.ejercicios!.map((ejercicio, index) => (
                <ExerciseItem
                  key={index}
                  exercise={ejercicio}
                  index={index}
                  canRemove={formData.ejercicios!.length > 1}
                  onChange={(field, value) => handleExerciseChange(index, field, value)}
                  onRemove={() => removeExercise(index)}
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