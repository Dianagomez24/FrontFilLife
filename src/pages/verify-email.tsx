"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Mail, CheckCircle, XCircle, ArrowRight, RotateCcw } from "lucide-react"
import { verifyEmail, resendVerification } from "../service/auth"
import type { VerifyEmailDto, ResendVerificationDto } from "../types/authTypes"

interface VerifyEmailProps {
  onSwitchToLogin: () => void
  email?: string 
}

const VerifyEmail: React.FC<VerifyEmailProps> = ({ onSwitchToLogin, email }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)

  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const [resendSuccess, setResendSuccess] = useState(false)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get("token")

    if (token) {
      handleVerifyEmail(token)
    }
  }, [])

  const handleVerifyEmail = async (token: string) => {
    setIsLoading(true)
    setError("")

    try {
      const verifyData: VerifyEmailDto = { token }
      await verifyEmail(verifyData)
      setSuccess(true)

      setTimeout(() => {
        onSwitchToLogin()
      }, 3000)
    } catch (err: any) {
      if (err.response?.status === 400) {

        setError("Token de verificación inválido o expirado")
      } else if (err.response?.status === 404) {
        setError("Token no encontrado")

      } else {
        setError("Error al verificar el email. Intenta de nuevo.")
      }
      console.error("Verify email error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendVerification = async () => {
    if (!email) {
      setError("Email no disponible para reenvío")
      return
    }

    setIsResending(true)
    setError("")
    setResendSuccess(false)

    try {
      const resendData: ResendVerificationDto = { email }
      await resendVerification(resendData)


      setResendSuccess(true)

      setTimeout(() => {
        setResendSuccess(false)
      }, 5000)
    } catch (err: any) {
      if (err.response?.status === 404) {
        setError("Usuario no encontrado")
      } else if (err.response?.status === 400) {
        setError("El email ya está verificado")


      } else 
        
        {

        setError("Error al reenviar verificación. Intenta de nuevo.")
      }
      console.error("Resend verification error:", err)
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
        <h1 className="info-title">Verificación de Email</h1>
        <p className="info-description">
          Estamos verificando tu dirección de email para completar el registro de tu cuenta.
        </p>
      </div>

      <div className="auth-card centered">
        {success ? (


          <div style={{ textAlign: "center" }}>
            <div
              style={{
                color: "#16a34a",
                fontSize: "48px",

                marginBottom: "16px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CheckCircle size={48} />
            </div>
            <h2 className="auth-title" style={{ color: "#16a34a" }}>
              ¡Email Verificado!
            </h2>
            <p className="auth-subtitle">
              Tu cuenta ha sido verificada exitosamente. Serás redirigido al login en unos segundos.
            </p>
            <button className="submit-btn" onClick={onSwitchToLogin} style={{ marginTop: "20px" }}>
              Ir al Login <ArrowRight size={18} />
            </button>
          </div>
        ) : isLoading ? (


          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: "48px",
                marginBottom: "16px",

                display: "flex",
                justifyContent: "center",
                color: "#6b7280",
              }}
            >
              <Mail size={48} />
            </div>
            <h2 className="auth-title">Verificando...</h2>
            <p className="auth-subtitle">Estamos verificando tu email, por favor espera.</p>
          </div>
        ) : error ? (


          <div style={{ textAlign: "center" }}>
            <div
              style={{
                color: "#ef4444",
                fontSize: "48px",

                marginBottom: "16px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <XCircle size={48} />
            </div>
            <h2 className="auth-title" style={{ color: "#ef4444" }}>
              Error de Verificación
            </h2>
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

            {email && (
              <div>
                {resendSuccess && (
                  <div
                    style={{
                      color: "#16a34a",
                      backgroundColor: "#f0fdf4",
                      padding: "12px",

                      borderRadius: "8px",
                      marginBottom: "16px",
                      fontSize: "14px",
                      border: "1px solid #bbf7d0",
                    }}
                  >
                    Email de verificación reenviado exitosamente
                  </div>
                )}

                <button
                  className="submit-btn"
                  onClick={handleResendVerification}
                  disabled={isResending}
                  style={{ marginBottom: "12px" }}
                >
                  {isResending ? "Reenviando..." : "Reenviar Verificación"} <RotateCcw size={18} />
                </button>
              </div>
            )}

            <div className="auth-footer">
              <span className="auth-link" onClick={onSwitchToLogin}>
                Volver al Login
              </span>
            </div>
          </div>
        ) : (


          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: "48px",
                marginBottom: "16px",
                display: "flex",
                justifyContent: "center",
                color: "#6b7280",
              }}
            >
              <Mail size={48} />
            </div>
            <h2 className="auth-title">Revisa tu Email</h2>
            
            <p className="auth-subtitle">
              Hemos enviado un enlace de verificación a tu correo electrónico. Haz clic en el enlace para activar tu
              cuenta.
            </p>

            {email && (
              <div style={{ marginTop: "20px" }}>
                <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "16px" }}>¿No recibiste el email?</p>

                {resendSuccess && (
                  <div
                    style={{
                      color: "#16a34a",
                      backgroundColor: "#f0fdf4",
                      padding: "12px",
                      borderRadius: "8px",
                      marginBottom: "16px",
                      fontSize: "14px",
                      border: "1px solid #bbf7d0",
                    }}
                  >
                    Email de verificación reenviado exitosamente
                  </div>
                )}

                <button
                  className="submit-btn"
                  onClick={handleResendVerification}
                  disabled={isResending}
                  style={{ marginBottom: "12px" }}
                >
                  {isResending ? "Reenviando..." : "Reenviar Email"} <RotateCcw size={18} />
                </button>
              </div>
            )}

            <div className="auth-footer">
              <span className="auth-link" onClick={onSwitchToLogin}>
                Volver al Login
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default VerifyEmail
