export interface DiagnosticFeedback {
  questionId: string
  questionTitle: string
  studentAnswer: string
  correctAnswer: string
  errorType: string
  rootCause: string
  explanation: string[]
  nextSteps: string[]
  patternDetected?: string
}

export interface StudentAttempt {
  id: string
  questionId: string
  questionTitle: string
  studentAnswer: string
  correctAnswer: string
  timestamp: string
  errorType: string
  rootCause: string
  testId?: string
  testName?: string
}

export interface StudentTestReport {
  studentId: string
  studentName: string
  lastTests: Array<{
    testId: string
    testName: string
    date: string
    score: number
    totalQuestions: number
    correctAnswers: number
    topError: string
    weakTopics: string[]
  }>
  overallScore: number
  riskLevel: "High" | "Medium" | "Low"
  commonErrors: string[]
}

export interface Session {
  role: "student" | "coach"
  username: string
  loginTime: string
}
