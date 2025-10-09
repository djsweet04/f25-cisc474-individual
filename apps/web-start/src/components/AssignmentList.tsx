/* import { useQuery } from '@tanstack/react-query'
import { backendFetcher } from '../integrations/fetcher'
import { Link } from '@tanstack/react-router'

interface Assignment {
  assignment_cuid: string
  title: string
}
interface AssignmentListProps {
  course_cuid: string
}
export default function AssignmentList({ course_cuid }: AssignmentListProps) {
  const { data: assignments, isLoading, error } = useQuery<Assignment[]>({
    queryKey: ['assignments', course_cuid],
    queryFn: backendFetcher<Assignment[]>(`/courses/${course_cuid}/assignments`),
  })

  if (isLoading) return <p>Loading assignments...</p>
  if (error) return <p>Error loading assignments</p>
  if (!assignments || assignments.length === 0) return <p>No assignments available</p>

  return (
    <ul className="space-y-3">
      {assignments.map((assignment) => (
        <li
          key={assignment.assignment_cuid}
          className="bg-white p-4 rounded shadow"
        >
          <Link
            to="course/$courseId/assignment/$assignmentId"
            params={{ assignmentId: assignment.assignment_cuid }}
            className="text-blue-600 hover:underline"
          >
            {assignment.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}
 */