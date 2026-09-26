"use client"

import { Zap, CheckCircle } from "lucide-react"
import { useState } from "react"

interface Intervention {
  id: string
  title: string
  description: string
  completed: boolean
}

const INITIAL_INTERVENTIONS: Intervention[] = [
  {
    id: "1",
    title: "Re-teach Newton's Laws",
    description: "Conduct a 45-minute session covering F=ma and applications",
    completed: false,
  },
  {
    id: "2",
    title: "Assign Calculus Integration",
    description: "Practice set with 20 integration problems for Dynamics",
    completed: false,
  },
  {
    id: "3",
    title: "Wave Motion Workshop",
    description: "Interactive session on wavelength, frequency concepts",
    completed: true,
  },
]

export default function RecommendedInterventions() {
  const [interventions, setInterventions] = useState(INITIAL_INTERVENTIONS)

  const toggleCompleted = (id: string) => {
    setInterventions(interventions.map((i) => (i.id === id ? { ...i, completed: !i.completed } : i)))
  }

  return (
    <div className="card-base">
      <div className="flex items-center gap-2 mb-6">
        <Zap className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Recommended Interventions</h3>
      </div>

      <div className="space-y-3">
        {interventions.map((intervention) => (
          <div key={intervention.id} className="flex gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
            <button onClick={() => toggleCompleted(intervention.id)} className="flex-shrink-0 mt-0.5">
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                  intervention.completed ? "bg-success border-success" : "border-border hover:border-primary"
                }`}
              >
                {intervention.completed && <CheckCircle className="w-4 h-4 text-white" />}
              </div>
            </button>
            <div className="flex-1 min-w-0">
              <p
                className={`font-medium text-sm mb-1 ${intervention.completed ? "line-through text-muted-foreground" : ""}`}
              >
                {intervention.title}
              </p>
              <p className="text-xs text-muted-foreground">{intervention.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
