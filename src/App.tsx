"use client"

import { useState } from "react"
import Login from "./pages/login"
import Register from "./pages/register"
import FitLifeApp from "./components/fitlife-app"
import './App.css';

import '../src/styles/app.css';
import '../src/styles/global.css';
import '../src/styles/physical-data.css';
import '../src/styles/planejercicio.css';
import '../src/styles//dashboard.css';


export default function App() {
  const [currentView, setCurrentView] = useState<"login" | "register" | "app">("login")
  const [user, setUser] = useState<any>(null)

  const switchToRegister = () => setCurrentView("register")
  const switchToLogin = () => setCurrentView("login")

  const handleLoginSuccess = (userData: any) => {
    setUser(userData)
    setCurrentView("app")
  }

  if (currentView === "app" && user) {
    return (
      <FitLifeApp
        user={user}
        onLogout={() => {
          setUser(null)
          setCurrentView("login")
        }}
      />
    )
  }

  return (
    <div className="app">
      {/* Círculos decorativos */}
      <div className="decorative-circles">
        <div className="circle-1"></div>
        <div className="circle-2"></div>
        <div className="circle-3"></div>
      </div>

      <div className="auth-container">
        {currentView === "login" ? (
          <Login onSwitchToRegister={switchToRegister} onLoginSuccess={handleLoginSuccess} />
        ) : (
          <Register onSwitchToLogin={switchToLogin} onRegisterSuccess={handleLoginSuccess} />
        )}
      </div>
    </div>
  )
}
