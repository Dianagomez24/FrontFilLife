"use client"
import { Apple, Utensils } from "lucide-react"
import type { NutritionPlan } from "../types/nutrition"
import { NutritionPlanCard } from "./nutrition-plan-card"

interface NutritionPlansListProps {
  plans: NutritionPlan[]
  onToggleStatus: (planId: number) => void
  onDelete: (planId: number) => void
  onViewDetails: (plan: NutritionPlan) => void
}

export function NutritionPlansList({ plans, onToggleStatus, onDelete, onViewDetails }: NutritionPlansListProps) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold text-[#2d3319] mb-6 flex items-center gap-3">
        <Utensils className="text-[#aeb99d]" size={28} />
        Mis Planes Nutricionales
      </h2>

      {plans.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Apple className="text-gray-400" size={24} />
          </div>
          <p className="text-[#bcc591] text-lg">No tienes planes nutricionales creados</p>
          <p className="text-[#bcc591] text-sm">Crea tu primer plan personalizado</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <NutritionPlanCard 
              key={plan.id} 
              plan={plan} 
              onToggleStatus={onToggleStatus} 
              onDelete={onDelete}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      )}
    </div>
  )
}