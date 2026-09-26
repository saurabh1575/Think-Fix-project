"use client"

export default function ErrorHeatmap() {
  const topics = [
    { name: "Kinematics", passRate: 72, color: "bg-success" },
    { name: "Dynamics", passRate: 41, color: "bg-warning" },
    { name: "Thermodynamics", passRate: 58, color: "bg-warning" },
    { name: "Waves & Sound", passRate: 28, color: "bg-error" },
    { name: "Electrostatics", passRate: 45, color: "bg-warning" },
    { name: "Magnetism", passRate: 35, color: "bg-error" },
  ]

  return (
    <div className="card-base">
      <h3 className="text-lg font-semibold mb-6">Topic Performance Heatmap</h3>
      <div className="space-y-4">
        {topics.map((topic, idx) => (
          <div key={idx}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">{topic.name}</span>
              <span className="text-xs text-muted-foreground">{topic.passRate}% pass rate</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className={`${topic.color} h-2 rounded-full transition-all`}
                style={{ width: `${topic.passRate}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
