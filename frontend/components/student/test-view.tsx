"use client"

import { useState } from "react"
import { ChevronDown, AlertCircle } from "lucide-react"
import type { StudentAttempt } from "@/types"

interface TestGroup {
  testId: string
  testName: string
  attempts: StudentAttempt[]
  correctCount: number
  totalCount: number
  score: number
}

interface Props {
  testGroups: TestGroup[]
}

export default function StudentTestView({ testGroups }: Props) {
  const [expandedTest, setExpandedTest] = useState<string | null>(null)

  return (
    <div className="space-y-4">
      {testGroups.map((test) => (
        <div key={test.testId} className="card-base overflow-hidden">
          <button
            onClick={() => setExpandedTest(expandedTest === test.testId ? null : test.testId)}
            className="w-full px-6 py-5 flex items-center justify-between hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-4 flex-1 text-left">
              <div>
                <h3 className="font-semibold text-lg">{test.testName}</h3>
                <p className="text-sm text-muted-foreground">{test.totalCount} questions</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-3xl font-bold text-primary">{test.score}%</p>
                <p className="text-sm text-muted-foreground">
                  {test.correctCount}/{test.totalCount} correct
                </p>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-muted-foreground transition-transform ${
                  expandedTest === test.testId ? "rotate-180" : ""
                }`}
              />
            </div>
          </button>

          {expandedTest === test.testId && (
            <div className="border-t border-border px-6 py-4 space-y-4">
              {test.attempts.map((attempt) => (
                <div key={attempt.id} className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-medium">{attempt.questionTitle}</p>
                      <p className="text-sm text-muted-foreground mt-1">{attempt.studentAnswer}</p>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        attempt.errorType === "Conceptual Error"
                          ? "bg-red-100 text-red-700"
                          : attempt.errorType === "Calculation Error"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {attempt.errorType}
                    </div>
                  </div>
                  <div className="flex items-start gap-2 mt-3 pt-3 border-t border-border/50">
                    <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-amber-900">Root Cause:</p>
                      <p className="text-amber-800">{attempt.rootCause}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
