import { useQuery } from '@tanstack/react-query';
import { useBackendFetcher } from '../integrations/fetcher';
import { Link } from '@tanstack/react-router';

interface Course {
    course_cuid: string;
    title: string;
    syllabus: string;
}

interface Props {
  onEdit: (course: Course) => void;
  onDelete: (course: Course) => void;
}

export default function CourseList({ onEdit, onDelete }: Props) {
  const fetcher = useBackendFetcher();
  const { data: courses, isLoading, error } = useQuery<Course[]>({
    queryKey: ['courses'],
    queryFn: () => fetcher('/courses'),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading courses</p>;
  if (!courses || courses.length === 0) return <p>No courses available</p>;

  return (
    <ul className="space-y-3">
      {courses.map((course: any) => (
        <li key={course.course_cuid} className="p-2 border rounded hover:bg-gray-50">
           <Link to="/course/$courseId" params={{ courseId: course.course_cuid }}>{course.title}</Link>

           <div className="flex space-x-2 ml-4">
            <button
              onClick={() => onEdit(course)}
              className="text-blue-600 hover:underline"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(course)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
