import { useState } from "react"
import { NutritionPlanHeader } from "./nutrition-plan-header"
import { NutritionPlanForm } from "./nutrition-plan-form"
import { NutritionPlansList } from "./nutrition-plans-list"
import { NutritionPlanDetailsModal } from "./nutrition-plan-details-modal"
import { EditNutritionPlanForm } from "./edit-nutrition-plan-form"
import { useNutritionPlans } from "../hooks/use-nutrition-plans"
import type { NutritionPlan, CreateNutritionPlanDto, UpdateNutritionPlanDto } from "../types/nutrition"

interface NutritionPlanFormContainerProps {
  onPlanCreated?: (plan: NutritionPlan) => void
}

export function NutritionPlanFormContainer({ onPlanCreated }: NutritionPlanFormContainerProps) {
  const [showForm, setShowForm] = useState(false)

  const [editingPlan, setEditingPlan] = useState<NutritionPlan | null>(null)

  const [selectedPlan, setSelectedPlan] = useState<NutritionPlan | null>(null)
  const { activePlans, loading, error, createPlan, updatePlan, togglePlanStatus, deletePlan } = useNutritionPlans()

  const handlePlanCreated = async (planData: CreateNutritionPlanDto) => {
    try {
      const newPlan = await createPlan(planData)
      setShowForm(false)
      onPlanCreated?.(newPlan)
    } catch (err) {

    }
  }

  const handlePlanUpdated = async (planId: number, planData: UpdateNutritionPlanDto) => {
    try {
      await updatePlan(planId, planData)
      setEditingPlan(null)

    } catch (err) {

    }
  }

  const handleToggleStatus = async (planId: number) => {
    const plan = activePlans.find(p => p.id === planId)
    if (plan) {
      await togglePlanStatus(planId, plan.activo || false)
    }
  }

  const handleDelete = async (planId: number) => {
    if (confirm('¿Estás seguro de que quieres eliminar este plan?')) {
      await deletePlan(planId)
    }
  }

  const handleViewDetails = (plan: NutritionPlan) => {
    setSelectedPlan(plan)
  }

  const handleEdit = (plan: NutritionPlan) => {
    setEditingPlan(plan)
  }

  if (editingPlan) {
    return (
      <EditNutritionPlanForm

        plan={editingPlan}
        onSubmit={handlePlanUpdated}

        onCancel={() => setEditingPlan(null)}
      />
    )
  }

  if (showForm) {
    return <NutritionPlanForm onSubmit={handlePlanCreated} onCancel={() => setShowForm(false)} />
  }



  return (
    <>
      <div className="max-w-6xl mx-auto space-y-8">
        <NutritionPlanHeader onCreateClick={() => setShowForm(true)} />
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        
        {loading ? (
          <div className="text-center py-8">Cargando planes...</div>
        ) : (
          <NutritionPlansList 
            plans={activePlans} 
            onToggleStatus={handleToggleStatus} 
            onDelete={handleDelete}
            onViewDetails={handleViewDetails}
          />
        )}
      </div>

      <NutritionPlanDetailsModal 
        plan={selectedPlan!}
        isOpen={!!selectedPlan}
        onClose={() => setSelectedPlan(null)}
        onEdit={handleEdit}
      />
    </>
  )
}