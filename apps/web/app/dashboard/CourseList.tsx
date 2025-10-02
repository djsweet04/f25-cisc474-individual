import Link from 'next/link';
import { fetchCourses } from '../../lib/api';

export default async function CourseList() {
    const courses = await fetchCourses();

    return (
        <ul className="space-y-3">
            {courses.map((course: any) => (
                <li key={course.course_cuid} className="p-2 border rounded hover:bg-gray-50">
                    <Link href={`/course/${course.course_cuid}`}>
                        {course.title}
                    </Link>
                </li>
            ))}
        </ul>
    );
}