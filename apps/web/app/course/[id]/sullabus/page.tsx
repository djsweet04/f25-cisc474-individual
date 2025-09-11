interface SyllabusPageProps {
  params: { id: string }
}

export default function SyllabusPage({ params }: SyllabusPageProps) {
  const { id } = params

  return (
    <main className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-3xl font-bold mb-4">Syllabus for Course {id}</h1>
        
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Course Description:</h2>
          <p className="text-gray-700">
            We do a bunch of stuff and things. It's going to be great!
            Do your best and have fun!
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Schedule:</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Week 1: Data Types</li>
            <li>Week 2: Functions</li>
            <li>Week 3: Build an army of unstoppable robots</li>
            <li>Week 4: Spring break!</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Grading Policy:</h2>
          <p className="text-gray-700">
            Your grade will be based on assignments (70%), participation (10%), and a final project (20%).
          </p>
        </section>
      </div>
    </main>
  )
}