"use client";

import type React from "react";
import { Dumbbell, Apple, User, TrendingUp, Calendar, Clock } from "lucide-react";

interface DashboardProps {
  user: {
    id: number;
    nombre: string;
    apellidos: string;
    email: string;
    hasHealthData: boolean;
    hasExercisePlan: boolean;
    hasNutritionPlan: boolean;
  };
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const stats = [
    {
      title: "Entrenamientos",
      value: "0",
      subtitle: "Esta semana",
      icon: Dumbbell,
      gradient: "from-[#959581] to-[#aeb99d]",
      bgColor: "bg-gradient-to-br from-[#959581] to-[#aeb99d]",
    },
    {
      title: "Comidas Registradas",
      value: "0",
      subtitle: "Hoy",
      icon: Apple,
      gradient: "from-[#aeb99d] to-[#c4c9b5]",
      bgColor: "bg-gradient-to-br from-[#aeb99d] to-[#c4c9b5]",
    },
    {
      title: "Peso Actual",
      value: "--",
      subtitle: "kg",
      icon: User,
      gradient: "from-[#c4c9b5] to-[#bcc591]",
      bgColor: "bg-gradient-to-br from-[#c4c9b5] to-[#bcc591]",
    },
    {
      title: "Días Activo",
      value: "1",
      subtitle: "Consecutivos",
      icon: Calendar,
      gradient: "from-[#bcc591] to-[#959581]",
      bgColor: "bg-gradient-to-br from-[#bcc591] to-[#959581]",
    },
  ];

  // Placeholder for recent or upcoming activities (ready for API/state connection)
  const recentActivities = [
    {
      id: 1,
      type: "Entrenamiento",
      description: "Rutina de fuerza (Piernas)",
      dateTime: "2025-09-27 08:00 AM",
      icon: Dumbbell,
      gradient: "from-[#aeb99d] to-[#c4c9b5]",
    },
    {
      id: 2,
      type: "Comida",
      description: "Desayuno: Avena con frutas",
      dateTime: "2025-09-27 07:30 AM",
      icon: Apple,
      gradient: "from-[#aeb99d] to-[#c4c9b5]",
    },
    {
      id: 3,
      type: "Peso",
      description: "Registro de peso actual",
      dateTime: "2025-09-26 06:00 PM",
      icon: User,
      gradient: "from-[#aeb99d] to-[#c4c9b5]",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-[#959581] to-[#aeb99d] rounded-2xl p-8 text-white">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">¡Hola, {user.nombre}! 👋</h1>
            <p className="text-white/90 text-lg">Bienvenido a tu espacio personal de transformación</p>
            <p className="text-white/70 mt-2">
              Estás a punto de comenzar un viaje increíble hacia una vida más saludable
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <TrendingUp className="mx-auto mb-2" size={32} />
              <div className="text-2xl font-bold">0%</div>
              <div className="text-sm text-white/70">Progreso</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm border border-[#c4c9b5]/20 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                  <Icon className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[#2d3319] text-sm">{stat.title}</h3>
                  <p className="text-3xl font-bold text-[#2d3319] leading-none">{stat.value}</p>
                  <p className="text-[#bcc591] text-xs mt-1">{stat.subtitle}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#c4c9b5]/20">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-[#959581] to-[#aeb99d] rounded-lg flex items-center justify-center">
            <Clock className="text-white" size={20} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#2d3319]">Actividad Reciente o Próxima</h2>
            <p className="text-[#bcc591]">Tu actividad reciente y próximos eventos</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentActivities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div
                key={activity.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-[#c4c9b5]/20 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${activity.gradient} rounded-lg flex items-center justify-center`}
                  >
                    <Icon className="text-white" size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#2d3319] text-sm">{activity.type}</h3>
                    <p className="text-[#2d3319] text-base">{activity.description}</p>
                    <p className="text-[#bcc591] text-xs mt-1">{activity.dateTime}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;