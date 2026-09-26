// Real authentication helper (JWT based)

export interface Session {
  role: "student" | "coach"
  token: string
}

export const getSession = (): Session | null => {
  if (typeof window === "undefined") return null

  const token = localStorage.getItem("token")
  const role = localStorage.getItem("role") as "student" | "coach" | null

  if (!token || !role) return null

  return { token, role }
}

export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
  }
}
