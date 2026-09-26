"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Brain, Mail, Lock, User } from "lucide-react"
import { loginUser, signupUser } from "@/lib/api"

type AuthMode = "login" | "signup" | "role-select"

export default function AuthPage() {
  const router = useRouter()
  const [mode, setMode] = useState<AuthMode>("role-select")
  const [selectedRole, setSelectedRole] = useState<"student" | "coach" | null>(null)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  // ================= LOGIN =================
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const data = await loginUser(email, password)
      router.push(data.role === "student" ? "/student" : "/coach")
    } catch (err: any) {
      setError(err.message || "Invalid email or password")
    }

    setLoading(false)
  }

  // ================= REGISTER (FIXED) =================
 const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault()
  setError("")
  setLoading(true)

  if (!name || !email || password.length < 6 || !selectedRole) {
    setError("Please fill all fields (password min 6 chars)")
    setLoading(false)
    return
  }

  try {
    await signupUser(
      name,
      email,
      password,
      selectedRole
    )

    setMode("login")
    setError("Account created successfully. Please login.")
  } catch (err: any) {
    setError(err.message || "Signup failed")
  }

  setLoading(false)
}


  // ================= ROLE SELECT =================
  if (mode === "role-select") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center p-4">
        <div className="card-base max-w-md w-full">
          <div className="flex justify-center gap-2 mb-8">
            <Brain className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">ThinkFix</h1>
          </div>

          <h2 className="text-xl font-bold text-center mb-6">
            Choose Your Role
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => {
                setSelectedRole("student")
                setMode("signup")
              }}
              className="p-6 border rounded-xl hover:border-primary"
            >
              👤 Student
            </button>

            <button
              onClick={() => {
                setSelectedRole("coach")
                setMode("signup")
              }}
              className="p-6 border rounded-xl hover:border-primary"
            >
              📊 Coach
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ================= LOGIN / SIGNUP =================
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center p-4">
      <div className="card-base max-w-md w-full">
        <button
          onClick={() => setMode("role-select")}
          className="text-primary text-sm mb-4"
        >
          ← Back
        </button>

        <div className="flex justify-center gap-2 mb-4">
          <Brain className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold">ThinkFix</h1>
        </div>

        <h2 className="text-xl font-bold mb-4 capitalize">
          {mode === "login" ? "Login" : "Register"} as {selectedRole}
        </h2>

        {error && (
          <div className="bg-error-light text-error text-sm p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form
          onSubmit={mode === "login" ? handleLogin : handleRegister}
          className="space-y-4"
        >
          {mode === "signup" && (
            <div>
              <label>Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4" />
                <input
                  className="input-base pl-10"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          )}

          <div>
            <label>Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4" />
              <input
                className="input-base pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label>Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4" />
              <input
                type="password"
                className="input-base pl-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button className="w-full btn-primary">
            {mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p className="text-xs text-center mt-6">
          {mode === "login" ? (
            <>
              New user?{" "}
              <span
                className="text-primary cursor-pointer"
                onClick={() => setMode("signup")}
              >
                Register
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                className="text-primary cursor-pointer"
                onClick={() => setMode("login")}
              >
                Login
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  )
}
