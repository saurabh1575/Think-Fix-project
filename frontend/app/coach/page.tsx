"use client"

import { useState, Suspense } from "react"
import ProtectedRoute from "@/components/protected-route"
import Navigation from "@/components/navigation"
import CoachKPIs from "@/components/coach/kpis"
import ErrorHeatmap from "@/components/coach/error-heatmap"
import CoachStudentReports from "@/components/coach/student-reports"
import RecommendedInterventions from "@/components/coach/interventions"
import { Search, Filter } from "lucide-react"

function CoachDashboardContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterRisk, setFilterRisk] = useState<"All" | "High" | "Medium" | "Low">("All")

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Coach Dashboard</h1>
        <p className="text-muted-foreground">Class insights for JEE Physics – Batch A</p>
      </div>

      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-base pl-10 w-full"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select
            value={filterRisk}
            onChange={(e) => setFilterRisk(e.target.value as any)}
            className="input-base text-sm"
          >
            <option>All</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>
      </div>

      {/* KPIs */}
      <CoachKPIs />

      {/* Main grid */}
      <div className="grid lg:grid-cols-2 gap-8 mt-8">
        {/* Left column */}
        <div className="space-y-6">
          <ErrorHeatmap />
          <RecommendedInterventions />
        </div>

        {/* Right column - Student reports with last 3 tests */}
        <div>
          <CoachStudentReports searchQuery={searchQuery} filterRisk={filterRisk} />
        </div>
      </div>
    </main>
  )
}

export default function CoachDashboard() {
  return (
    <ProtectedRoute requiredRole="coach">
      <div className="min-h-screen bg-background">
        <Navigation />
        <Suspense fallback={null}>
          <CoachDashboardContent />
        </Suspense>
      </div>
    </ProtectedRoute>
  )
}
