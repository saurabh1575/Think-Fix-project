// API Integration Helpers
// Fully connected with ThinkFix backend (Node + Express + MongoDB)

import type { DiagnosticFeedback, StudentAttempt } from "@/types"

// 🔥 BACKEND BASE URL
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

// =======================
// AUTH APIs
// =======================

export const loginUser = async (email: string, password: string) => {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })

  if (!res.ok) {
    throw new Error("Login failed")
  }

  const data = await res.json()

  // 🔐 Save token for future requests
  localStorage.setItem("token", data.token)
  localStorage.setItem("role", data.role)

  return data
}

export const signupUser = async (
  name: string,
  email: string,
  password: string,
  role: "student" | "coach"
) => {
  const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password, role }),
  })

  if (!res.ok) {
    throw new Error("Signup failed")
  }

  return res.json()
}

// =======================
// STUDENT APIs
// =======================

export const analyzeAnswer = async (
  questionId: string,
  answer: string
): Promise<DiagnosticFeedback> => {
  const token = localStorage.getItem("token")

  const res = await fetch(`${API_BASE_URL}/api/student/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      student_id: "S1", // later auth se aayega
      question_id: questionId,
      answerText: answer,
    }),
  })

  if (!res.ok) {
    throw new Error("Failed to analyze answer")
  }

  const data = await res.json()

  // 🔁 Backend → Frontend mapping
  return {
    questionId,
    questionTitle: "Question",
    studentAnswer: answer,
    correctAnswer: "",
    errorType: data.diagnosis.errorType,
    rootCause: data.diagnosis.misconception,
    explanation: [data.diagnosis.explanation],
    nextSteps: data.response.nextSteps,
    patternDetected: `Priority: ${data.response.priority}`,
  }
}

// =======================
// STUDENT HISTORY (OPTIONAL)
// =======================
// Backend history API abhi nahi hai
export const fetchStudentHistory = async (): Promise<StudentAttempt[]> => {
  return []
}

// =======================
// COACH APIs
// =======================

export const fetchCoachAnalytics = async () => {
  const token = localStorage.getItem("token")

  const res = await fetch(`${API_BASE_URL}/api/coach/class-analysis`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    throw new Error("Failed to fetch coach analytics")
  }

  return res.json()
}
