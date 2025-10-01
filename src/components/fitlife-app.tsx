import type React from "react";
import { useState } from "react";
import { LayoutDashboard, Dumbbell, Apple, User, LogOut, Bell } from "lucide-react";
import Dashboard from "../pages/dashboard";
import ExercisePlan from "../pages/planejercicio";
import HealthQuestionnaire from "../components/cuestionariosalud";
import NutritionPlan from "../pages/plannutricional";
import NotificationsPage from "../pages/notifications"; 
import { NotificationIcon } from "./NotificationIcon";

interface FitLifeAppProps {
  user: {
    id: number;
    nombre: string;
    apellidos: string;
    email: string;
    hasHealthData: boolean;
    hasExercisePlan: boolean;
    hasNutritionPlan: boolean;
  };
  onLogout: () => void;
}

type ActivePage = "dashboard" | "ejercicio" | "nutricion" | "datos-fisicos" | "notificaciones";

const FitLifeApp: React.FC<FitLifeAppProps> = ({ user, onLogout }) => {
  const [activePage, setActivePage] = useState<ActivePage>("dashboard");
  const [currentUser, setCurrentUser] = useState(user);

  const FitLifeIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
    >
      <path
        fill="#fff"
        d="m19.4 9.375l-.688-.688l.48-.506q.193-.192.193-.433q0-.24-.193-.433l-2.508-2.507q-.192-.192-.432-.192t-.433.192l-.506.48l-.713-.713l.558-.583q.44-.44 1.079-.427t1.079.452l2.667 2.668q.44.44.44 1.066t-.44 1.066zM8.842 19.958q-.44.44-1.066.44t-1.066-.44l-2.59-2.59q-.46-.46-.46-1.144t.46-1.143l.48-.481l.714.714l-.487.48q-.192.193-.192.433t.192.433l2.514 2.513q.192.193.432.193t.433-.193l.48-.486l.714.713zm9.733-6.804l1.137-1.137q.192-.192.192-.442t-.192-.442l-6.845-6.844q-.192-.193-.442-.193t-.442.192l-1.137 1.137q-.192.192-.192.433q0 .24.192.433l6.864 6.863q.192.192.432.192t.433-.192m-6.558 6.558l1.137-1.143q.192-.192.192-.432t-.192-.433l-6.858-6.858q-.192-.192-.433-.192q-.24 0-.432.192l-1.143 1.137q-.192.192-.192.442t.192.442l6.845 6.844q.192.193.442.193t.442-.192m-.708-5.273l3.135-3.13l-1.754-1.753l-3.129 3.135zm1.402 5.98q-.459.46-1.136.46t-1.137-.46l-6.857-6.857q-.46-.46-.46-1.137t.46-1.136l1.136-1.156q.46-.46 1.144-.46t1.143.46l1.844 1.844l3.135-3.135l-1.844-1.838q-.46-.46-.46-1.146t.46-1.146l1.155-1.156q.46-.46 1.143-.46t1.144.46l6.863 6.863q.46.46.46 1.144t-.46 1.143l-1.155 1.156q-.46.46-1.147.46t-1.146-.46l-1.838-1.845l-3.135 3.135l1.844 1.844q.46.46.46 1.144t-.46 1.143z"
        strokeWidth="0.5"
        stroke="#fff"
      />
    </svg>
  );

  const navigationItems = [
    {
      id: "dashboard" as ActivePage,
      label: "Dashboard",
      icon: LayoutDashboard,
      description: "Resumen general",
    },
    {
      id: "ejercicio" as ActivePage,
      label: "Plan Ejercicio",
      icon: Dumbbell,
      description: "Rutinas y entrenamientos",
    },
    {
      id: "nutricion" as ActivePage,
      label: "Plan Nutrición",
      icon: Apple,
      description: "Alimentación saludable",
    },
    {
      id: "datos-fisicos" as ActivePage,
      label: "Datos Físicos",
      icon: User,
      description: "Cuestionario de salud",
    },
    {
      id: "notificaciones" as ActivePage,
      label: "Notificaciones",
      icon: Bell,
      description: "Tus alertas y recordatorios",
    },
  ];

  const handleQuestionnaireComplete = (healthData: any) => {
    console.log('Datos físicos completados:', healthData);
    setCurrentUser((prev) => ({
      ...prev,
      hasHealthData: true,
    }));
  };

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard user={currentUser} />;
      case "ejercicio":
        return <ExercisePlan user={currentUser} />;
      case "nutricion":
        return <NutritionPlan user={currentUser} />;
      case "datos-fisicos":
        return (
          <HealthQuestionnaire
            onComplete={handleQuestionnaireComplete}
          />
        );
      case "notificaciones": 
        return <NotificationsPage />;
      default:
        return <Dashboard user={currentUser} />;
    }
  };

  const getPageTitle = () => {
    switch (activePage) {
      case "datos-fisicos":
        return "Datos Físicos";
      case "notificaciones": 
        return "Notificaciones";
      default:
        return activePage.charAt(0).toUpperCase() + activePage.slice(1);
    }
  };

  const getPageDescription = () => {
    switch (activePage) {
      case "datos-fisicos":
        return "Cuestionario de salud";
      case "notificaciones": 
        return "Tus alertas y recordatorios";
      default:
        return navigationItems.find((item) => item.id === activePage)?.description || "";
    }
  };

  return (
    <div className="layout flex min-h-screen">
      <aside className="sidebar fixed flex flex-col justify-between w-64 bg-white">
        <div>
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#959581] to-[#aeb99d] rounded-xl flex items-center justify-center">
                <FitLifeIcon />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#2d3319]">FitLife</h1>
                <p className="text-[#bcc591] text-sm">Tu transformación</p>
              </div>
            </div>
          </div>

          <nav className="nav p-4">
            <div className="space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activePage === item.id;

                return (
                  <a
                    key={item.id}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setActivePage(item.id);
                    }}
                    className={`nav-item ${isActive ? "active" : ""}`}
                  >
                    <span className="icon">
                      <Icon size={20} />
                    </span>
                    <span>
                      <div className="font-semibold">{item.label}</div>
                      <div className={`text-sm ${isActive ? "text-white/80" : "text-[#bcc591]"}`}>
                        {item.description}
                      </div>
                    </span>
                  </a>
                );
              })}
            </div>
          </nav>
        </div>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 p-4 text-[#2d3319] bg-[#f5f5f0] rounded-2xl shadow-sm hover:bg-gradient-to-r hover:from-[#aeb99d] hover:to-[#c4c9b5] hover:shadow-md hover:scale-102 hover:opacity-90 transition-all duration-200"
          >
            <LogOut size={24} />
            <span className="font-semibold text-base">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      <main className="main-content ml-64 flex-1">
        <header className="header">
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-[#2d3319] capitalize">{getPageTitle()}</h2>
              <p className="text-[#bcc591] text-sm">{getPageDescription()}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <NotificationIcon onNavigate={() => setActivePage("notificaciones")} />
            
            <div className="w-10 h-10 bg-gradient-to-br from-[#959581] to-[#aeb99d] rounded-full flex items-center justify-center">
              <User className="text-white" size={18} />
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-[#2d3319]">
                {currentUser.nombre} {currentUser.apellidos}
              </div>
              <div className="text-xs text-[#bcc591]">{currentUser.email}</div>
            </div>
          </div>
        </header>

        <div className="content">{renderContent()}</div>
      </main>
    </div>
  );
};

export default FitLifeApp;