import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/course/$courseId/syllabus')({
  component: SyllabusPage,
})

function SyllabusPage() {
  const { courseId } = Route.useParams()

  return (
    <section className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Syllabus for Course {courseId}</h2>

      <p className="text-gray-700 mb-4">
        Course description goes here. Do your best and have fun!
      </p>

      <h3 className="text-lg font-semibold mb-2">Schedule:</h3>
      <ul className="list-disc list-inside space-y-1 text-gray-700">
        <li>Week 1: Data Types</li>
        <li>Week 2: Functions</li>
        <li>Week 3: Build an army of unstoppable robots</li>
        <li>Week 4: Spring break!</li>
      </ul>
    </section>
  )
}
