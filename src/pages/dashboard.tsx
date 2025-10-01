"use client";

import type React from "react";
import { Dumbbell, Apple, User, TrendingUp, Calendar, Clock, Target, Utensils } from "lucide-react";
import { useExercisePlans } from "../hooks/use-exercise-plans";
import { useNutritionPlans } from "../hooks/use-nutrition-plans";

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
  const { activePlans: exercisePlans, loading: exerciseLoading } = useExercisePlans();
  const { activePlans: nutritionPlans, loading: nutritionLoading } = useNutritionPlans();

  const activeExercisePlans = exercisePlans.filter(plan => plan.activo).length;

  const activeNutritionPlans = nutritionPlans.filter(plan => plan.activo).length;
  
  const totalExercises = exercisePlans.reduce((total, plan) => total + plan.ejercicios.length, 0);

  const totalMeals = nutritionPlans.reduce((total, plan) => total + plan.comidas.length, 0);
  
  const totalCalories = nutritionPlans.reduce((total, plan) => {
    return total + plan.comidas.reduce((mealTotal, comida) => {
      return mealTotal + comida.alimentos.reduce((alimentoTotal, alimento) => {
        return alimentoTotal + (alimento.calorias || 0);
      }, 0);
    }, 0);
  }, 0);

  const stats = [
    {
      title: "Planes de Ejercicio",
      value: exercisePlans.length.toString(),
      subtitle: `${activeExercisePlans} activos`,
      icon: Dumbbell,
      gradient: "from-[#959581] to-[#aeb99d]",
      bgColor: "bg-gradient-to-br from-[#959581] to-[#aeb99d]",
    },
    {
      title: "Planes de Nutrición",
      value: nutritionPlans.length.toString(),
      subtitle: `${activeNutritionPlans} activos`,
      icon: Apple,
      gradient: "from-[#aeb99d] to-[#c4c9b5]",
      bgColor: "bg-gradient-to-br from-[#aeb99d] to-[#c4c9b5]",
    },
    {
      title: "Ejercicios Totales",
      value: totalExercises.toString(),
      subtitle: "En todos los planes",
      icon: Target,
      gradient: "from-[#c4c9b5] to-[#bcc591]",
      bgColor: "bg-gradient-to-br from-[#c4c9b5] to-[#bcc591]",
    },
    {
      title: "Comidas Registradas",
      value: totalMeals.toString(),
      subtitle: "En todos los planes",
      icon: Utensils,
      gradient: "from-[#bcc591] to-[#959581]",
      bgColor: "bg-gradient-to-br from-[#bcc591] to-[#959581]",
    },
  ];

  const recentActivities = [
    ...exercisePlans.slice(0, 2).map(plan => ({
      id: plan.id!,

      type: "Plan de Ejercicio",
      description: plan.nombre,
      dateTime: plan.fechaCreacion ? new Date(plan.fechaCreacion).toLocaleDateString('es-ES', {

        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }) : 'Fecha no disponible',
      icon: Dumbbell,
      gradient: "from-[#959581] to-[#aeb99d]",
    })),
    ...nutritionPlans.slice(0, 2).map(plan => ({
      id: plan.id!,
      type: "Plan de Nutrición",
      description: plan.nombre,
      dateTime: plan.fechaCreacion ? new Date(plan.fechaCreacion).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }) : 'Fecha no disponible',
      icon: Apple,
      gradient: "from-[#aeb99d] to-[#c4c9b5]",
    }))
  ].sort((a, b) => {

    if (!a.dateTime || !b.dateTime) return 0;
    return new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime();
  }).slice(0, 3); 

  const totalPlans = exercisePlans.length + nutritionPlans.length;
  const progressPercentage = totalPlans > 0 ? Math.min((totalPlans / 10) * 100, 100) : 0;


  if (exerciseLoading || nutritionLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-[#959581] to-[#aeb99d] rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="text-white" size={24} />
          </div>
          <p className="text-[#2d3319]">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-[#959581] to-[#aeb99d] rounded-2xl p-8 text-white">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">¡Hola, {user.nombre}! 👋</h1>
            <p className="text-white/90 text-lg">Bienvenido a tu espacio personal de transformación</p>
            <p className="text-white/70 mt-2">
              {totalPlans > 0 
                ? `Tienes ${totalPlans} planes creados. ¡Sigue así!`
                : "Estás a punto de comenzar un viaje increíble hacia una vida más saludable"
              }
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <TrendingUp className="mx-auto mb-2" size={32} />
              <div className="text-2xl font-bold">{Math.round(progressPercentage)}%</div>
              <div className="text-sm text-white/70">Progreso General</div>
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
            <h2 className="text-2xl font-bold text-[#2d3319]">Planes Recientes</h2>
            <p className="text-[#bcc591]">Tus planes de ejercicio y nutrición más recientes</p>
          </div>
        </div>

        {recentActivities.length > 0 ? (
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
                      <p className="text-[#2d3319] text-base line-clamp-2">{activity.description}</p>
                      <p className="text-[#bcc591] text-xs mt-1">Creado: {activity.dateTime}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="text-gray-400" size={24} />
            </div>
            <p className="text-[#bcc591] text-lg">No tienes planes creados</p>
            <p className="text-[#bcc591] text-sm">Comienza creando tu primer plan de ejercicio o nutrición</p>
          </div>
        )}
      </div>

      
    </div>
  );
};

export default Dashboard;