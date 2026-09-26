"use client"

import { useState, useMemo } from "react"
import ProtectedRoute from "@/components/protected-route"
import Navigation from "@/components/navigation"
import StudentUploadForm from "@/components/student/upload-form"
import DiagnosticResult from "@/components/student/diagnostic-result"
import AttemptHistory from "@/components/student/attempt-history"
import StudentTestView from "@/components/student/test-view"
import type { DiagnosticFeedback, StudentAttempt } from "@/types"
import { Search, BarChart3, Clock } from "lucide-react"
import { useEffect } from "react";
import { fetchStudentHistory } from "@/lib/api";

export default function StudentDashboard() {
  const [view, setView] = useState<"submission" | "tests">("submission")
  const [selectedAttemptId, setSelectedAttemptId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState<DiagnosticFeedback | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const [history, setHistory] = useState<StudentAttempt[]>([
    {
      id: "1",
      questionId: "q1",
      questionTitle: "Projectile Motion – Time of Flight",
      studentAnswer: "t = 2 seconds",
      correctAnswer: "t = 4 seconds",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      errorType: "Conceptual Error",
      rootCause: "Confused velocity (v) with displacement (s)",
      testId: "test-1",
      testName: "Physics Mock - Kinematics",
    },
    {
      id: "2",
      questionId: "q2",
      questionTitle: "Newtons Laws - Force Calculation",
      studentAnswer: "F = 50N",
      correctAnswer: "F = 100N",
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      errorType: "Calculation Error",
      rootCause: "Forgot to account for both masses",
      testId: "test-1",
      testName: "Physics Mock - Kinematics",
    },
    {
      id: "3",
      questionId: "q3",
      questionTitle: "Work, Energy, Power – Concept",
      studentAnswer: "W = 500J",
      correctAnswer: "W = 1000J",
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      errorType: "Conceptual Error",
      rootCause: "Misunderstood work-energy theorem",
      testId: "test-2",
      testName: "Physics Full Test 2",
    },
    {
      id: "4",
      questionId: "q4",
      questionTitle: "Electrostatics – Field Lines",
      studentAnswer: "8 field lines",
      correctAnswer: "12 field lines",
      timestamp: new Date(Date.now() - 172800000).toISOString(),
      errorType: "Procedural Error",
      rootCause: "Incorrect counting methodology",
      testId: "test-2",
      testName: "Physics Full Test 2",
    },
    {
      id: "5",
      questionId: "q5",
      questionTitle: "Waves - Doppler Effect",
      studentAnswer: "f = 450 Hz",
      correctAnswer: "f = 510 Hz",
      timestamp: new Date(Date.now() - 259200000).toISOString(),
      errorType: "Calculation Error",
      rootCause: "Wrong sign in relative velocity",
      testId: "test-3",
      testName: "Physics Weekly Test 3",
    },
    {
      id: "6",
      questionId: "q6",
      questionTitle: "Thermodynamics - Heat Transfer",
      studentAnswer: "Q = 300 J",
      correctAnswer: "Q = 450 J",
      timestamp: new Date(Date.now() - 259200000).toISOString(),
      errorType: "Conceptual Error",
      rootCause: "Missed latent heat component",
      testId: "test-3",
      testName: "Physics Weekly Test 3",
    },
  ])

  const filteredHistory = useMemo(() => {
    if (!searchQuery.trim()) return history
    return history.filter(
      (attempt) =>
        attempt.questionTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        attempt.errorType.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [history, searchQuery])

  const testGroups = useMemo(() => {
    const grouped: {
      [key: string]: {
        testId: string
        testName: string
        attempts: StudentAttempt[]
        correctCount: number
        totalCount: number
        score: number
      }
    } = {}

    history.forEach((attempt) => {
      if (!grouped[attempt.testId]) {
        grouped[attempt.testId] = {
          testId: attempt.testId,
          testName: attempt.testName,
          attempts: [],
          correctCount: 0,
          totalCount: 0,
          score: 0,
        }
      }
      grouped[attempt.testId].attempts.push(attempt)
      grouped[attempt.testId].totalCount += 1
      // Mock: assume 40% of answers are correct
      if (Math.random() > 0.6) grouped[attempt.testId].correctCount += 1
    })

    Object.values(grouped).forEach((test) => {
      test.score = Math.round((test.correctCount / test.totalCount) * 100)
    })

    return Object.values(grouped).sort(
      (a, b) => new Date(b.attempts[0]?.timestamp || 0).getTime() - new Date(a.attempts[0]?.timestamp || 0).getTime(),
    )
  }, [history])

  const handleAnalyze = async (questionId: string, answer: string, file?: File) => {
    setLoading(true)
    setSelectedAttemptId(null)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    const mockFeedback: DiagnosticFeedback = {
      questionId,
      questionTitle: "Projectile Motion – Time of Flight",
      studentAnswer: answer,
      correctAnswer: "t = 4 seconds",
      errorType: "Conceptual Error",
      rootCause: "You confused velocity (v) with displacement (s). You used v = u + at instead of s = ut + ½at².",
      explanation: [
        "Displacement (s) measures how far something moved",
        "Velocity (v) measures how fast it moves",
        "Time of flight depends on displacement, not velocity",
      ],
      nextSteps: [
        "Practice 3 projectile motion problems",
        "Review concept: Displacement vs velocity",
        "Watch: Kinematics equations explained",
      ],
      patternDetected: "You've made similar mistakes in 3 recent questions about kinematics.",
    }

    setFeedback(mockFeedback)

    const newAttempt: StudentAttempt = {
      id: String(history.length + 1),
      questionId,
      questionTitle: mockFeedback.questionTitle,
      studentAnswer: answer,
      correctAnswer: mockFeedback.correctAnswer,
      timestamp: new Date().toISOString(),
      errorType: mockFeedback.errorType,
      rootCause: mockFeedback.rootCause,
      testId: "test-0",
      testName: "Quick Practice",
    }
    setHistory([newAttempt, ...history])
    setLoading(false)
  }

  return (
    <ProtectedRoute requiredRole="student">
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header with stats */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Student Dashboard</h1>
            <p className="text-muted-foreground mb-6">JEE/NEET Diagnostic Analysis & Practice</p>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="card-base">
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Tests</p>
                    <p className="text-2xl font-bold">{testGroups.length}</p>
                  </div>
                </div>
              </div>
              <div className="card-base">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Questions Done</p>
                    <p className="text-2xl font-bold">{history.length}</p>
                  </div>
                </div>
              </div>
              <div className="card-base">
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Score</p>
                    <p className="text-2xl font-bold">
                      {Math.round(testGroups.reduce((sum, t) => sum + t.score, 0) / testGroups.length || 0)}%
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* View tabs */}
            <div className="flex gap-4 border-b border-border mb-8">
              <button
                onClick={() => setView("submission")}
                className={`py-3 px-4 font-medium border-b-2 transition-colors ${
                  view === "submission"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Practice & Submit
              </button>
              <button
                onClick={() => setView("tests")}
                className={`py-3 px-4 font-medium border-b-2 transition-colors ${
                  view === "tests"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                All Tests
              </button>
            </div>
          </div>

          {/* Content areas */}
          {view === "submission" ? (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <StudentUploadForm onAnalyze={handleAnalyze} loading={loading} />
              </div>

              <div className="lg:col-span-2 space-y-6">
                {feedback && !selectedAttemptId && (
                  <DiagnosticResult
                    feedback={feedback}
                    onRetry={() => {
                      setFeedback(null)
                    }}
                  />
                )}

                <div>
                  <div className="flex items-center justify-between mb-4 gap-4">
                    <h2 className="text-xl font-semibold">Recent Attempts</h2>
                    <div className="flex-1 max-w-xs relative">
                      <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Search attempts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="input-base pl-10 text-sm"
                      />
                    </div>
                  </div>

                  {filteredHistory.length > 0 ? (
                    <AttemptHistory
                      attempts={filteredHistory}
                      selectedId={selectedAttemptId}
                      onSelect={(id) => {
                        setSelectedAttemptId(id)
                        const attempt = history.find((a) => a.id === id)
                        if (attempt) {
                          setFeedback({
                            questionId: attempt.questionId,
                            questionTitle: attempt.questionTitle,
                            studentAnswer: attempt.studentAnswer,
                            correctAnswer: attempt.correctAnswer,
                            errorType: attempt.errorType,
                            rootCause: attempt.rootCause,
                            explanation: ["Loading explanation..."],
                            nextSteps: ["Loading recommendations..."],
                            patternDetected: undefined,
                          })
                        }
                      }}
                    />
                  ) : (
                    <div className="card-base text-center py-8 text-muted-foreground">
                      <p>No attempts match your search.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <StudentTestView testGroups={testGroups} />
          )}
        </main>
      </div>
    </ProtectedRoute>
  )
} 