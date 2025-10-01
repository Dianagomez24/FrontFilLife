
import { useState } from "react"
import { ExercisePlanHeader } from "./exercise-plan-header"
import { CreatePlanForm } from "./create-plan-form"
import { EditPlanForm } from "./EditPlanForm"
import { PlansList } from "./plans-list"
import { PlanDetailsModal } from "./PlanDetailsModal"
import { useExercisePlans } from "../hooks/use-exercise-plans"
import type { ExercisePlan, CreateExercisePlanDto, UpdateExercisePlanDto } from "../types/exercise-plan"

interface ExercisePlanFormProps {
  onPlanCreated?: (plan: ExercisePlan) => void
}

export function ExercisePlanForm({ onPlanCreated }: ExercisePlanFormProps) {
  const [showForm, setShowForm] = useState(false)
  const [editingPlan, setEditingPlan] = useState<ExercisePlan | null>(null)

  const [selectedPlan, setSelectedPlan] = useState<ExercisePlan | null>(null)
  const { activePlans, loading, error, createPlan, updatePlan, togglePlanStatus, deletePlan } = useExercisePlans()

  const handlePlanCreated = async (planData: CreateExercisePlanDto) => {
    try {
      const newPlan = await createPlan(planData)
      setShowForm(false)
      onPlanCreated?.(newPlan)

    } catch (err) {
    }
  }

  const handlePlanUpdated = async (planId: number, planData: UpdateExercisePlanDto) => {
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

  const handleViewDetails = (plan: ExercisePlan) => {
    setSelectedPlan(plan)
  }

  const handleEdit = (plan: ExercisePlan) => {
    setEditingPlan(plan)
  }

  if (editingPlan) {
    return (
      <EditPlanForm 
        plan={editingPlan}
        onSubmit={handlePlanUpdated}


        onCancel={() => setEditingPlan(null)}
      />
    )
  }

  if (showForm) {


    return <CreatePlanForm onSubmit={handlePlanCreated} onCancel={() => setShowForm(false)} />
  }


  return (

    <>
      <div className="max-w-6xl mx-auto space-y-8">
        <ExercisePlanHeader onCreateClick={() => setShowForm(true)} />
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        
        {loading ? (
          <div className="text-center py-8">Cargando planes...</div>
        ) : (
          <PlansList 
            plans={activePlans} 
            onToggleStatus={handleToggleStatus} 
            onDelete={handleDelete}

            onViewDetails={handleViewDetails}
          />
        )}
      </div>

      <PlanDetailsModal 
        plan={selectedPlan!}
        isOpen={!!selectedPlan}
        onClose={() => setSelectedPlan(null)}
        onEdit={handleEdit}
      />
    </>
  )
}