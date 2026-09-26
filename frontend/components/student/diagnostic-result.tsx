"use client"

import type { DiagnosticFeedback } from "@/types"
import { AlertCircle, Lightbulb, Zap } from "lucide-react"

interface Props {
  feedback: DiagnosticFeedback
  onRetry: () => void
}

export default function DiagnosticResult({ feedback, onRetry }: Props) {
  const errorTypeColor =
    feedback.errorType === "Conceptual Error"
      ? "text-error"
      : feedback.errorType === "Calculation Error"
        ? "text-warning"
        : "text-muted-foreground"

  return (
    <div className="card-base space-y-6">
      {/* Summary */}
      <div className="border-b border-border pb-6">
        <h3 className="font-semibold mb-4">Answer Summary</h3>
        <div className="space-y-3 text-sm">
          <div>
            <p className="text-muted-foreground">Question</p>
            <p className="font-medium">{feedback.questionTitle}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-muted-foreground">Your Answer</p>
              <p className="font-medium">{feedback.studentAnswer}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Correct Answer</p>
              <p className="font-medium text-success">{feedback.correctAnswer}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Error type badge */}
      <div>
        <p className="text-xs font-semibold text-muted-foreground mb-2">ERROR TYPE</p>
        <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${errorTypeColor} bg-muted`}>
          {feedback.errorType}
        </div>
      </div>

      {/* Root cause */}
      <div className="bg-error-light/20 border border-error-light rounded-lg p-4">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-sm mb-1">Root Cause Detected</h4>
            <p className="text-sm text-muted-foreground">{feedback.rootCause}</p>
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="w-5 h-5 text-primary" />
          <h4 className="font-semibold">Why This is Wrong</h4>
        </div>
        <ul className="space-y-2">
          {feedback.explanation.map((point, idx) => (
            <li key={idx} className="text-sm text-muted-foreground flex gap-2">
              <span className="text-primary">•</span>
              {point}
            </li>
          ))}
        </ul>
      </div>

      {/* Next steps */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-5 h-5 text-primary" />
          <h4 className="font-semibold">Next Steps</h4>
        </div>
        <ul className="space-y-2">
          {feedback.nextSteps.map((step, idx) => (
            <li key={idx} className="text-sm text-muted-foreground flex gap-2">
              <span className="text-primary">✓</span>
              {step}
            </li>
          ))}
        </ul>
      </div>

      {/* Pattern notice */}
      {feedback.patternDetected && (
        <div className="bg-muted/50 border border-border rounded-lg p-4">
          <p className="text-sm">
            <span className="font-semibold">Pattern detected:</span> {feedback.patternDetected}
          </p>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-3 pt-4 border-t border-border">
        <button className="flex-1 btn-primary">View Practice Set</button>
        <button onClick={onRetry} className="flex-1 btn-secondary">
          Re-attempt
        </button>
      </div>
    </div>
  )
}
