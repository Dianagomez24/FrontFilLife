"use client"

import { useState } from "react"
import { Dumbbell, Plus, CheckCircle } from "lucide-react"
import { ExerciseItem } from "./exercise-item"
import type { ExercisePlan, Exercise } from "../types/exercise-plan"

interface CreatePlanFormProps {
  onSubmit: (plan: ExercisePlan) => void
  onCancel: () => void
}

export function CreatePlanForm({ onSubmit, onCancel }: CreatePlanFormProps) {
  const [formData, setFormData] = useState<ExercisePlan>({
    nombre: "",
    descripcion: "",
    ejercicios: [{ nombre: "", series: 1, repeticiones: "", descanso: "", notas: "" }],
    duracion_minutos: 30,
    nivel_dificultad: "principiante",
    activo: true,
  })

  const handleInputChange = (field: keyof ExercisePlan, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleExerciseChange = (index: number, field: keyof Exercise, value: any) => {
    const newEjercicios = [...formData.ejercicios]
    newEjercicios[index] = { ...newEjercicios[index], [field]: value }
    setFormData((prev) => ({ ...prev, ejercicios: newEjercicios }))
  }

  const addExercise = () => {
    setFormData((prev) => ({
      ...prev,
      ejercicios: [...prev.ejercicios, { nombre: "", series: 1, repeticiones: "", descanso: "", notas: "" }],
    }))
  }

  const removeExercise = (index: number) => {
    if (formData.ejercicios.length > 1) {
      setFormData((prev) => ({
        ...prev,
        ejercicios: prev.ejercicios.filter((_, i) => i !== index),
      }))
    }
  }

  const handleSubmit = () => {
    onSubmit(formData)

    // Reset form
    setFormData({
      nombre: "",
      descripcion: "",
      ejercicios: [{ nombre: "", series: 1, repeticiones: "", descanso: "", notas: "" }],
      duracion_minutos: 30,
      nivel_dificultad: "principiante",
      activo: true,
    })
  }

  const isFormValid = () => {
    return (
      formData.nombre.trim() &&
      formData.descripcion.trim() &&
      formData.ejercicios.every((ej) => ej.nombre.trim() && ej.repeticiones.trim() && ej.descanso.trim())
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-[#959581] to-[#aeb99d] rounded-full flex items-center justify-center mx-auto mb-4">
            <Dumbbell className="text-white" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-[#2d3319] mb-2">Crear Plan de Ejercicio</h2>
          <p className="text-[#bcc591]">Diseña tu rutina personalizada</p>
        </div>

        <div className="space-y-6">
          {/* Información básica del plan */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-[#2d3319] mb-2">Nombre del Plan *</label>
              <input
                type="text"
                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#959581] focus:ring-2 focus:ring-[#959581]/20 bg-white"
                placeholder="Ej: Rutina de Fuerza"
                value={formData.nombre}
                onChange={(e) => handleInputChange("nombre", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#2d3319] mb-2">Duración (minutos) *</label>
              <input
                type="number"
                min="15"
                max="180"
                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#959581] focus:ring-2 focus:ring-[#959581]/20 bg-white"
                placeholder="60"
                value={formData.duracion_minutos}
                onChange={(e) => handleInputChange("duracion_minutos", Number.parseInt(e.target.value))}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#2d3319] mb-2">Descripción *</label>
            <textarea
              className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#959581] focus:ring-2 focus:ring-[#959581]/20 bg-white"
              rows={3}
              placeholder="Describe el objetivo y características de tu plan"
              value={formData.descripcion}
              onChange={(e) => handleInputChange("descripcion", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#2d3319] mb-3">Nivel de Dificultad *</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { value: "principiante", label: "Principiante", desc: "Ideal para comenzar" },
                { value: "intermedio", label: "Intermedio", desc: "Con experiencia previa" },
                { value: "avanzado", label: "Avanzado", desc: "Nivel experto" },
              ].map((nivel) => (
                <label key={nivel.value} className="cursor-pointer">
                  <input
                    type="radio"
                    name="nivel_dificultad"
                    value={nivel.value}
                    checked={formData.nivel_dificultad === nivel.value}
                    onChange={(e) => handleInputChange("nivel_dificultad", e.target.value as any)}
                    className="sr-only"
                  />
                  <div
                    className={`p-4 border-2 rounded-xl text-center transition-all ${
                      formData.nivel_dificultad === nivel.value
                        ? "border-[#959581] bg-[#959581]/5"
                        : "border-gray-200 hover:border-[#aeb99d]"
                    }`}
                  >
                    <div className="font-semibold text-[#2d3319]">{nivel.label}</div>
                    <div className="text-sm text-[#bcc591]">{nivel.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Lista de ejercicios */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-semibold text-[#2d3319]">Ejercicios *</label>
              <button
                type="button"
                onClick={addExercise}
                className="flex items-center gap-2 px-4 py-2 bg-[#959581] text-white rounded-lg hover:bg-[#aeb99d] transition-colors"
              >
                <Plus size={16} />
                Agregar Ejercicio
              </button>
            </div>

            <div className="space-y-4">
              {formData.ejercicios.map((ejercicio, index) => (
                <ExerciseItem
                  key={index}
                  exercise={ejercicio}
                  index={index}
                  canRemove={formData.ejercicios.length > 1}
                  onChange={(field, value) => handleExerciseChange(index, field, value)}
                  onRemove={() => removeExercise(index)}
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
                ? "bg-gradient-to-r from-[#959581] to-[#aeb99d] text-white hover:shadow-lg hover:scale-105"
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
