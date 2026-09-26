"use client"

import { AlertCircle, Eye } from "lucide-react"
import { useMemo } from "react"

interface AtRiskStudent {
  id: string
  name: string
  problemArea: string
  lastScore: number
  risk: "High" | "Medium" | "Low"
}

const AT_RISK_STUDENTS: AtRiskStudent[] = [
  { id: "1", name: "Rahul Kumar", problemArea: "Dynamics", lastScore: 32, risk: "High" },
  { id: "2", name: "Priya Sharma", problemArea: "Waves", lastScore: 28, risk: "High" },
  { id: "3", name: "Arjun Patel", problemArea: "Electrostatics", lastScore: 45, risk: "Medium" },
  { id: "4", name: "Divya Singh", problemArea: "Thermodynamics", lastScore: 52, risk: "Medium" },
  { id: "5", name: "Rohan Gupta", problemArea: "Magnetism", lastScore: 35, risk: "High" },
  { id: "6", name: "Neha Verma", problemArea: "Kinematics", lastScore: 62, risk: "Low" },
]

interface Props {
  searchQuery: string
  filterRisk: "All" | "High" | "Medium" | "Low"
}

export default function AtRiskStudentsList({ searchQuery, filterRisk }: Props) {
  const filteredStudents = useMemo(() => {
    return AT_RISK_STUDENTS.filter((student) => {
      const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesRisk = filterRisk === "All" || student.risk === filterRisk
      return matchesSearch && matchesRisk
    })
  }, [searchQuery, filterRisk])

  return (
    <div className="card-base">
      <div className="flex items-center gap-2 mb-6">
        <AlertCircle className="w-5 h-5 text-error" />
        <h3 className="text-lg font-semibold">At-Risk Students</h3>
        <span className="ml-auto text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
          {filteredStudents.length} results
        </span>
      </div>

      {filteredStudents.length > 0 ? (
        <div className="space-y-3">
          {filteredStudents.map((student) => (
            <div
              key={student.id}
              className="flex items-start justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm mb-1">{student.name}</p>
                <p className="text-xs text-muted-foreground mb-2">
                  {student.problemArea} - Last Score: {student.lastScore}/100
                </p>
                <div className="flex gap-2">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                      student.risk === "High"
                        ? "bg-error/10 text-error"
                        : student.risk === "Medium"
                          ? "bg-warning/10 text-warning"
                          : "bg-success/10 text-success"
                    }`}
                  >
                    {student.risk} Risk
                  </span>
                </div>
              </div>
              <button className="text-primary hover:text-primary/80 transition-colors flex-shrink-0">
                <Eye className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <p>No students match your filters.</p>
        </div>
      )}
    </div>
  )
}
