"use client"

import type { StudentAttempt } from "@/types"
import { Eye } from "lucide-react"

interface Props {
  attempts: StudentAttempt[]
  selectedId: string | null
  onSelect: (id: string) => void
}

export default function AttemptHistory({ attempts, selectedId, onSelect }: Props) {
  if (attempts.length === 0) {
    return (
      <div className="card-base text-center py-8 text-muted-foreground">
        <p>No attempts yet. Start by submitting an answer above.</p>
      </div>
    )
  }

  return (
    <div className="card-base overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold">Question</th>
              <th className="text-left py-3 px-4 font-semibold hidden sm:table-cell">Date</th>
              <th className="text-left py-3 px-4 font-semibold">Result</th>
              <th className="text-right py-3 px-4 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {attempts.map((attempt) => (
              <tr
                key={attempt.id}
                className={`border-b border-border hover:bg-muted/50 transition-colors cursor-pointer ${
                  selectedId === attempt.id ? "bg-muted/70" : ""
                }`}
                onClick={() => onSelect(attempt.id)}
              >
                <td className="py-3 px-4 font-medium text-sm">{attempt.questionTitle}</td>
                <td className="py-3 px-4 text-muted-foreground hidden sm:table-cell text-xs">
                  {new Date(attempt.timestamp).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      attempt.errorType === "Correct" ? "bg-success/10 text-success" : "bg-error-light/20 text-error"
                    }`}
                  >
                    {attempt.errorType}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onSelect(attempt.id)
                    }}
                    className={`inline-flex items-center gap-1 text-sm font-medium transition-colors ${
                      selectedId === attempt.id ? "text-primary" : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    <Eye className="w-4 h-4" />
                    <span className="hidden sm:inline">View</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
