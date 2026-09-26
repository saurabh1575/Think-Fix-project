"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"
import { Brain, LogOut } from "lucide-react"
import { getSession, logout } from "@/lib/auth"
import { useState, useEffect } from "react"

export default function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const isStudent = pathname.includes("/student")
  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    setSession(getSession())
  }, [])

  const handleLogout = () => {
    logout()
    router.push("/auth")
  }

  return (
    <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href={isStudent ? "/student" : "/coach"} className="flex items-center gap-2">
          <Brain className="w-6 h-6 text-primary" />
          <span className="font-bold text-lg">ThinkFix</span>
        </Link>

        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground hidden sm:block">
            <span className="font-medium text-foreground">{session?.username}</span>
            <span className="mx-2">•</span>
            <span>{isStudent ? "📚 Student" : "📊 Coach"}</span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm font-medium"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </nav>
    </header>
  )
}
