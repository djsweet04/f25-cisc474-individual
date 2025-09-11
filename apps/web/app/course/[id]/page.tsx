import Link from "next/link"

interface CoursePageProps {
  params: { id: string }
}

export default function CoursePage({ params }: CoursePageProps) {
  const { id } = params

  return (
    <main className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Course {id}</h1>
        
        {/* Navigation */}
        <nav className="mb-8">
          <Link href={`/course/${id}/syllabus`} className="text-blue-600 hover:underline">
            Sullabus
          </Link>
        </nav>

        {/* Course Info */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Announcements</h2>
          <div className="bg-white p-4 rounded shadow">
            <p>Recent announcements will go here</p>
          </div>
        </section>

        {/* Assignments */}
        <section>
          <h2 className="text-xl font-semibold mb-3">Assignments</h2>
          <ul className="space-y-3">
            <li className="bg-white p-4 rounded shadow">
              <Link href="/assignment/1" className="text-blue-600 hover:underline">
                Assignment 1: Hello World
              </Link>
            </li>
            <li className="bg-white p-4 rounded shadow">
              <Link href="/assignment/2" className="text-blue-600 hover:underline">
                Assignment 2: Compete with Amazon
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </main>
  )
}