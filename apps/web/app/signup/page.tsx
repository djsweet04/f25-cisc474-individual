import Link from "next/link"

export default function DashboardPage() {
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">Student Dashboard</h1>
      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Upcoming Assignments</h2>
        <ul className="space-y-2">
          <li className="border p-3 rounded shadow">
            <Link href="/course/101">CS101 - Homework 3 (Due in 2 days)</Link>
          </li>
          <li className="border p-3 rounded shadow">
            <Link href="/course/220">CS220 - Project Proposal (Due in 7 days)</Link>
          </li>
        </ul>
      </section>
    </main>
  )
}