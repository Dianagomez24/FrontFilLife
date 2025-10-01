"use client"

import { useEffect, useState } from "react"
import Login from "./pages/login"
import Register from "./pages/register"
import VerifyEmail from "./pages/verify-email"
import FitLifeApp from "./components/fitlife-app"
import './App.css';

import '../src/styles/app.css';
import '../src/styles/global.css';
import '../src/styles/physical-data.css';
import '../src/styles/planejercicio.css';
import '../src/styles//dashboard.css';


export default function App() {
  const [currentView, setCurrentView] = useState<"login" | "register" | "verify-email" | "app">("login")
  const [user, setUser] = useState<any>(null)
  const [registrationEmail, setRegistrationEmail] = useState<string>("")

  useEffect(() => {

    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get("token")

    if (token) {

      setCurrentView("verify-email")
    }
  }, [])

  const switchToRegister = () => setCurrentView("register")
  const switchToLogin = () => setCurrentView("login")
  const switchToVerifyEmail = (email?: string) => {
    if (email) setRegistrationEmail(email)
    setCurrentView("verify-email")
  }

  const handleLoginSuccess = (userData: any) => {
    setUser(userData)
    setCurrentView("app")
  }

  const handleRegisterSuccess = (email: string) => {
    setRegistrationEmail(email)
    setCurrentView("verify-email")
  }

  if (currentView === "app" && user) {
    return (
      <FitLifeApp
        user={user}
        onLogout={() => {
          setUser(null)
          localStorage.removeItem("token")
          setCurrentView("login")
        }}
      />
    )
  }

  return (
    <div className="app">

      <div className="decorative-circles">
        <div className="circle-1"></div>

        
        <div className="circle-2"></div>
        <div className="circle-3"></div>
      </div>

 <div className="auth-container">
        {currentView === "login" && <Login onSwitchToRegister={switchToRegister} onLoginSuccess={handleLoginSuccess} />}
        {currentView === "register" && (
          <Register onSwitchToLogin={switchToLogin} onRegisterSuccess={() => switchToVerifyEmail()} />
        )}
        {currentView === "verify-email" && <VerifyEmail onSwitchToLogin={switchToLogin} email={registrationEmail} />}
      </div>
    </div>
  )
}

