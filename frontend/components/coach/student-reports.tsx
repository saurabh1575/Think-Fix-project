"use client"

import { useState } from "react"
import { ChevronDown, AlertTriangle, Award } from "lucide-react"
import type { StudentTestReport } from "@/types"

interface Props {
  searchQuery: string
  filterRisk: "All" | "High" | "Medium" | "Low"
}

export default function CoachStudentReports({ searchQuery, filterRisk }: Props) {
  const [expandedStudent, setExpandedStudent] = useState<string | null>(null)

  const studentReports: StudentTestReport[] = [
    {
      studentId: "s1",
      studentName: "Rajesh Kumar",
      overallScore: 62,
      riskLevel: "High",
      commonErrors: ["Conceptual errors in kinematics", "Calculation mistakes"],
      lastTests: [
        {
          testId: "test-1",
          testName: "Physics Mock - Kinematics",
          date: "2025-01-06",
          score: 55,
          totalQuestions: 10,
          correctAnswers: 5,
          topError: "Conceptual Error",
          weakTopics: ["Time of Flight", "Velocity vs Displacement"],
        },
        {
          testId: "test-2",
          testName: "Physics Full Test 2",
          date: "2025-01-04",
          score: 68,
          totalQuestions: 15,
          correctAnswers: 10,
          topError: "Calculation Error",
          weakTopics: ["Work-Energy Theorem"],
        },
        {
          testId: "test-3",
          testName: "Physics Weekly Test",
          date: "2025-01-01",
          score: 63,
          totalQuestions: 12,
          correctAnswers: 7,
          topError: "Procedural Error",
          weakTopics: ["Electrostatics"],
        },
      ],
    },
    {
      studentId: "s2",
      studentName: "Priya Sharma",
      overallScore: 78,
      riskLevel: "Low",
      commonErrors: ["Minor calculation errors"],
      lastTests: [
        {
          testId: "test-1",
          testName: "Physics Mock - Kinematics",
          date: "2025-01-06",
          score: 85,
          totalQuestions: 10,
          correctAnswers: 8,
          topError: "Calculation Error",
          weakTopics: ["Minor calculation mistakes"],
        },
        {
          testId: "test-2",
          testName: "Physics Full Test 2",
          date: "2025-01-04",
          score: 80,
          totalQuestions: 15,
          correctAnswers: 12,
          topError: "None",
          weakTopics: ["Thermodynamics", "Waves"],
        },
        {
          testId: "test-3",
          testName: "Physics Weekly Test",
          date: "2025-01-01",
          score: 75,
          totalQuestions: 12,
          correctAnswers: 9,
          topError: "Calculation Error",
          weakTopics: [],
        },
      ],
    },
    {
      studentId: "s3",
      studentName: "Arjun Patel",
      overallScore: 45,
      riskLevel: "High",
      commonErrors: ["Conceptual gaps in core physics", "Formula confusion"],
      lastTests: [
        {
          testId: "test-1",
          testName: "Physics Mock - Kinematics",
          date: "2025-01-06",
          score: 40,
          totalQuestions: 10,
          correctAnswers: 4,
          topError: "Conceptual Error",
          weakTopics: ["Newton's Laws", "Projectile Motion"],
        },
        {
          testId: "test-2",
          testName: "Physics Full Test 2",
          date: "2025-01-04",
          score: 50,
          totalQuestions: 15,
          correctAnswers: 7,
          topError: "Conceptual Error",
          weakTopics: ["Energy concepts", "Field theory"],
        },
        {
          testId: "test-3",
          testName: "Physics Weekly Test",
          date: "2025-01-01",
          score: 45,
          totalQuestions: 12,
          correctAnswers: 5,
          topError: "Conceptual Error",
          weakTopics: ["Thermodynamics", "Waves", "Modern Physics"],
        },
      ],
    },
    {
      studentId: "s4",
      studentName: "Neha Gupta",
      overallScore: 72,
      riskLevel: "Medium",
      commonErrors: ["Procedural mistakes", "Time management issues"],
      lastTests: [
        {
          testId: "test-1",
          testName: "Physics Mock - Kinematics",
          date: "2025-01-06",
          score: 70,
          totalQuestions: 10,
          correctAnswers: 7,
          topError: "Procedural Error",
          weakTopics: ["Problem setup"],
        },
        {
          testId: "test-2",
          testName: "Physics Full Test 2",
          date: "2025-01-04",
          score: 75,
          totalQuestions: 15,
          correctAnswers: 11,
          topError: "Calculation Error",
          weakTopics: [],
        },
        {
          testId: "test-3",
          testName: "Physics Weekly Test",
          date: "2025-01-01",
          score: 71,
          totalQuestions: 12,
          correctAnswers: 8,
          topError: "Procedural Error",
          weakTopics: ["Complex problems"],
        },
      ],
    },
    {
      studentId: "s5",
      studentName: "Vikram Singh",
      overallScore: 58,
      riskLevel: "High",
      commonErrors: ["Weak conceptual foundation"],
      lastTests: [
        {
          testId: "test-1",
          testName: "Physics Mock - Kinematics",
          date: "2025-01-06",
          score: 52,
          totalQuestions: 10,
          correctAnswers: 5,
          topError: "Conceptual Error",
          weakTopics: ["Vectors", "Motion"],
        },
        {
          testId: "test-2",
          testName: "Physics Full Test 2",
          date: "2025-01-04",
          score: 62,
          totalQuestions: 15,
          correctAnswers: 9,
          topError: "Conceptual Error",
          weakTopics: ["Forces", "Work"],
        },
        {
          testId: "test-3",
          testName: "Physics Weekly Test",
          date: "2025-01-01",
          score: 60,
          totalQuestions: 12,
          correctAnswers: 7,
          topError: "Conceptual Error",
          weakTopics: ["Energy", "Power"],
        },
      ],
    },
  ]

  const filteredReports = studentReports.filter((report) => {
    const matchesSearch = report.studentName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRisk = filterRisk === "All" || report.riskLevel === filterRisk
    return matchesSearch && matchesRisk
  })

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "High":
        return "bg-red-100 text-red-700"
      case "Medium":
        return "bg-yellow-100 text-yellow-700"
      default:
        return "bg-green-100 text-green-700"
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Student Performance Reports</h2>

      {filteredReports.length > 0 ? (
        filteredReports.map((report) => (
          <div key={report.studentId} className="card-base overflow-hidden">
            <button
              onClick={() => setExpandedStudent(expandedStudent === report.studentId ? null : report.studentId)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-4 flex-1 text-left">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold">
                  {report.studentName[0]}
                </div>
                <div>
                  <h3 className="font-semibold">{report.studentName}</h3>
                  <p className="text-sm text-muted-foreground">Overall: {report.overallScore}%</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskColor(report.riskLevel)}`}>
                  {report.riskLevel} Risk
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform ${
                    expandedStudent === report.studentId ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>

            {expandedStudent === report.studentId && (
              <div className="border-t border-border px-6 py-4 space-y-6 bg-muted/30">
                {/* Last 3 tests */}
                <div>
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    Last 3 Tests
                  </h4>
                  <div className="space-y-3">
                    {report.lastTests.map((test) => (
                      <div key={test.testId} className="bg-background rounded-lg p-4 border border-border">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-medium">{test.testName}</p>
                            <p className="text-xs text-muted-foreground">{test.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-primary">{test.score}%</p>
                            <p className="text-xs text-muted-foreground">
                              {test.correctAnswers}/{test.totalQuestions}
                            </p>
                          </div>
                        </div>
                        {test.weakTopics.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {test.weakTopics.map((topic, idx) => (
                              <span key={idx} className="text-xs bg-red-100/50 text-red-700 px-2 py-1 rounded">
                                {topic}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Common errors */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Common Error Patterns
                  </h4>
                  <ul className="space-y-2">
                    {report.commonErrors.map((error, idx) => (
                      <li key={idx} className="text-sm flex gap-2">
                        <span className="text-red-500">•</span>
                        <span>{error}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommended actions */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Recommended Actions</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• One-on-one session to review fundamental concepts</li>
                    <li>• Extra practice sheets on weak topics</li>
                    <li>• Review problem-solving methodology</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="card-base text-center py-8 text-muted-foreground">
          <p>No students match your search criteria.</p>
        </div>
      )}
    </div>
  )
}
