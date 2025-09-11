import Link from "next/link"

export default function DashboardPage() {
  return (
    <main className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>

        {/* Upcoming Assignments */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Upcoming Assignments</h2>
          <ul className="space-y-3">
            <li className="bg-white p-4 rounded shadow">
              CS101 - Homework 3 (Due in 2 days)
            </li>
            <li className="bg-white p-4 rounded shadow">
              CS220 - Project Proposal (Due in 7 days)
            </li>
          </ul>
        </section>

        {/* Quick Stats */}
        <section>
          <h2 className="text-xl font-semibold mb-3">Progress</h2>
          <div className="bg-white p-4 rounded shadow">
            <p>Course Completion: 70%</p>
            <p>Assignments Submitted: 8 / 10</p>
          </div>
        </section>
      </div>
    </main>
  )
}
