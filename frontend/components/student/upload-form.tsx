"use client"

import type React from "react"

import { useState } from "react"
import { Upload, Type, X } from "lucide-react"

const QUESTIONS = [
  { id: "q1", title: "Projectile Motion – Time of Flight" },
  { id: "q2", title: "Newtons Laws - Force Calculation" },
  { id: "q3", title: "Work, Energy, Power – Concept" },
  { id: "q4", title: "Electrostatics – Field Lines" },
  { id: "q5", title: "Waves - Doppler Effect" },
  { id: "q6", title: "Thermodynamics - Heat Transfer" },
  { id: "q7", title: "Modern Physics - Photoelectric Effect" },
]

interface Props {
  onAnalyze: (questionId: string, answer: string, file?: File) => void
  loading: boolean
}

export default function StudentUploadForm({ onAnalyze, loading }: Props) {
  const [selectedQuestion, setSelectedQuestion] = useState("q1")
  const [answerTab, setAnswerTab] = useState<"text" | "image">("text")
  const [textAnswer, setTextAnswer] = useState("")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [dragActive, setDragActive] = useState(false)

  const handleFileSelect = (file: File | null) => {
    if (!file) return

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file")
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("File must be less than 10MB")
      return
    }

    setUploadedFile(file)

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      handleFileSelect(files[0])
    }
  }

  const handleSubmit = () => {
    const answer = answerTab === "text" ? textAnswer : uploadedFile?.name || "Image uploaded"
    if (answer.trim()) {
      onAnalyze(selectedQuestion, answer, uploadedFile || undefined)
      // Reset form after submission
      setTextAnswer("")
      setUploadedFile(null)
      setImagePreview("")
    }
  }

  return (
    <div className="card-base sticky top-20">
      <h2 className="text-xl font-semibold mb-6">Submit Answer</h2>

      {/* Question selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Select Question</label>
        <select
          value={selectedQuestion}
          onChange={(e) => setSelectedQuestion(e.target.value)}
          className="input-base"
          disabled={loading}
        >
          {QUESTIONS.map((q) => (
            <option key={q.id} value={q.id}>
              {q.title}
            </option>
          ))}
        </select>
      </div>

      {/* Question display */}
      <div className="mb-6 p-3 bg-muted/50 rounded-lg text-sm">
        <p className="font-medium mb-2">Question:</p>
        <p className="text-muted-foreground">
          A projectile is launched at 45° with initial velocity 20 m/s. Calculate the time of flight.
        </p>
      </div>

      {/* Answer tabs */}
      <div className="mb-6 flex gap-2 border-b border-border">
        <button
          onClick={() => setAnswerTab("text")}
          disabled={loading}
          className={`py-2 px-3 text-sm font-medium border-b-2 transition-colors ${
            answerTab === "text"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          } disabled:opacity-50`}
        >
          <Type className="w-4 h-4 inline mr-2" />
          Type Answer
        </button>
        <button
          onClick={() => setAnswerTab("image")}
          disabled={loading}
          className={`py-2 px-3 text-sm font-medium border-b-2 transition-colors ${
            answerTab === "image"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          } disabled:opacity-50`}
        >
          <Upload className="w-4 h-4 inline mr-2" />
          Upload Image
        </button>
      </div>

      {/* Answer input */}
      {answerTab === "text" ? (
        <textarea
          value={textAnswer}
          onChange={(e) => setTextAnswer(e.target.value)}
          placeholder="Type your answer here..."
          className="input-base mb-6 min-h-32 resize-none"
          disabled={loading}
        />
      ) : (
        <div className="mb-6">
          {!imagePreview ? (
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
                dragActive ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"
              }`}
            >
              <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm font-medium mb-1">Drag image here or click</p>
              <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
              <input
                type="file"
                onChange={(e) => handleFileSelect(e.target.files?.[0] || null)}
                className="hidden"
                id="file-input"
                accept="image/*"
                disabled={loading}
              />
              <label htmlFor="file-input" className="cursor-pointer">
                {/* Label wraps the input */}
              </label>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="relative border border-border rounded-lg overflow-hidden">
                <img
                  src={imagePreview || "/placeholder.svg"}
                  alt="Preview"
                  className="w-full h-auto max-h-48 object-cover"
                />
                <button
                  onClick={() => {
                    setImagePreview("")
                    setUploadedFile(null)
                  }}
                  disabled={loading}
                  className="absolute top-2 right-2 p-1 bg-error/90 text-white rounded hover:bg-error transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-muted-foreground">
                <strong>Selected:</strong> {uploadedFile?.name}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        disabled={loading || (answerTab === "text" ? !textAnswer.trim() : !uploadedFile)}
        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading && (
          <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
        )}
        {loading ? "Analyzing with AI..." : "Analyze My Answer"}
      </button>

      <p className="text-xs text-muted-foreground mt-4 text-center">
        💡 Tip: Upload a clear image or type your answer for better analysis
      </p>
    </div>
  )
}
