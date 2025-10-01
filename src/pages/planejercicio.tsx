import { ExercisePlanForm } from "../components/exercise-plan-form"

export default function PlanEjercicioPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Plan de Ejercicio</h1>
          <p className="text-muted-foreground">Crea y gestiona tus planes de ejercicio personalizados</p>
        </div>

        <ExercisePlanForm />
      </div>
    </div>
  )
}