import Link from "next/link"

interface CoursePageProps {
  params: { id: string }
}

export default function CoursePage({ params }: CoursePageProps) {
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">Course {params.id}</h1>
      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Assignments</h2>
        <ul className="space-y-2">
          <li className="border p-3 rounded shadow">
            <Link href={`/assignment/1`}>Homework 1</Link>
          </li>
          <li className="border p-3 rounded shadow">
            <Link href={`/assignment/2`}>Project Proposal</Link>
          </li>
        </ul>
      </section>
    </main>
  )
}