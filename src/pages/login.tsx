"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react"
import { login, resendVerification } from "../service/auth"
import type { LoginDto } from "../types/authTypes"

interface LoginProps {
  onSwitchToRegister: () => void
  onLoginSuccess?: (userData: any) => void
}

const Login: React.FC<LoginProps> = ({ onSwitchToRegister, onLoginSuccess }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [needsVerification, setNeedsVerification] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [isLocked, setIsLocked] = useState(false)
  const [lockTime, setLockTime] = useState(0)

  useEffect(() => {
    if (isLocked && lockTime > 0) {
      const timer = setTimeout(() => {
        setLockTime(lockTime - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (isLocked && lockTime === 0) {
      setIsLocked(false)
      setAttempts(0)
    }
  }, [isLocked, lockTime])

  useEffect(() => {
    if (error) {
      setError("")
    }
  }, [email, password])

  const validateForm = () => {
    if (!email || !password) {
      setError("Por favor completa todos los campos")
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Por favor ingresa un email válido")
      return false
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isLocked) {
      setError(`Demasiados intentos. Espera ${lockTime} segundos`)
      return
    }

    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const loginData: LoginDto = { email, password }
      const response = await login(loginData)

      if (response.access_token) {
        localStorage.setItem("token", response.access_token)
        setAttempts(0)
        setIsLocked(false)
      }

      onLoginSuccess?.(response.user)
    } catch (err: any) {
      console.log("Login error details:", err.response?.data)

      const newAttempts = attempts + 1
      setAttempts(newAttempts)

      if (newAttempts >= 5) {
        setIsLocked(true)
        setLockTime(300)
        setError("Demasiados intentos fallidos. Cuenta bloqueada por 5 minutos.")
      } else if (err.response?.status === 401) {
        const errorMessage = err.response?.data?.message || ""
        if (errorMessage.includes("verificar") || errorMessage.includes("verify")) {
          setError("Debes verificar tu email antes de iniciar sesión")
          setNeedsVerification(true)
        } else {
          setError(`Email o contraseña incorrectos. Intentos restantes: ${5 - newAttempts}`)
        }
      } else if (err.response?.status === 403) {
        setError("Debes verificar tu email antes de iniciar sesión")
        setNeedsVerification(true)
      } else if (err.response?.status === 429) {
        setError("Demasiados intentos. Por favor espera antes de intentar nuevamente.")
      } else {
        setError("Error al iniciar sesión. Intenta de nuevo.")
      }
      console.error("Login error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendVerification = async () => {
    if (!email) {
      setError("Por favor ingresa tu email primero")
      return
    }

    setIsResending(true)
    try {
      await resendVerification({ email })
      setError("")
      alert("Email de verificación reenviado. Revisa tu bandeja de entrada.")
    } catch (err: any) {
      console.error("Resend verification error:", err)
      setError("Error al reenviar el email de verificación")
    } finally {
      setIsResending(false)
    }
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

  const WellnessIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path
        fill="#fff"
        d="m12.1 18.55l-.1.1l-.11-.1C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5c1.54 0 3.04 1 3.57 2.36h1.86C13.46 6 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5c0 2.89-3.14 5.74-7.9 10.05M16.5 3c-1.74 0-3.41.81-4.5 2.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5c0 3.77 3.4 6.86 8.55 11.53L12 21.35l1.45-1.32C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3"
        strokeWidth="0.5"
        stroke="#fff"
      />
    </svg>
  )

  const EnergyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 1024 1024">
      <path
        fill="#fff"
        d="M595.344 64.72h.176zm0 0l-72.207 379.377l261.584.88L428.657 959.28l72.208-417.376l-261.568-.912zm.049-63.999c-1.728 0-3.455.063-5.151.19c-11.296.913-18.785 4.689-27.664 10.657a64.3 64.3 0 0 0-13.392 11.936a57 57 0 0 0-3.297 4.288L187.281 502.4c-14.16 19.408-16.24 45.025-5.36 66.433c10.864 21.408 32.832 34.976 56.912 35.152l184.736 1.344l-58.08 342.192c-5.52 29.408 10.16 58.72 37.76 70.528a64.2 64.2 0 0 0 25.391 5.216c20.112 0 36.64-9.408 49.041-26.4L836.737 482.56c14.16-19.409 16.225-45.057 5.36-66.433c-10.864-21.408-32.832-34.977-56.912-35.152l-184.736-.32l57.456-300.88a62.5 62.5 0 0 0 1.825-15.056c0-34.624-27.569-62.848-62.065-63.968c-.767-.032-1.52-.032-2.271-.032z"
        strokeWidth="25.5"
        stroke="#fff"
      />
    </svg>
  )

  const StrengthIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path
        fill="#fff"
        d="m19.4 9.375l-.688-.688l.48-.506q.193-.192.193-.433q0-.24-.193-.433l-2.508-2.507q-.192-.192-.432-.192t-.433.192l-.506.48l-.713-.713l.558-.583q.44-.44 1.079-.427t1.079.452l2.667 2.668q.44.44.44 1.066t-.44 1.066zM8.842 19.958q-.44.44-1.066.44t-1.066-.44l-2.59-2.59q-.46-.46-.46-1.144t.46-1.143l.48-.481l.714.714l-.487.48q-.192.193-.192.433t.192.433l2.514 2.513q.192.193.432.193t.433-.193l.48-.486l.714.713zm9.733-6.804l1.137-1.137q.192-.192.192-.442t-.192-.442l-6.845-6.844q-.192-.193-.442-.193t-.442.192l-1.137 1.137q-.192.192-.192.433q0 .24.192.433l6.864 6.863q.192.192.432.192t.433-.192m-6.558 6.558l1.137-1.143q.192-.192.192-.432t-.192-.433l-6.858-6.858q-.192-.192-.433-.192q-.24 0-.432.192l-1.143 1.137q-.192.192-.192.442t.192.442l6.845 6.844q.192.193.442.193t.442-.192m-.708-5.273l3.135-3.13l-1.754-1.753l-3.129 3.135zm1.402 5.98q-.459.46-1.136.46t-1.137-.46l-6.857-6.857q-.46-.46-.46-1.137t.46-1.136l1.136-1.156q.46-.46 1.144-.46t1.143.46l1.844 1.844l3.135-3.135l-1.844-1.838q-.46-.46-.46-1.146t.46-1.146l1.155-1.156q.46-.46 1.143-.46t1.144.46l6.863 6.863q.46.46.46 1.144t-.46 1.143l-1.155 1.156q-.46.46-1.147.46t-1.146-.46l-1.838-1.845l-3.135 3.135l1.844 1.844q.46.46.46 1.144t-.46 1.143z"
        strokeWidth="0.5"
        stroke="#fff"
      />
    </svg>
  )

  return (
    <div className="auth-container">
      <div className="info-section">
        <div className="logo-container" style={{ justifyContent: "flex-end", marginBottom: "32px" }}>
          <div className="logo-icon" style={{ marginLeft: "auto" }}>
            <FitLifeIcon />
          </div>
          <div className="logo-text" style={{ textAlign: "right" }}>
            <h1 className="logo-title">FitLife</h1>
            <p className="logo-subtitle">Tu transformación comienza aquí</p>
          </div>
        </div>
        <h1 className="info-title">Bienvenido de vuelta</h1>
        <p className="info-description">
          Continúa tu viaje hacia una vida más saludable. Tu progreso y metas te están esperando.
        </p>
        <div className="features-list">
          <div className="feature-item">
            <div className="feature-icon">
              <WellnessIcon />
            </div>
            <div className="feature-content">
              <h3 className="feature-title">Bienestar Integral</h3>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">
              <EnergyIcon />
            </div>
            <div className="feature-content">
              <h3 className="feature-title">Energía Natural</h3>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">
              <StrengthIcon />
            </div>
            <div className="feature-content">
              <h3 className="feature-title">Fuerza Constante</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="auth-card centered">
        <h2 className="auth-title">Iniciar Sesión</h2>
        <p className="auth-subtitle">Accede a tu cuenta</p>
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
              {needsVerification && (
                <div style={{ marginTop: "8px" }}>
                  <button
                    type="button"
                    onClick={handleResendVerification}
                    disabled={isResending}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#3b82f6",
                      textDecoration: "underline",
                      cursor: "pointer",
                      fontSize: "14px",
                      padding: "0",
                    }}
                  >
                    {isResending ? "Reenviando..." : "Reenviar email de verificación"}
                  </button>
                </div>
              )}
            </div>
          )}
          <div className="form-group">
            <label className="form-label">
              <Mail size={16} />
              Email
            </label>
            <input
              type="email"
              className="form-input"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading || isLocked}
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
                className="form-input"
                placeholder="········"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading || isLocked}
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
          </div>
          <button 
            type="submit" 
            className="submit-btn" 
            disabled={isLoading || isLocked}
          >
            {isLoading ? "Iniciando sesión..." : isLocked ? `Cuenta bloqueada (${lockTime}s)` : "Iniciar Sesión"} 
            <ArrowRight size={18} />
          </button>
        </form>
        <div className="forgot-password">
          <a href="#" className="forgot-link">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
        <div className="auth-footer">
          ¿No tienes cuenta?{" "}
          <span className="auth-link" onClick={onSwitchToRegister}>
            Regístrate
          </span>
        </div>
      </div>
    </div>
  )
}

export default Login