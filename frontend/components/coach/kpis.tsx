"use client"

import { Users, TrendingUp, AlertTriangle, BookOpen } from "lucide-react"

export default function CoachKPIs() {
  const kpis = [
    { label: "Total Students", value: "80", icon: Users },
    { label: "Avg Score", value: "58/100", icon: TrendingUp },
    { label: "High Risk Topics", value: "3", icon: AlertTriangle },
    { label: "At-risk Students", value: "12", icon: BookOpen },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi, idx) => (
        <div key={idx} className="card-base">
          <div className="flex items-start justify-between mb-2">
            <p className="text-sm text-muted-foreground">{kpi.label}</p>
            <kpi.icon className="w-5 h-5 text-primary" />
          </div>
          <p className="text-2xl lg:text-3xl font-bold">{kpi.value}</p>
        </div>
      ))}
    </div>
  )
}
