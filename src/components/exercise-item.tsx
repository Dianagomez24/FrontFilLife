"use client"

import { Trash2 } from "lucide-react"
import type { Exercise } from "../types/exercise-plan"

interface ExerciseItemProps {
  exercise: Exercise
  index: number
  canRemove: boolean
  onChange: (field: keyof Exercise, value: any) => void
  onRemove: () => void
}

export function ExerciseItem({ exercise, index, canRemove, onChange, onRemove }: ExerciseItemProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-[#2d3319]">Ejercicio {index + 1}</h4>
        {canRemove && (
          <button type="button" onClick={onRemove} className="text-red-500 hover:text-red-700 transition-colors">
            <Trash2 size={16} />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-medium text-[#2d3319] mb-1">Nombre *</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#959581] bg-white"
            placeholder="Ej: Sentadillas"
            value={exercise.nombre}
            onChange={(e) => onChange("nombre", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#2d3319] mb-1">Series *</label>
          <input
            type="number"
            min="1"
            max="10"
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#959581] bg-white"
            placeholder="3"
            value={exercise.series}
            onChange={(e) => onChange("series", Number.parseInt(e.target.value))}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#2d3319] mb-1">Repeticiones *</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#959581] bg-white"
            placeholder="8-12"
            value={exercise.repeticiones}
            onChange={(e) => onChange("repeticiones", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#2d3319] mb-1">Descanso *</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#959581] bg-white"
            placeholder="60s"
            value={exercise.descanso}
            onChange={(e) => onChange("descanso", e.target.value)}
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-xs font-medium text-[#2d3319] mb-1">Notas (opcional)</label>
        <input
          type="text"
          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#959581] bg-white"
          placeholder="Técnica, consejos, etc."
          value={exercise.notas || ""}
          onChange={(e) => onChange("notas", e.target.value)}
        />
      </div>
    </div>
  )
}
