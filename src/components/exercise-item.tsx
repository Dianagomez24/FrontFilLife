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
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-[#2d3319]">Ejercicio {index + 1}</h4>
        {canRemove && (
          <button 
            type="button" 
            onClick={onRemove} 
            className="btn btn-danger btn-sm"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="form-group">
          <label className="form-label">Nombre *</label>
          <input
            type="text"
            className="form-input"
            placeholder="Ej: Sentadillas"
            value={exercise.nombre}
            onChange={(e) => onChange("nombre", e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Series</label>
          <input
            type="number"
            min="1"
            max="10"
            className="form-input"
            placeholder="3"
            value={exercise.series || ''}
            onChange={(e) => onChange("series", e.target.value ? Number.parseInt(e.target.value) : undefined)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Repeticiones</label>
          <input
            type="number"
            min="1"
            className="form-input"
            placeholder="8"
            value={exercise.repeticiones || ''}
            onChange={(e) => onChange("repeticiones", e.target.value ? Number.parseInt(e.target.value) : undefined)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Descanso (segundos)</label>
          <input
            type="number"
            min="0"
            className="form-input"
            placeholder="60"
            value={exercise.descanso || ''}
            onChange={(e) => onChange("descanso", e.target.value ? Number.parseInt(e.target.value) : undefined)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="form-group">
          <label className="form-label">Peso (kg)</label>
          <input
            type="number"
            min="0"
            step="0.5"
            className="form-input"
            placeholder="0"
            value={exercise.peso || ''}
            onChange={(e) => onChange("peso", e.target.value ? Number.parseFloat(e.target.value) : undefined)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Duración (segundos)</label>
          <input
            type="number"
            min="0"
            className="form-input"
            placeholder="0"
            value={exercise.duracion || ''}
            onChange={(e) => onChange("duracion", e.target.value ? Number.parseInt(e.target.value) : undefined)}
          />
        </div>
      </div>

      <div className="form-group mt-4">
        <label className="form-label">Notas (opcional)</label>
        <input
          type="text"
          className="form-input"
          placeholder="Técnica, consejos, etc."
          value={exercise.notas || ""}
          onChange={(e) => onChange("notas", e.target.value)}
        />
      </div>
    </div>
  )
}