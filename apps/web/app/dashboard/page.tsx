import Link from "next/link"
import CourseList from "./CourseList"
import { Suspense } from "react"

export default function DashboardPage() {
  return (
    <main className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>

        {/* Course Cards */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">My Courses</h2>
          <ul className="space-y-3">
            <li className="bg-white p-4 rounded shadow">
              <Link href="/course/101" className="text-blue-600 hover:underline">
                CS101 - Introduction to Programming
              </Link>
            </li>
            <li className="bg-white p-4 rounded shadow">
              <Link href="/course/220" className="text-blue-600 hover:underline">
                CS220 - Data Structures
              </Link>
            </li>
          </ul>
        </section>

        <h2>CoursesV2</h2>
        <Suspense fallback={<p>Loading courses...</p>}>
          <CourseList />
        </Suspense>


        {/* Quick Stats */}
        <section>
          <h2 className="text-xl font-semibold mb-3">Progress</h2>
          <div className="bg-white p-4 rounded shadow">
            <p>Course Completion: 70%</p>
            <p>Assignments Submitted: 8 / 10</p>
          </div>
        </section>
      </div>
    </main>
  )
}
