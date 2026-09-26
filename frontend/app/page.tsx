"use client"

import Link from "next/link"
import { ArrowRight, Brain, BarChart3, Users, Zap, LineChart, Trophy, BookOpen } from "lucide-react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { getSession } from "@/lib/auth"

export default function Landing() {
  const router = useRouter()

  useEffect(() => {
    const session = getSession()
    if (session) {
      router.push(session.role === "student" ? "/student" : "/coach")
    }
  }, [router])

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold">ThinkFix</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/student" className="btn-primary flex items-center gap-2">
              Student <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/coach" className="btn-secondary">
              Coach
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-6">
              AI-Powered Exam Diagnostics
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight text-balance">
              Fix your exam mistakes with AI, not guesswork.
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              ThinkFix diagnoses why your JEE/NEET answers are wrong and shows exactly what to fix. Get instant
              feedback, identify patterns, and master concepts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link href="/student" className="btn-primary text-center px-8 py-3 text-base">
                Start as Student
              </Link>
              <Link href="/coach" className="btn-secondary text-center px-8 py-3 text-base">
                Manage Class as Coach
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              Demo Credentials: Student (student121/12345678) • Coach (coach121/12345678)
            </p>
          </div>
          <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl p-8 h-96 flex items-center justify-center border border-border">
            <div className="text-center">
              <Zap className="w-32 h-32 text-primary mx-auto mb-4 opacity-40" />
              <p className="text-lg font-semibold text-muted-foreground">Instant AI Diagnostics</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why ThinkFix?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Designed for JEE & NEET aspirants and coaching institutes to eliminate guesswork from exam prep.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Brain,
                title: "Instant Diagnostics",
                description: "Get immediate analysis of what went wrong and why with AI-powered insights.",
              },
              {
                icon: LineChart,
                title: "Error Pattern Detection",
                description: "Understand whether mistakes are conceptual, procedural, or calculation errors.",
              },
              {
                icon: BarChart3,
                title: "Class-Wide Analytics",
                description: "Track student progress, identify problem topics, and at-risk students at scale.",
              },
              {
                icon: Trophy,
                title: "Personalized Learning",
                description: "Get customized practice recommendations based on your mistakes.",
              },
            ].map((feature, idx) => (
              <div key={idx} className="card-base hover:shadow-lg transition-shadow">
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Students Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-3xl p-8 h-80 flex items-center justify-center border border-border">
              <BookOpen className="w-32 h-32 text-blue-500/40" />
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-3xl font-bold mb-6">For Students</h3>
              <ul className="space-y-4">
                {[
                  "Upload answer images or type answers instantly",
                  "Get detailed diagnosis of mistakes in seconds",
                  "Learn root causes, not just corrections",
                  "Practice personalized question sets",
                  "Track progress across multiple attempts",
                  "Identify your weak topics automatically",
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-base text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* For Coaches Section */}
      <section className="bg-muted/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6">For Coaches & Teachers</h3>
              <ul className="space-y-4">
                {[
                  "Real-time class performance analytics",
                  "Identify which topics need re-teaching",
                  "Spot at-risk students early",
                  "Analyze error patterns across batches",
                  "Get interventions recommendations",
                  "Track student improvement over time",
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-base text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-3xl p-8 h-80 flex items-center justify-center border border-border">
              <Users className="w-32 h-32 text-purple-500/40" />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How ThinkFix Works</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { number: "01", title: "Submit Answer", description: "Upload image or type your exam answer" },
              { number: "02", title: "AI Analyzes", description: "Our AI diagnoses the root cause of error" },
              { number: "03", title: "Learn & Improve", description: "Get actionable insights and practice more" },
            ].map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="text-5xl font-bold text-primary/20 mb-4">{step.number}</div>
                <h4 className="text-xl font-semibold mb-3">{step.title}</h4>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-muted/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { value: "15,000+", label: "Students Using ThinkFix" },
              { value: "200+", label: "Coaching Institutes" },
              { value: "98%", label: "Mistake Detection Accuracy" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Fix Your Mistakes?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of JEE and NEET aspirants improving their scores with AI-powered diagnostics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/student" className="btn-primary px-8 py-3 text-base">
              Get Started as Student
            </Link>
            <Link href="/coach" className="btn-secondary px-8 py-3 text-base">
              Setup Your Class
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-6 h-6 text-primary" />
                <span className="font-bold">ThinkFix</span>
              </div>
              <p className="text-sm text-muted-foreground">AI-powered exam diagnostics for JEE & NEET</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">ThinkFix © 2026. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition">
                Twitter
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition">
                LinkedIn
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
