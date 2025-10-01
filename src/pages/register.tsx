"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { User, Mail, Lock, Sparkles, Eye, EyeOff, CheckCircle, XCircle } from "lucide-react"
import { register } from "../service/auth"
import type { RegisterDto } from "../types/authTypes"

interface RegisterProps {
  onSwitchToLogin: () => void
  onRegisterSuccess?: () => void
}

const Register: React.FC<RegisterProps> = ({ onSwitchToLogin, onRegisterSuccess }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  useEffect(() => {
    const calculateStrength = (password: string) => {
      let strength = 0
      if (password.length >= 6) strength += 1
      if (password.length >= 8) strength += 1
      if (/[A-Z]/.test(password)) strength += 1
      if (/[0-9]/.test(password)) strength += 1
      if (/[^A-Za-z0-9]/.test(password)) strength += 1
      return strength
    }
    setPasswordStrength(calculateStrength(formData.password))
  }, [formData.password])

  const validateForm = () => {
    if (!formData.nombre || !formData.apellidos || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Por favor completa todos los campos")
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError("Por favor ingresa un email válido")
      return false
    }

    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      return false
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden")
      return false
    }

    if (passwordStrength < 2) {
      setError("La contraseña es muy débil. Usa mayúsculas, números y caracteres especiales.")
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const registerData: RegisterDto = {
        nombre: formData.nombre.trim(),
        apellidos: formData.apellidos.trim(),
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
      }

      const response = await register(registerData)

      setSuccess(true)
      setTimeout(() => {
        onRegisterSuccess?.()
        onSwitchToLogin()
      }, 2000)
    } catch (err: any) {
      if (err.response?.status === 409) {
        setError("Este email ya está registrado")
      } else if (err.response?.data?.message) {
        setError(err.response.data.message)
      } else {
        setError("Error al crear la cuenta. Intenta de nuevo.")
      }
      console.error("Register error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    if (error) setError("")
  }

  const getPasswordStrengthText = () => {
    if (formData.password.length === 0) return ""
    if (passwordStrength <= 1) return "Muy débil"
    if (passwordStrength <= 2) return "Débil"
    if (passwordStrength <= 3) return "Media"
    if (passwordStrength <= 4) return "Fuerte"
    return "Muy fuerte"
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 1) return "#ef4444"
    if (passwordStrength <= 2) return "#f59e0b"
    if (passwordStrength <= 3) return "#10b981"
    return "#059669"
  }

  const FitLifeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path
        fill="#fff"
        d="m19.4 9.375l-.688-.688l.48-.506q.193-.192.193-.433q0-.24-.193-.433l-2.508-2.507q-.192-.192-.432-.192t-.433.192l-.506.48l-.713-.713l.558-.583q.44-.44 1.079-.427t1.079.452l2.667 2.668q.44.44.44 1.066t-.44 1.066zM8.842 19.958q-.44.44-1.066.44t-1.066-.44l-2.59-2.59q-.46-.46-.46-1.144t.46-1.143l.48-.481l.714.714l-.487.48q-.192.193-.192.433t.192.433l2.514 2.513q.192.193.432.193t.433-.193l.48-.486l.714.713zm9.733-6.804l1.137-1.137q.192-.192.192-.442t-.192-.442l-6.845-6.844q-.192-.193-.442-.193t-.442.192l-1.137 1.137q-.192.192-.192.433q0 .24.192.433l6.864 6.863q.192.192.432.192t.433-.192m-6.558 6.558l1.137-1.143q.192-.192.192-.432t-.192-.433l-6.858-6.858q-.192-.192-.433-.192q-.24 0-.432.192l-1.143 1.137q-.192.192-.192.442t.192.442l6.845 6.844q.192.193.442.193t.442-.192m-.708-5.273l3.135-3.13l-1.754-1.753l-3.129 3.135zm1.402 5.98q-.459.46-1.136.46t-1.137-.46l-6.857-6.857q-.46-.46-.46-1.137t.46-1.136l1.136-1.156q.46-.46 1.144-.46t1.143.46l1.844 1.844l3.135-3.135l-1.844-1.838q-.46-.46-.46-1.146t.46-1.146l1.155-1.156q.46-.46 1.143-.46t1.144.46l6.863 6.863q.46.46.46 1.144t-.46 1.143l-1.155 1.156q-.46.46-1.147.46t-1.146-.46l-1.838-1.845l-3.135 3.135l1.844 1.844q.46.46.46 1.144t-.46 1.143z"
        strokeWidth="0.5"
        stroke="#fff"
      />
    </svg>
  )

  const NotificationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <g fill="none" fillRule="evenodd">
        <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" />
        <path
          fill="#fff"
          d="M5 9a7 7 0 0 1 14 0v3.764l1.822 3.644A1.1 1.1 0 0 1 19.838 18h-3.964a4.002 4.002 0 0 1-7.748 0H4.162a1.1 1.1 0 0 1-.984-1.592L5 12.764zm5.268 9a2 2 0 0 0 3.464 0zM12 4a5 5 0 0 0-5 5v3.764a2 2 0 0 1-.211.894L5.619 16h12.763l-1.17-2.342a2 2 0 0 1-.212-.894V9a5 5 0 0 0-5-5"
          strokeWidth="0.5"
          stroke="#fff"
        />
      </g>
    </svg>
  )

  const ExercisePlanIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path
        fill="#fff"
        d="m19.4 9.375l-.688-.688l.48-.506q.193-.192.193-.433q0-.24-.193-.433l-2.508-2.507q-.192-.192-.432-.192t-.433.192l-.506.48l-.713-.713l.558-.583q.44-.44 1.079-.427t1.079.452l2.667 2.668q.44.44.44 1.066t-.44 1.066zM8.842 19.958q-.44.44-1.066.44t-1.066-.44l-2.59-2.59q-.46-.46-.46-1.144t.46-1.143l.48-.481l.714.714l-.487.48q-.192.193-.192.433t.192.433l2.514 2.513q.192.193.432.193t.433-.193l.48-.486l.714.713zm9.733-6.804l1.137-1.137q.192-.192.192-.442t-.192-.442l-6.845-6.844q-.192-.193-.442-.193t-.442.192l-1.137 1.137q-.192.192-.192.433q0 .24.192.433l6.864 6.863q.192.192.432.192t.433-.192m-6.558 6.558l1.137-1.143q.192-.192.192-.432t-.192-.433l-6.858-6.858q-.192-.192-.433-.192q-.24 0-.432.192l-1.143 1.137q-.192.192-.192.442t.192.442l6.845 6.844q.192.193.442.193t.442-.192m-.708-5.273l3.135-3.13l-1.754-1.753l-3.129 3.135zm1.402 5.98q-.459.46-1.136.46t-1.137-.46l-6.857-6.857q-.46-.46-.46-1.137t.46-1.136l1.136-1.156q.46-.46 1.144-.46t1.143.46l1.844 1.844l3.135-3.135l-1.844-1.838q-.46-.46-.46-1.146t.46-1.146l1.155-1.156q.46-.46 1.143-.46t1.144.46l6.863 6.863q.46.46.46 1.144t-.46 1.143l-1.155 1.156q-.46.46-1.147.46t-1.146-.46l-1.838-1.845l-3.135 3.135l1.844 1.844q.46.46.46 1.144t-.46 1.143z"
        strokeWidth="0.5"
        stroke="#fff"
      />
    </svg>
  )

  const NutritionIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path
        fill="#fff"
        d="M22 18a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4v-2h12zM4 3h10a2 2 0 0 1 2 2v9H8v5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m0 3v2h2V6zm10 2V6H8v2zM4 10v2h2v-2zm4 0v2h6v-2zm-4 4v2h2v-2z"
        strokeWidth="0.5"
        stroke="#fff"
      />
    </svg>
  )

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="logo-container">
          <div className="logo-icon">
            <FitLifeIcon />
          </div>
          <div className="logo-text">
            <h1 className="logo-title">FitLife</h1>
            <p className="logo-subtitle">Tu transformación comienza aquí</p>
          </div>
        </div>
        <h2 className="auth-title">Crear Cuenta</h2>
        <p className="auth-subtitle">Comienza tu viaje hacia una vida más saludable</p>

        {success && (
          <div
            style={{
              color: "#16a34a",
              backgroundColor: "#f0fdf4",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "16px",
              fontSize: "14px",
              border: "1px solid #bbf7d0",
              textAlign: "center",
            }}
          >
            ¡Cuenta creada exitosamente! Revisa tu email para verificar tu cuenta.
          </div>
        )}

        <form className="form" onSubmit={handleSubmit}>
          {error && (
            <div
              style={{
                color: "#ef4444",
                backgroundColor: "#fef2f2",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "16px",
                fontSize: "14px",
                border: "1px solid #fecaca",
              }}
            >
              {error}
            </div>
          )}

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                <User size={16} />
                Nombre
              </label>
              <input
                type="text"
                name="nombre"
                className="form-input"
                placeholder="Juan"
                value={formData.nombre}
                onChange={handleChange}
                required
                disabled={isLoading || success}
                maxLength={50}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Apellidos</label>
              <input
                type="text"
                name="apellidos"
                className="form-input"
                placeholder="Pérez"
                value={formData.apellidos}
                onChange={handleChange}
                required
                disabled={isLoading || success}
                maxLength={50}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">
              <Mail size={16} />
              Email
            </label>
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="juan@email.com"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isLoading || success}
            />
          </div>
          <div className="form-group">
            <label className="form-label">
              <Lock size={16} />
              Contraseña
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="form-input"
                placeholder="········"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={isLoading || success}
                style={{ paddingRight: '40px' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#bcc591'
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            
            {formData.password && (
              <div style={{ marginTop: '8px' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  fontSize: '12px',
                  color: getPasswordStrengthColor()
                }}>
                  <span>Fortaleza: {getPasswordStrengthText()}</span>
                  {passwordStrength >= 3 ? <CheckCircle size={12} /> : <XCircle size={12} />}
                </div>
                <div style={{
                  height: '4px',
                  background: '#e5e7eb',
                  borderRadius: '2px',
                  marginTop: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    width: `${(passwordStrength / 5) * 100}%`,
                    background: getPasswordStrengthColor(),
                    transition: 'all 0.3s ease'
                  }} />
                </div>
              </div>
            )}
          </div>
          <div className="form-group">
            <label className="form-label">Confirmar Contraseña</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                className="form-input"
                placeholder="········"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                disabled={isLoading || success}
                style={{ paddingRight: '40px' }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#bcc591'
                }}
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            
            {formData.confirmPassword && (
              <div style={{ 
                marginTop: '4px',
                fontSize: '12px',
                color: formData.password === formData.confirmPassword ? '#10b981' : '#ef4444',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                {formData.password === formData.confirmPassword ? 
                  <CheckCircle size={12} /> : <XCircle size={12} />
                }
                {formData.password === formData.confirmPassword ? 
                  "Las contraseñas coinciden" : "Las contraseñas no coinciden"
                }
              </div>
            )}
          </div>
          <button type="submit" className="submit-btn" disabled={isLoading || success}>
            {isLoading ? "Creando cuenta..." : success ? "¡Cuenta creada!" : "Crear Cuenta"} <Sparkles size={18} />
          </button>
        </form>
        <div className="auth-footer">
          ¿Ya tienes cuenta?{" "}
          <span className="auth-link" onClick={onSwitchToLogin}>
            Inicia sesión
          </span>
        </div>
      </div>
      <div className="info-section">
        <h1 className="info-title">Transforma tu vida naturalmente</h1>
        <p className="info-description">
          Únete a miles de personas que ya están alcanzando sus metas de fitness con nuestros planes personalizados y
          seguimiento inteligente.
        </p>
        <div className="features-list">
          <div className="feature-item">
            <div className="feature-icon">
              <ExercisePlanIcon />
            </div>
            <div className="feature-content">
              <h3 className="feature-title">Planes de ejercicio personalizados</h3>
              <p className="feature-description">Crea y sigue rutinas adaptadas a tu nivel y objetivos.</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">
              <NutritionIcon />
            </div>
            <div className="feature-content">
              <h3 className="feature-title">Planes de nutrición</h3>
              <p className="feature-description">Diseña menús equilibrados que complementen tu entrenamiento.</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">
              <NotificationIcon />
            </div>
            <div className="feature-content">
              <h3 className="feature-title">Notificaciones inteligentes</h3>
              <p className="feature-description">
                Recibe recordatorios de tus entrenamientos, comidas y metas diarias.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register