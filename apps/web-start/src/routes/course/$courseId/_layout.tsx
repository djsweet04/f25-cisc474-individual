import { createFileRoute, Outlet, Link } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { backendFetcher } from '../../../integrations/fetcher'

// --- Type definitions ---
interface Course {
  course_cuid: string
  title: string
}

// --- Route definition ---
export const Route = createFileRoute('/course/$courseId/_layout')({
  loader: async ({ params, context }) => {
    // Prefetch course data for all child routes
    return context.queryClient.ensureQueryData({
      queryKey: ['course', params.courseId],
      queryFn: backendFetcher<Course>(`/courses/${params.courseId}`),
    })
  },
  component: CourseLayout,
})

function CourseLayout() {
  const { courseId } = Route.useParams()
  
  // Get the course data
  const { data: course } = useSuspenseQuery({
    queryKey: ['course', courseId],
    queryFn: backendFetcher<Course>(`/courses/${courseId}`),
  })

  return (
    <main className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{course.title}</h1>

        {/* Shared navigation for all subpages */}
        <nav className="mb-8 space-x-4">
          <Link to="/course/$courseId" params={{ courseId }} className="text-blue-600 hover:underline">
            Overview
          </Link>
          <Link to="/course/$courseId/syllabus" params={{ courseId }} className="text-blue-600 hover:underline">
            Syllabus
          </Link>
        </nav>

        {/* Render child routes */}
        <Outlet />
      </div>
    </main>
  )
}
