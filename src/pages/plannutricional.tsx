import { NutritionPlanFormContainer } from "../components/nutrition-plan-form-container"

export default function PlanNutricionalPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Plan de Nutrición</h1>
          <p className="text-muted-foreground">Crea y gestiona tus planes de nutrición personalizados</p>
        </div>

        <NutritionPlanFormContainer />
      </div>
    </div>
  )
}