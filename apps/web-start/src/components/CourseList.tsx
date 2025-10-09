import { useQuery } from '@tanstack/react-query';
import { backendFetcher } from '../integrations/fetcher';
import { Link } from '@tanstack/react-router';

interface Course {
    course_cuid: string;
    title: string;
}

export default function CourseList() {
  const { data: courses, isLoading, error } = useQuery<Course[]>({
    queryKey: ['courses'],
    queryFn: backendFetcher<Course[]>('/courses'),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading courses</p>;
  if (!courses) return <p>No courses available</p>;

  return (
    <ul className="space-y-3">
      {courses.map((course: any) => (
        <li key={course.course_cuid} className="p-2 border rounded hover:bg-gray-50">
           <Link to="/course/$courseId" params={{ courseId: course.course_cuid }}>{course.title}</Link>
        </li>
      ))}
    </ul>
  );
}
