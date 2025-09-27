"use client"
import type React from "react"
import { useState } from "react"
import {
  ArrowRight,
  CheckCircle,
  User,
  Activity,
  Target,
  Heart,
  Edit,
  Scale,
  Ruler,
  Calendar,
  Trophy,
  Clock,
  MapPin,
} from "lucide-react"

interface HealthQuestionnaireProps {
  onComplete: (healthData: any) => void
}

interface QuestionnaireData {
  edad: string
  sexo: string
  peso: string
  altura: string
  nivelActividad: string
  objetivo: string
  experiencia: string
  enfermedades: string[]
  limitaciones: string
  medicamentos: string
  lesiones: string
  disponibilidadTiempo: string
  lugarEntrenamiento: string
}

const HealthQuestionnaire: React.FC<HealthQuestionnaireProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0) // 0 = pantalla de introducción
  const [showProfile, setShowProfile] = useState(false) // Added state to show profile view
  const [formData, setFormData] = useState<QuestionnaireData>({
    edad: "",
    sexo: "",
    peso: "",
    altura: "",
    nivelActividad: "",
    objetivo: "",
    experiencia: "",
    enfermedades: [],
    limitaciones: "",
    medicamentos: "",
    lesiones: "",
    disponibilidadTiempo: "",
    lugarEntrenamiento: "",
  })

  const totalSteps = 4

  const handleInputChange = (field: keyof QuestionnaireData, value: string | string[]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleEnfermedadChange = (enfermedad: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      enfermedades: checked ? [...prev.enfermedades, enfermedad] : prev.enfermedades.filter((e) => e !== enfermedad),
    }))
  }

  const nextStep = () => {
    if (currentStep <= totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    console.log("Health data saved:", formData)
    setShowProfile(true) // Show profile view instead of just logging
    // Optionally, you can call onComplete(formData) here if it's needed for other purposes (e.g., saving to a backend)
    // onComplete(formData)
  }

  const calculateBMI = () => {
    const weight = Number.parseFloat(formData.peso)
    const heightInMeters = Number.parseFloat(formData.altura) / 100
    if (weight && heightInMeters) {
      return (weight / (heightInMeters * heightInMeters)).toFixed(1)
    }
    return null
  }

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: "Bajo peso", color: "text-blue-600" }
    if (bmi < 25) return { category: "Peso normal", color: "text-green-600" }
    if (bmi < 30) return { category: "Sobrepeso", color: "text-yellow-600" }
    return { category: "Obesidad", color: "text-red-600" }
  }

  const getActivityLevelText = (level: string) => {
    const levels: { [key: string]: string } = {
      sedentario: "Sedentario",
      ligero: "Ligero",
      moderado: "Moderado",
      activo: "Muy activo",
    }
    return levels[level] || level
  }

  const getObjectiveText = (objective: string) => {
    const objectives: { [key: string]: string } = {
      "perder-peso": "Perder peso",
      "ganar-musculo": "Ganar músculo",
      mantenerse: "Mantenerme en forma",
      resistencia: "Mejorar resistencia",
      fuerza: "Aumentar fuerza",
      "salud-general": "Salud general",
    }
    return objectives[objective] || objective
  }

  const renderProfile = () => {
    const bmi = calculateBMI()
    const bmiData = bmi ? getBMICategory(Number.parseFloat(bmi)) : null

    return (
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-gradient-to-br from-[#959581] to-[#aeb99d] rounded-full flex items-center justify-center mx-auto">
            <User className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-[#2d3319]">Mi Perfil de Salud</h1>
          <p className="text-[#bcc591] max-w-2xl mx-auto">
            Aquí tienes un resumen de tu información de salud y fitness registrada
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Información Básica */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#959581] to-[#aeb99d] rounded-lg flex items-center justify-center">
                <User className="text-white" size={20} />
              </div>
              <h3 className="text-xl font-semibold text-[#2d3319]">Información Básica</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="text-[#bcc591]" size={16} />
                <span className="text-[#2d3319]">{formData.edad} años</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="text-[#bcc591]" size={16} />
                <span className="text-[#2d3319] capitalize">{formData.sexo}</span>
              </div>
            </div>
          </div>

          {/* Medidas Corporales */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#aeb99d] to-[#c4c9b5] rounded-lg flex items-center justify-center">
                <Scale className="text-white" size={20} />
              </div>
              <h3 className="text-xl font-semibold text-[#2d3319]">Medidas</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Scale className="text-[#bcc591]" size={16} />
                <span className="text-[#2d3319]">{formData.peso} kg</span>
              </div>
              <div className="flex items-center gap-2">
                <Ruler className="text-[#bcc591]" size={16} />
                <span className="text-[#2d3319]">{formData.altura} cm</span>
              </div>
              {bmi && (
                <div className="mt-4 p-3 bg-[#f5f5f0] rounded-lg">
                  <div className="text-sm font-semibold text-[#2d3319]">IMC: {bmi}</div>
                  {bmiData && <div className={`text-sm ${bmiData.color} font-medium`}>{bmiData.category}</div>}
                </div>
              )}
            </div>
          </div>

          {/* Objetivo Principal */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#c4c9b5] to-[#bcc591] rounded-lg flex items-center justify-center">
                <Target className="text-white" size={20} />
              </div>
              <h3 className="text-xl font-semibold text-[#2d3319]">Objetivo</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Trophy className="text-[#bcc591]" size={16} />
                <span className="text-[#2d3319]">{getObjectiveText(formData.objetivo)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="text-[#bcc591]" size={16} />
                <span className="text-[#2d3319] capitalize">{formData.experiencia}</span>
              </div>
            </div>
          </div>

          {/* Nivel de Actividad */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#bcc591] to-[#959581] rounded-lg flex items-center justify-center">
                <Activity className="text-white" size={20} />
              </div>
              <h3 className="text-xl font-semibold text-[#2d3319]">Actividad</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Activity className="text-[#bcc591]" size={16} />
                <span className="text-[#2d3319]">{getActivityLevelText(formData.nivelActividad)}</span>
              </div>
            </div>
          </div>

          {/* Preferencias de Entrenamiento */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#959581] to-[#aeb99d] rounded-lg flex items-center justify-center">
                <Clock className="text-white" size={20} />
              </div>
              <h3 className="text-xl font-semibold text-[#2d3319]">Entrenamiento</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Clock className="text-[#bcc591]" size={16} />
                <span className="text-[#2d3319]">{formData.disponibilidadTiempo}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="text-[#bcc591]" size={16} />
                <span className="text-[#2d3319] capitalize">{formData.lugarEntrenamiento}</span>
              </div>
            </div>
          </div>

          {/* Información de Salud */}
          {(formData.enfermedades.length > 0 ||
            formData.limitaciones ||
            formData.medicamentos ||
            formData.lesiones) && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#aeb99d] to-[#c4c9b5] rounded-lg flex items-center justify-center">
                  <Heart className="text-white" size={20} />
                </div>
                <h3 className="text-xl font-semibold text-[#2d3319]">Salud</h3>
              </div>
              <div className="space-y-2 text-sm">
                {formData.enfermedades.length > 0 && (
                  <div>
                    <span className="font-medium text-[#2d3319]">Condiciones: </span>
                    <span className="text-[#bcc591]">{formData.enfermedades.join(", ")}</span>
                  </div>
                )}
                {formData.limitaciones && (
                  <div>
                    <span className="font-medium text-[#2d3319]">Limitaciones: </span>
                    <span className="text-[#bcc591]">{formData.limitaciones}</span>
                  </div>
                )}
                {formData.medicamentos && (
                  <div>
                    <span className="font-medium text-[#2d3319]">Medicamentos: </span>
                    <span className="text-[#bcc591]">{formData.medicamentos}</span>
                  </div>
                )}
                {formData.lesiones && (
                  <div>
                    <span className="font-medium text-[#2d3319]">Lesiones: </span>
                    <span className="text-[#bcc591]">{formData.lesiones}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="text-center">
          <button
            onClick={() => {
              setShowProfile(false)
              setCurrentStep(0)
            }}
            className="flex items-center gap-2 mx-auto px-6 py-3 bg-gradient-to-r from-[#959581] to-[#aeb99d] text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
          >
            <Edit size={20} />
            Editar Información
          </button>
        </div>
      </div>
    )
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.edad && formData.sexo && formData.peso && formData.altura
      case 2:
        return formData.nivelActividad && formData.objetivo && formData.experiencia
      case 3:
        return true // opcional
      case 4:
        return formData.disponibilidadTiempo && formData.lugarEntrenamiento
      default:
        return true
    }
  }

  if (showProfile) {
    return renderProfile()
  }

  const renderStep = () => {
    if (currentStep === 0) {
      return (
        <div className="text-center space-y-6">
          <h1 className="text-3xl font-bold text-[#2d3319]">Registro de Datos de Salud</h1>
          <p className="text-[#bcc591] max-w-2xl mx-auto">
            Antes de comenzar, necesitamos que registres tu información básica de salud, actividad y preferencias de
            entrenamiento. Esto nos permitirá guardar tus datos y utilizarlos más adelante en la plataforma.
          </p>
          <button
            onClick={nextStep}
            className="bg-gradient-to-r from-[#959581] to-[#aeb99d] text-white px-10 py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
          >
            Comenzar
          </button>
        </div>
      )
    }

    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-[#959581] to-[#aeb99d] rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="text-white" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-[#2d3319] mb-2">Información Básica</h2>
              <p className="text-[#bcc591]">Cuéntanos un poco sobre ti</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-[#2d3319] mb-2">Edad *</label>
                <input
                  type="number"
                  min="16"
                  max="100"
                  className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#959581] focus:ring-2 focus:ring-[#959581]/20 bg-white"
                  placeholder="Ej: 25"
                  value={formData.edad}
                  onChange={(e) => handleInputChange("edad", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#2d3319] mb-2">Sexo *</label>
                <select
                  className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#959581] focus:ring-2 focus:ring-[#959581]/20 bg-white"
                  value={formData.sexo}
                  onChange={(e) => handleInputChange("sexo", e.target.value)}
                >
                  <option value="">Selecciona una opción</option>
                  <option value="masculino">Masculino</option>
                  <option value="femenino">Femenino</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#2d3319] mb-2">Peso (kg) *</label>
                <input
                  type="number"
                  min="30"
                  max="300"
                  step="0.1"
                  className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#959581] focus:ring-2 focus:ring-[#959581]/20 bg-white"
                  placeholder="Ej: 70.5"
                  value={formData.peso}
                  onChange={(e) => handleInputChange("peso", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#2d3319] mb-2">Altura (cm) *</label>
                <input
                  type="number"
                  min="120"
                  max="250"
                  className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#959581] focus:ring-2 focus:ring-[#959581]/20 bg-white"
                  placeholder="Ej: 175"
                  value={formData.altura}
                  onChange={(e) => handleInputChange("altura", e.target.value)}
                />
              </div>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-[#aeb99d] to-[#c4c9b5] rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="text-white" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-[#2d3319] mb-2">Actividad y Objetivos</h2>
              <p className="text-[#bcc591]">Ayúdanos a entender tu estilo de vida</p>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[#2d3319] mb-3">Nivel de actividad actual *</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { value: "sedentario", label: "Sedentario", desc: "Poco o nada de ejercicio" },
                    { value: "ligero", label: "Ligero", desc: "Ejercicio ligero 1-3 días/semana" },
                    { value: "moderado", label: "Moderado", desc: "Ejercicio moderado 3-5 días/semana" },
                    { value: "activo", label: "Muy activo", desc: "Ejercicio intenso 6-7 días/semana" },
                  ].map((option) => (
                    <label key={option.value} className="cursor-pointer">
                      <input
                        type="radio"
                        name="nivelActividad"
                        value={option.value}
                        checked={formData.nivelActividad === option.value}
                        onChange={(e) => handleInputChange("nivelActividad", e.target.value)}
                        className="sr-only"
                      />
                      <div
                        className={`p-4 border-2 rounded-xl transition-all ${
                          formData.nivelActividad === option.value
                            ? "border-[#959581] bg-[#959581]/5"
                            : "border-gray-200 hover:border-[#aeb99d]"
                        }`}
                      >
                        <div className="font-semibold text-[#2d3319]">{option.label}</div>
                        <div className="text-sm text-[#bcc591]">{option.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#2d3319] mb-3">Objetivo principal *</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { value: "perder-peso", label: "Perder peso" },
                    { value: "ganar-musculo", label: "Ganar músculo" },
                    { value: "mantenerse", label: "Mantenerme en forma" },
                    { value: "resistencia", label: "Mejorar resistencia" },
                    { value: "fuerza", label: "Aumentar fuerza" },
                    { value: "salud-general", label: "Salud general" },
                  ].map((option) => (
                    <label key={option.value} className="cursor-pointer">
                      <input
                        type="radio"
                        name="objetivo"
                        value={option.value}
                        checked={formData.objetivo === option.value}
                        onChange={(e) => handleInputChange("objetivo", e.target.value)}
                        className="sr-only"
                      />
                      <div
                        className={`p-4 border-2 rounded-xl text-center transition-all ${
                          formData.objetivo === option.value
                            ? "border-[#959581] bg-[#959581]/5"
                            : "border-gray-200 hover:border-[#aeb99d]"
                        }`}
                      >
                        <div className="font-semibold text-[#2d3319]">{option.label}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#2d3319] mb-3">Experiencia con ejercicio *</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { value: "principiante", label: "Principiante", desc: "Menos de 6 meses" },
                    { value: "intermedio", label: "Intermedio", desc: "6 meses - 2 años" },
                    { value: "avanzado", label: "Avanzado", desc: "Más de 2 años" },
                  ].map((option) => (
                    <label key={option.value} className="cursor-pointer">
                      <input
                        type="radio"
                        name="experiencia"
                        value={option.value}
                        checked={formData.experiencia === option.value}
                        onChange={(e) => handleInputChange("experiencia", e.target.value)}
                        className="sr-only"
                      />
                      <div
                        className={`p-4 border-2 rounded-xl text-center transition-all ${
                          formData.experiencia === option.value
                            ? "border-[#959581] bg-[#959581]/5"
                            : "border-gray-200 hover:border-[#aeb99d]"
                        }`}
                      >
                        <div className="font-semibold text-[#2d3319]">{option.label}</div>
                        <div className="text-sm text-[#bcc591]">{option.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-[#c4c9b5] to-[#bcc591] rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-white" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-[#2d3319] mb-2">Información de Salud</h2>
              <p className="text-[#bcc591]">Opcionalmente puedes completar datos de salud</p>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[#2d3319] mb-3">
                  ¿Tienes alguna de estas condiciones? (Opcional)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "Hipertensión",
                    "Diabetes",
                    "Problemas cardíacos",
                    "Problemas respiratorios",
                    "Problemas de espalda",
                    "Artritis o problemas articulares",
                    "Osteoporosis",
                    "Ninguna de las anteriores",
                  ].map((enfermedad) => (
                    <label key={enfermedad} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.enfermedades.includes(enfermedad)}
                        onChange={(e) => handleEnfermedadChange(enfermedad, e.target.checked)}
                        className="w-5 h-5 text-[#959581] border-gray-200 rounded focus:ring-[#959581]"
                      />
                      <span className="text-[#2d3319]">{enfermedad}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#2d3319] mb-2">
                  Limitaciones físicas o lesiones
                </label>
                <textarea
                  className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#959581] focus:ring-2 focus:ring-[#959581]/20 bg-white"
                  rows={3}
                  placeholder="Describe cualquier limitación o lesión que debamos considerar (opcional)"
                  value={formData.limitaciones}
                  onChange={(e) => handleInputChange("limitaciones", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#2d3319] mb-2">Medicamentos</label>
                <input
                  type="text"
                  className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#959581] focus:ring-2 focus:ring-[#959581]/20 bg-white"
                  placeholder="Lista los medicamentos o escribe 'Ninguno' (opcional)"
                  value={formData.medicamentos}
                  onChange={(e) => handleInputChange("medicamentos", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#2d3319] mb-2">Lesiones deportivas previas</label>
                <textarea
                  className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#959581] focus:ring-2 focus:ring-[#959581]/20 bg-white"
                  rows={3}
                  placeholder="Describe lesiones previas que puedan afectar tu entrenamiento (opcional)"
                  value={formData.lesiones}
                  onChange={(e) => handleInputChange("lesiones", e.target.value)}
                />
              </div>
            </div>
          </div>
        )
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-[#bcc591] to-[#959581] rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="text-white" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-[#2d3319] mb-2">Preferencias de Entrenamiento</h2>
              <p className="text-[#bcc591]">Últimos detalles para registrar tus datos</p>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[#2d3319] mb-3">Tiempo disponible *</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { value: "15-30min", label: "15-30 minutos" },
                    { value: "30-45min", label: "30-45 minutos" },
                    { value: "45-60min", label: "45-60 minutos" },
                    { value: "60+min", label: "Más de 60 minutos" },
                  ].map((option) => (
                    <label key={option.value} className="cursor-pointer">
                      <input
                        type="radio"
                        name="disponibilidadTiempo"
                        value={option.value}
                        checked={formData.disponibilidadTiempo === option.value}
                        onChange={(e) => handleInputChange("disponibilidadTiempo", e.target.value)}
                        className="sr-only"
                      />
                      <div
                        className={`p-4 border-2 rounded-xl transition-all ${
                          formData.disponibilidadTiempo === option.value
                            ? "border-[#959581] bg-[#959581]/5"
                            : "border-gray-200 hover:border-[#aeb99d]"
                        }`}
                      >
                        <div className="font-semibold text-[#2d3319]">{option.label}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#2d3319] mb-3">Lugar preferido *</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { value: "casa", label: "En casa" },
                    { value: "gimnasio", label: "Gimnasio" },
                    { value: "mixto", label: "Ambos" },
                  ].map((option) => (
                    <label key={option.value} className="cursor-pointer">
                      <input
                        type="radio"
                        name="lugarEntrenamiento"
                        value={option.value}
                        checked={formData.lugarEntrenamiento === option.value}
                        onChange={(e) => handleInputChange("lugarEntrenamiento", e.target.value)}
                        className="sr-only"
                      />
                      <div
                        className={`p-4 border-2 rounded-xl text-center transition-all ${
                          formData.lugarEntrenamiento === option.value
                            ? "border-[#959581] bg-[#959581]/5"
                            : "border-gray-200 hover:border-[#aeb99d]"
                        }`}
                      >
                        <div className="font-semibold text-[#2d3319]">{option.label}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                <CheckCircle className="text-green-600 mx-auto mb-3" size={32} />
                <h3 className="font-semibold text-green-800 mb-2">¡Listo!</h3>
                <p className="text-green-700 text-sm">
                  Con estos datos, podremos guardarlos de forma segura para tu perfil.
                </p>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {currentStep > 0 && (
        <div className="mb-8">
          <div className="text-sm text-[#bcc591] mb-2">
            Paso {currentStep} de {totalSteps}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-[#959581] to-[#aeb99d] h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        {renderStep()}

        {currentStep > 0 && (
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                currentStep === 1 ? "text-gray-400 cursor-not-allowed" : "text-[#2d3319] hover:bg-gray-50"
              }`}
            >
              Anterior
            </button>

            {currentStep === totalSteps ? (
              <button
                onClick={handleSubmit}
                disabled={!isStepValid()}
                className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all ${
                  isStepValid()
                    ? "bg-gradient-to-r from-[#959581] to-[#aeb99d] text-white hover:shadow-lg hover:scale-105"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                <CheckCircle size={20} />
                Guardar Datos
              </button>
            ) : (
              <button
                onClick={nextStep}
                disabled={!isStepValid()}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  isStepValid()
                    ? "bg-gradient-to-r from-[#959581] to-[#aeb99d] text-white hover:shadow-lg hover:scale-105"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Siguiente
                <ArrowRight size={20} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default HealthQuestionnaire
