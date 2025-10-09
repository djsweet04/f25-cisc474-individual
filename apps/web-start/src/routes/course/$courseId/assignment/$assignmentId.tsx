import { createFileRoute } from '@tanstack/react-router'
//import AssignmentList from '../../../../components/AssignmentList'

export const Route = createFileRoute('/course/$courseId/assignment/$assignmentId')({
  component: AssignmentsPage,
})

function AssignmentsPage() {
  const { courseId } = Route.useParams()

  return (
    <section>
      <h2 className="text-xl font-semibold mb-3">Assignments</h2>
    </section>
  )
}
