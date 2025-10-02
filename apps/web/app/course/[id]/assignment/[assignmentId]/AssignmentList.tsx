import Link from 'next/link';
import { fetchAssignments } from '../../../../../lib/api';

export default async function AssignmentList({ course_cuid }: { course_cuid: string }) {
    const assignments = await fetchAssignments(course_cuid);

    return (
        <ul className="space-y-3">
            {assignments.length > 0 ? (
                assignments.map((assignment: any) => (
                <li key={assignment.assignment_cuid} className="p-2 border rounded hover:bg-gray-50">
                    <Link href={`${course_cuid}/assignment/${assignment.assignment_cuid}`}>
                        {assignment.overview}
                    </Link>
                </li>
            ))
        ) : (<p>No assignments found.</p>)}
        </ul>
    );
}