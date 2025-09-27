"use client"

import { useState } from "react"
import { ExercisePlanHeader } from "./exercise-plan-header"
import { CreatePlanForm } from "./create-plan-form"
import { PlansList } from "./plans-list"
import { useExercisePlans } from "../hooks/use-exercise-plans"
import type { User, ExercisePlan } from "../types/exercise-plan"

interface ExercisePlanFormProps {
  user: User
  onPlanCreated?: (plan: ExercisePlan) => void
}

export function ExercisePlanForm({ user, onPlanCreated }: ExercisePlanFormProps) {
  const [showForm, setShowForm] = useState(false)
  const { activePlans, createPlan, togglePlanStatus, deletePlan } = useExercisePlans(user)

  const handlePlanCreated = (plan: ExercisePlan) => {
    const newPlan = createPlan(plan)
    setShowForm(false)
    onPlanCreated?.(newPlan)
  }

  if (showForm) {
    return <CreatePlanForm onSubmit={handlePlanCreated} onCancel={() => setShowForm(false)} />
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <ExercisePlanHeader onCreateClick={() => setShowForm(true)} />
      <PlansList plans={activePlans} onToggleStatus={togglePlanStatus} onDelete={deletePlan} />
    </div>
  )
}
