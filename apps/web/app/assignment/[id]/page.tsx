import Link from "next/link"

interface AssignmentPageProps {
  params: { id: string }
}

export default function AssignmentPage({ params }: AssignmentPageProps) {
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">Assignment {params.id}</h1>
      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Problems</h2>
        <ul className="space-y-2">
          <li className="border p-3 rounded shadow">Problem 1: Sorting Algorithm</li>
          <li className="border p-3 rounded shadow">Problem 2: Graph Traversal</li>
        </ul>
        <div className="mt-6">
          <Link href="/dashboard" className="text-blue-600 underline">← Back to Dashboard</Link>
        </div>
      </section>
    </main>
  )
}
