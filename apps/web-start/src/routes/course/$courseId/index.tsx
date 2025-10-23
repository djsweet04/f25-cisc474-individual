import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useBackendFetcher } from '../../../integrations/fetcher'
import { Link } from '@tanstack/react-router';

interface Assignment {
    assignment_cuid: string
    title: string
}

export const Route = createFileRoute('/course/$courseId/')({
  component: CourseOverview,
})

function CourseOverview() {
    const fetcher = useBackendFetcher();
    const { courseId } = Route.useParams()

    const { data: assignments } = useSuspenseQuery<Assignment[]>({
        queryKey: ['assignments', courseId],
        queryFn:() => fetcher(`/courses/${courseId}/assignments`),
    })

    return (
        <section>
            <h2 className="text-xl font-semibold mb-3">Announcements</h2>
            <div className="bg-white p-4 rounded shadow">
                <p>Recent announcements will go here</p>
            </div>

            <h2 className="text-xl font-semibold mb-3">Assignments</h2>
            <ul className="space-y-3">
                {assignments.map((assignment) => (
                <li key={assignment.assignment_cuid} className="bg-white p-4 rounded shadow">
                    <Link to="/course/$courseId/assignment/$assignmentId" params={{courseId, assignmentId: assignment.assignment_cuid,}}
                    className="text-blue-600 hover:underline"> {assignment.title}
                    </Link>
                </li>
                ))}
            </ul>
        </section>
    )
}
